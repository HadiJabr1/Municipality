using Microsoft.EntityFrameworkCore;
using Municipality.Data.Entities;

namespace Municipality.Data
{
    public class MunicipalityDbContext : DbContext
    {
        public MunicipalityDbContext(DbContextOptions<MunicipalityDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ContactInquiry> ContactInquiries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).HasMaxLength(20).HasDefaultValue("Admin");
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
            });

            // Configure News entity
            modelBuilder.Entity<News>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Content).IsRequired();
                entity.Property(e => e.PublishDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                entity.Property(e => e.IsPublished).HasDefaultValue(true);
                
                entity.HasOne(e => e.Author)
                      .WithMany(u => u.NewsArticles)
                      .HasForeignKey(e => e.AuthorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure Event entity
            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Location).HasMaxLength(200);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.IsActive).HasDefaultValue(true);
            });

            // Configure Service entity
            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.IconUrl).HasMaxLength(500);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.DisplayOrder).HasDefaultValue(0);
            });

            // Configure Complaint entity
            modelBuilder.Entity<Complaint>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Subject).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.SubmissionDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Pending");
                entity.Property(e => e.ContactName).HasMaxLength(100);
                entity.Property(e => e.ContactEmail).HasMaxLength(100);
                entity.Property(e => e.ContactPhone).HasMaxLength(20);
            });

            // Configure ContactInquiry entity
            modelBuilder.Entity<ContactInquiry>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Subject).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Message).IsRequired();
                entity.Property(e => e.SubmissionDate).HasDefaultValueSql("datetime('now')");
                entity.Property(e => e.IsRead).HasDefaultValue(false);
            });

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed default admin user
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@municipality.gov",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), // Default password
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Seed sample services
            modelBuilder.Entity<Service>().HasData(
                new Service
                {
                    Id = 1,
                    Name = "Building Permits",
                    Description = "Apply for building permits and construction approvals",
                    IsActive = true,
                    DisplayOrder = 1,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 2,
                    Name = "Waste Management",
                    Description = "Garbage collection and recycling services",
                    IsActive = true,
                    DisplayOrder = 2,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 3,
                    Name = "Water & Utilities",
                    Description = "Water supply and utility services management",
                    IsActive = true,
                    DisplayOrder = 3,
                    CreatedAt = DateTime.UtcNow
                },
                new Service
                {
                    Id = 4,
                    Name = "Public Transportation",
                    Description = "Public bus and transportation services",
                    IsActive = true,
                    DisplayOrder = 4,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}

