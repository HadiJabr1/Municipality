using System.ComponentModel.DataAnnotations;

namespace Municipality.Business.DTOs
{
    public class ComplaintDto
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime SubmissionDate { get; set; }
        
        public string Status { get; set; } = "Pending";
        
        public string? ContactName { get; set; }
        
        public string? ContactEmail { get; set; }
        
        public string? ContactPhone { get; set; }
        
        public string? AdminResponse { get; set; }
        
        public DateTime? ResponseDate { get; set; }
    }

    public class CreateComplaintDto
    {
        [Required]
        [StringLength(200)]
        public string Subject { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public string? ContactName { get; set; }
        
        [EmailAddress]
        public string? ContactEmail { get; set; }
        
        public string? ContactPhone { get; set; }
    }

    public class UpdateComplaintStatusDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
        
        public string? AdminResponse { get; set; }
    }
}

