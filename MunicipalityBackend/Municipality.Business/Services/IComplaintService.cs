using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface IComplaintService
    {
        Task<IEnumerable<ComplaintDto>> GetAllComplaintsAsync();
        Task<ComplaintDto?> GetComplaintByIdAsync(int id);
        Task<ComplaintDto> CreateComplaintAsync(CreateComplaintDto createComplaintDto);
        Task<ComplaintDto?> UpdateComplaintStatusAsync(int id, UpdateComplaintStatusDto updateStatusDto);
        Task<bool> DeleteComplaintAsync(int id);
        Task<IEnumerable<ComplaintDto>> GetComplaintsByStatusAsync(string status);
    }
}

