using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Municipality.Business.DTOs;
using Municipality.Business.Services;
using Municipality.Data.Repositories;
using System.Security.Claims;

namespace Municipality.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        private readonly IUserRepository _userRepository;

        public NewsController(INewsService newsService, IUserRepository userRepository)
        {
            _newsService = newsService;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsDto>>> GetAllNews()
        {
            var news = await _newsService.GetPublishedNewsAsync();
            return Ok(news);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<NewsDto>> GetNewsById(int id)
        {
            var news = await _newsService.GetNewsByIdAsync(id);
            if (news == null)
                return NotFound();

            return Ok(news);
        }

        [HttpGet("recent")]
        public async Task<ActionResult<IEnumerable<NewsDto>>> GetRecentNews([FromQuery] int count = 10)
        {
            var news = await _newsService.GetRecentNewsAsync(count);
            return Ok(news);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<NewsDto>> CreateNews([FromBody] CreateNewsDto createNewsDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
                return Unauthorized();

            var news = await _newsService.CreateNewsAsync(createNewsDto, user.Id);
            return CreatedAtAction(nameof(GetNewsById), new { id = news.Id }, news);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<NewsDto>> UpdateNews(int id, [FromBody] UpdateNewsDto updateNewsDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var news = await _newsService.UpdateNewsAsync(id, updateNewsDto);
            if (news == null)
                return NotFound();

            return Ok(news);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var result = await _newsService.DeleteNewsAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("admin/all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<NewsDto>>> GetAllNewsForAdmin()
        {
            var news = await _newsService.GetAllNewsAsync();
            return Ok(news);
        }
    }
}

