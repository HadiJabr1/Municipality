using System.ComponentModel.DataAnnotations;

namespace Municipality.Data.Entities
{
    public class ContactInquiry
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;
        
        [Required]
        public string Message { get; set; } = string.Empty;
        
        public DateTime SubmissionDate { get; set; } = DateTime.UtcNow;
        
        public bool IsRead { get; set; } = false;
    }
}

