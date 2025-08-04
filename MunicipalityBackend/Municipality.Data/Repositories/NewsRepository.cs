using Microsoft.EntityFrameworkCore;
using Municipality.Data.Entities;

namespace Municipality.Data.Repositories
{
    public class NewsRepository : Repository<News>, INewsRepository
    {
        public NewsRepository(MunicipalityDbContext context) : base(context)
        {
        }

        public override async Task<News?> GetByIdAsync(int id)
        {
            return await _dbSet.Include(n => n.Author).FirstOrDefaultAsync(n => n.Id == id);
        }

        public override async Task<IEnumerable<News>> GetAllAsync()
        {
            return await _dbSet.Include(n => n.Author).OrderByDescending(n => n.PublishDate).ToListAsync();
        }

        public async Task<IEnumerable<News>> GetPublishedNewsAsync()
        {
            return await _dbSet
                .Include(n => n.Author)
                .Where(n => n.IsPublished)
                .OrderByDescending(n => n.PublishDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<News>> GetNewsByAuthorAsync(int authorId)
        {
            return await _dbSet
                .Include(n => n.Author)
                .Where(n => n.AuthorId == authorId)
                .OrderByDescending(n => n.PublishDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<News>> GetRecentNewsAsync(int count = 10)
        {
            return await _dbSet
                .Include(n => n.Author)
                .Where(n => n.IsPublished)
                .OrderByDescending(n => n.PublishDate)
                .Take(count)
                .ToListAsync();
        }
    }
}

