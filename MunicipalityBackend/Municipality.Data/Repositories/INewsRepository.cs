using Municipality.Data.Entities;

namespace Municipality.Data.Repositories
{
    public interface INewsRepository : IRepository<News>
    {
        Task<IEnumerable<News>> GetPublishedNewsAsync();
        Task<IEnumerable<News>> GetNewsByAuthorAsync(int authorId);
        Task<IEnumerable<News>> GetRecentNewsAsync(int count = 10);
    }
}

