using Municipality.Business.DTOs;
using Municipality.Data.Entities;
using Municipality.Data.Repositories;

namespace Municipality.Business.Services
{
    public class EventService : IEventService
    {
        private readonly IRepository<Event> _eventRepository;

        public EventService(IRepository<Event> eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<EventDto>> GetAllEventsAsync()
        {
            var events = await _eventRepository.GetAllAsync();
            return events.OrderByDescending(e => e.EventDate).Select(MapToDto);
        }

        public async Task<IEnumerable<EventDto>> GetActiveEventsAsync()
        {
            var events = await _eventRepository.FindAsync(e => e.IsActive);
            return events.OrderByDescending(e => e.EventDate).Select(MapToDto);
        }

        public async Task<EventDto?> GetEventByIdAsync(int id)
        {
            var eventEntity = await _eventRepository.GetByIdAsync(id);
            return eventEntity != null ? MapToDto(eventEntity) : null;
        }

        public async Task<EventDto> CreateEventAsync(CreateEventDto createEventDto)
        {
            var eventEntity = new Event
            {
                Title = createEventDto.Title,
                Description = createEventDto.Description,
                EventDate = createEventDto.EventDate,
                Location = createEventDto.Location,
                ImageUrl = createEventDto.ImageUrl,
                IsActive = createEventDto.IsActive,
                CreatedAt = DateTime.UtcNow
            };

            var createdEvent = await _eventRepository.AddAsync(eventEntity);
            return MapToDto(createdEvent);
        }

        public async Task<EventDto?> UpdateEventAsync(int id, UpdateEventDto updateEventDto)
        {
            var existingEvent = await _eventRepository.GetByIdAsync(id);
            if (existingEvent == null)
                return null;

            existingEvent.Title = updateEventDto.Title;
            existingEvent.Description = updateEventDto.Description;
            existingEvent.EventDate = updateEventDto.EventDate;
            existingEvent.Location = updateEventDto.Location;
            existingEvent.ImageUrl = updateEventDto.ImageUrl;
            existingEvent.IsActive = updateEventDto.IsActive;

            var updatedEvent = await _eventRepository.UpdateAsync(existingEvent);
            return MapToDto(updatedEvent);
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            var exists = await _eventRepository.ExistsAsync(id);
            if (!exists)
                return false;

            await _eventRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<EventDto>> GetUpcomingEventsAsync(int count = 10)
        {
            var events = await _eventRepository.FindAsync(e => e.IsActive && e.EventDate >= DateTime.UtcNow);
            return events.OrderBy(e => e.EventDate).Take(count).Select(MapToDto);
        }

        private static EventDto MapToDto(Event eventEntity)
        {
            return new EventDto
            {
                Id = eventEntity.Id,
                Title = eventEntity.Title,
                Description = eventEntity.Description,
                EventDate = eventEntity.EventDate,
                Location = eventEntity.Location,
                ImageUrl = eventEntity.ImageUrl,
                CreatedAt = eventEntity.CreatedAt,
                IsActive = eventEntity.IsActive
            };
        }
    }
}

