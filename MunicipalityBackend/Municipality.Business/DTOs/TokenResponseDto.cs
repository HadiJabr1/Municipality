namespace Municipality.Business.DTOs
{
    public class TokenResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public int ExpiresIn { get; set; }
        public string TokenType { get; set; } = "Bearer";
    }
}

