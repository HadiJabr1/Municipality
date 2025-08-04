using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface IServiceService
    {
        Task<IEnumerable<ServiceDto>> GetAllServicesAsync();
        Task<IEnumerable<ServiceDto>> GetActiveServicesAsync();
        Task<ServiceDto?> GetServiceByIdAsync(int id);
        Task<ServiceDto> CreateServiceAsync(CreateServiceDto createServiceDto);
        Task<ServiceDto?> UpdateServiceAsync(int id, UpdateServiceDto updateServiceDto);
        Task<bool> DeleteServiceAsync(int id);
    }
}

