using System.ComponentModel.DataAnnotations;

namespace Municipality.Data.Entities
{
    public class Complaint
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime SubmissionDate { get; set; } = DateTime.UtcNow;
        
        [StringLength(20)]
        public string Status { get; set; } = "Pending";
        
        [StringLength(100)]
        public string? ContactName { get; set; }
        
        [StringLength(100)]
        [EmailAddress]
        public string? ContactEmail { get; set; }
        
        [StringLength(20)]
        public string? ContactPhone { get; set; }
        
        public string? AdminResponse { get; set; }
        
        public DateTime? ResponseDate { get; set; }
    }
}

