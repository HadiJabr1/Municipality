using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface IAuthService
    {
        Task<TokenResponseDto?> LoginAsync(LoginDto loginDto);
        Task<string> GenerateJwtTokenAsync(string username, string role);
    }
}

