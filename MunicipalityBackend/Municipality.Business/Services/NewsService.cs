using Municipality.Business.DTOs;
using Municipality.Data.Entities;
using Municipality.Data.Repositories;

namespace Municipality.Business.Services
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;

        public NewsService(INewsRepository newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<IEnumerable<NewsDto>> GetAllNewsAsync()
        {
            var news = await _newsRepository.GetAllAsync();
            return news.Select(MapToDto);
        }

        public async Task<IEnumerable<NewsDto>> GetPublishedNewsAsync()
        {
            var news = await _newsRepository.GetPublishedNewsAsync();
            return news.Select(MapToDto);
        }

        public async Task<NewsDto?> GetNewsByIdAsync(int id)
        {
            var news = await _newsRepository.GetByIdAsync(id);
            return news != null ? MapToDto(news) : null;
        }

        public async Task<NewsDto> CreateNewsAsync(CreateNewsDto createNewsDto, int authorId)
        {
            var news = new News
            {
                Title = createNewsDto.Title,
                Content = createNewsDto.Content,
                ImageUrl = createNewsDto.ImageUrl,
                IsPublished = createNewsDto.IsPublished,
                AuthorId = authorId,
                PublishDate = DateTime.UtcNow
            };

            var createdNews = await _newsRepository.AddAsync(news);
            var newsWithAuthor = await _newsRepository.GetByIdAsync(createdNews.Id);
            return MapToDto(newsWithAuthor!);
        }

        public async Task<NewsDto?> UpdateNewsAsync(int id, UpdateNewsDto updateNewsDto)
        {
            var existingNews = await _newsRepository.GetByIdAsync(id);
            if (existingNews == null)
                return null;

            existingNews.Title = updateNewsDto.Title;
            existingNews.Content = updateNewsDto.Content;
            existingNews.ImageUrl = updateNewsDto.ImageUrl;
            existingNews.IsPublished = updateNewsDto.IsPublished;

            var updatedNews = await _newsRepository.UpdateAsync(existingNews);
            return MapToDto(updatedNews);
        }

        public async Task<bool> DeleteNewsAsync(int id)
        {
            var exists = await _newsRepository.ExistsAsync(id);
            if (!exists)
                return false;

            await _newsRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<NewsDto>> GetRecentNewsAsync(int count = 10)
        {
            var news = await _newsRepository.GetRecentNewsAsync(count);
            return news.Select(MapToDto);
        }

        private static NewsDto MapToDto(News news)
        {
            return new NewsDto
            {
                Id = news.Id,
                Title = news.Title,
                Content = news.Content,
                PublishDate = news.PublishDate,
                AuthorId = news.AuthorId,
                AuthorName = news.Author?.Username,
                ImageUrl = news.ImageUrl,
                IsPublished = news.IsPublished
            };
        }
    }
}

