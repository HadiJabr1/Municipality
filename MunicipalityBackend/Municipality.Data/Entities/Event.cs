using System.ComponentModel.DataAnnotations;

namespace Municipality.Data.Entities
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        public DateTime EventDate { get; set; }
        
        [StringLength(200)]
        public string? Location { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public bool IsActive { get; set; } = true;
    }
}

