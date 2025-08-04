using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Municipality.Business.DTOs;
using Municipality.Business.Services;

namespace Municipality.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
        {
            var events = await _eventService.GetActiveEventsAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEventById(int id)
        {
            var eventDto = await _eventService.GetEventByIdAsync(id);
            if (eventDto == null)
                return NotFound();

            return Ok(eventDto);
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetUpcomingEvents([FromQuery] int count = 10)
        {
            var events = await _eventService.GetUpcomingEventsAsync(count);
            return Ok(events);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EventDto>> CreateEvent([FromBody] CreateEventDto createEventDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventDto = await _eventService.CreateEventAsync(createEventDto);
            return CreatedAtAction(nameof(GetEventById), new { id = eventDto.Id }, eventDto);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EventDto>> UpdateEvent(int id, [FromBody] UpdateEventDto updateEventDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var eventDto = await _eventService.UpdateEventAsync(id, updateEventDto);
            if (eventDto == null)
                return NotFound();

            return Ok(eventDto);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var result = await _eventService.DeleteEventAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("admin/all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEventsForAdmin()
        {
            var events = await _eventService.GetAllEventsAsync();
            return Ok(events);
        }
    }
}

