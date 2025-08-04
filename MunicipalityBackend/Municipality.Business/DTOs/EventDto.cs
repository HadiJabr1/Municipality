using System.ComponentModel.DataAnnotations;

namespace Municipality.Business.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime EventDate { get; set; }
        
        public string? Location { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public bool IsActive { get; set; } = true;
    }

    public class CreateEventDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime EventDate { get; set; }
        
        public string? Location { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
    }

    public class UpdateEventDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime EventDate { get; set; }
        
        public string? Location { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
}

