using System.ComponentModel.DataAnnotations;

namespace Municipality.Data.Entities
{
    public class News
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        
        public int AuthorId { get; set; }
        
        [StringLength(500)]
        public string? ImageUrl { get; set; }
        
        public bool IsPublished { get; set; } = true;
        
        // Navigation properties
        public virtual User Author { get; set; } = null!;
    }
}

