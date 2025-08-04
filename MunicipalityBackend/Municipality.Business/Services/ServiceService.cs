using Municipality.Business.DTOs;
using Municipality.Data.Entities;
using Municipality.Data.Repositories;

namespace Municipality.Business.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IRepository<Service> _serviceRepository;

        public ServiceService(IRepository<Service> serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        public async Task<IEnumerable<ServiceDto>> GetAllServicesAsync()
        {
            var services = await _serviceRepository.GetAllAsync();
            return services.OrderBy(s => s.DisplayOrder).Select(MapToDto);
        }

        public async Task<IEnumerable<ServiceDto>> GetActiveServicesAsync()
        {
            var services = await _serviceRepository.FindAsync(s => s.IsActive);
            return services.OrderBy(s => s.DisplayOrder).Select(MapToDto);
        }

        public async Task<ServiceDto?> GetServiceByIdAsync(int id)
        {
            var service = await _serviceRepository.GetByIdAsync(id);
            return service != null ? MapToDto(service) : null;
        }

        public async Task<ServiceDto> CreateServiceAsync(CreateServiceDto createServiceDto)
        {
            var service = new Service
            {
                Name = createServiceDto.Name,
                Description = createServiceDto.Description,
                IconUrl = createServiceDto.IconUrl,
                IsActive = createServiceDto.IsActive,
                DisplayOrder = createServiceDto.DisplayOrder,
                CreatedAt = DateTime.UtcNow
            };

            var createdService = await _serviceRepository.AddAsync(service);
            return MapToDto(createdService);
        }

        public async Task<ServiceDto?> UpdateServiceAsync(int id, UpdateServiceDto updateServiceDto)
        {
            var existingService = await _serviceRepository.GetByIdAsync(id);
            if (existingService == null)
                return null;

            existingService.Name = updateServiceDto.Name;
            existingService.Description = updateServiceDto.Description;
            existingService.IconUrl = updateServiceDto.IconUrl;
            existingService.IsActive = updateServiceDto.IsActive;
            existingService.DisplayOrder = updateServiceDto.DisplayOrder;

            var updatedService = await _serviceRepository.UpdateAsync(existingService);
            return MapToDto(updatedService);
        }

        public async Task<bool> DeleteServiceAsync(int id)
        {
            var exists = await _serviceRepository.ExistsAsync(id);
            if (!exists)
                return false;

            await _serviceRepository.DeleteAsync(id);
            return true;
        }

        private static ServiceDto MapToDto(Service service)
        {
            return new ServiceDto
            {
                Id = service.Id,
                Name = service.Name,
                Description = service.Description,
                IconUrl = service.IconUrl,
                IsActive = service.IsActive,
                CreatedAt = service.CreatedAt,
                DisplayOrder = service.DisplayOrder
            };
        }
    }
}

