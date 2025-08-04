using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface INewsService
    {
        Task<IEnumerable<NewsDto>> GetAllNewsAsync();
        Task<IEnumerable<NewsDto>> GetPublishedNewsAsync();
        Task<NewsDto?> GetNewsByIdAsync(int id);
        Task<NewsDto> CreateNewsAsync(CreateNewsDto createNewsDto, int authorId);
        Task<NewsDto?> UpdateNewsAsync(int id, UpdateNewsDto updateNewsDto);
        Task<bool> DeleteNewsAsync(int id);
        Task<IEnumerable<NewsDto>> GetRecentNewsAsync(int count = 10);
    }
}

