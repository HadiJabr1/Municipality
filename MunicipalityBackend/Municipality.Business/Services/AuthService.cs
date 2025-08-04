using Microsoft.IdentityModel.Tokens;
using Municipality.Business.DTOs;
using Municipality.Data.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Municipality.Business.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;
        private readonly int _jwtExpirationMinutes;

        public AuthService(IUserRepository userRepository, string jwtSecret, string jwtIssuer, string jwtAudience, int jwtExpirationMinutes = 60)
        {
            _userRepository = userRepository;
            _jwtSecret = jwtSecret;
            _jwtIssuer = jwtIssuer;
            _jwtAudience = jwtAudience;
            _jwtExpirationMinutes = jwtExpirationMinutes;
        }

        public async Task<TokenResponseDto?> LoginAsync(LoginDto loginDto)
        {
            var isValid = await _userRepository.ValidateCredentialsAsync(loginDto.Username, loginDto.Password);
            if (!isValid)
                return null;

            var user = await _userRepository.GetByUsernameAsync(loginDto.Username);
            if (user == null)
                return null;

            var token = await GenerateJwtTokenAsync(user.Username, user.Role);

            return new TokenResponseDto
            {
                Token = token,
                ExpiresIn = _jwtExpirationMinutes * 60, // Convert to seconds
                TokenType = "Bearer"
            };
        }

        public async Task<string> GenerateJwtTokenAsync(string username, string role)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(_jwtExpirationMinutes),
                Issuer = _jwtIssuer,
                Audience = _jwtAudience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return await Task.FromResult(tokenHandler.WriteToken(token));
        }
    }
}

