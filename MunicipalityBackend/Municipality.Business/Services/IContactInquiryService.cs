using Municipality.Business.DTOs;

namespace Municipality.Business.Services
{
    public interface IContactInquiryService
    {
        Task<IEnumerable<ContactInquiryDto>> GetAllContactInquiriesAsync();
        Task<ContactInquiryDto?> GetContactInquiryByIdAsync(int id);
        Task<ContactInquiryDto> CreateContactInquiryAsync(CreateContactInquiryDto createContactInquiryDto);
        Task<bool> MarkAsReadAsync(int id);
        Task<bool> DeleteContactInquiryAsync(int id);
        Task<IEnumerable<ContactInquiryDto>> GetUnreadContactInquiriesAsync();
    }
}

