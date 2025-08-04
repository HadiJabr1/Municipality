using System.ComponentModel.DataAnnotations;

namespace Municipality.Business.DTOs
{
    public class NewsDto
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public DateTime PublishDate { get; set; }
        
        public int AuthorId { get; set; }
        
        public string? AuthorName { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public bool IsPublished { get; set; } = true;
    }

    public class CreateNewsDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public string? ImageUrl { get; set; }
        
        public bool IsPublished { get; set; } = true;
    }

    public class UpdateNewsDto
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public string? ImageUrl { get; set; }
        
        public bool IsPublished { get; set; } = true;
    }
}

