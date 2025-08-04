using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllEventsAsync();
        Task<IEnumerable<EventDto>> GetActiveEventsAsync();
        Task<EventDto?> GetEventByIdAsync(int id);
        Task<EventDto> CreateEventAsync(CreateEventDto createEventDto);
        Task<EventDto?> UpdateEventAsync(int id, UpdateEventDto updateEventDto);
        Task<bool> DeleteEventAsync(int id);
        Task<IEnumerable<EventDto>> GetUpcomingEventsAsync(int count = 10);
    }
}

