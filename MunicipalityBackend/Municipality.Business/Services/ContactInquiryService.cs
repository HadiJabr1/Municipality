using Municipality.Business.DTOs;
using Municipality.Data.Entities;
using Municipality.Data.Repositories;

namespace Municipality.Business.Services
{
    public class ContactInquiryService : IContactInquiryService
    {
        private readonly IRepository<ContactInquiry> _contactInquiryRepository;

        public ContactInquiryService(IRepository<ContactInquiry> contactInquiryRepository)
        {
            _contactInquiryRepository = contactInquiryRepository;
        }

        public async Task<IEnumerable<ContactInquiryDto>> GetAllContactInquiriesAsync()
        {
            var inquiries = await _contactInquiryRepository.GetAllAsync();
            return inquiries.OrderByDescending(c => c.SubmissionDate).Select(MapToDto);
        }

        public async Task<ContactInquiryDto?> GetContactInquiryByIdAsync(int id)
        {
            var inquiry = await _contactInquiryRepository.GetByIdAsync(id);
            return inquiry != null ? MapToDto(inquiry) : null;
        }

        public async Task<ContactInquiryDto> CreateContactInquiryAsync(CreateContactInquiryDto createContactInquiryDto)
        {
            var inquiry = new ContactInquiry
            {
                Name = createContactInquiryDto.Name,
                Email = createContactInquiryDto.Email,
                Subject = createContactInquiryDto.Subject,
                Message = createContactInquiryDto.Message,
                SubmissionDate = DateTime.UtcNow,
                IsRead = false
            };

            var createdInquiry = await _contactInquiryRepository.AddAsync(inquiry);
            return MapToDto(createdInquiry);
        }

        public async Task<bool> MarkAsReadAsync(int id)
        {
            var inquiry = await _contactInquiryRepository.GetByIdAsync(id);
            if (inquiry == null)
                return false;

            inquiry.IsRead = true;
            await _contactInquiryRepository.UpdateAsync(inquiry);
            return true;
        }

        public async Task<bool> DeleteContactInquiryAsync(int id)
        {
            var exists = await _contactInquiryRepository.ExistsAsync(id);
            if (!exists)
                return false;

            await _contactInquiryRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<ContactInquiryDto>> GetUnreadContactInquiriesAsync()
        {
            var inquiries = await _contactInquiryRepository.FindAsync(c => !c.IsRead);
            return inquiries.OrderByDescending(c => c.SubmissionDate).Select(MapToDto);
        }

        private static ContactInquiryDto MapToDto(ContactInquiry inquiry)
        {
            return new ContactInquiryDto
            {
                Id = inquiry.Id,
                Name = inquiry.Name,
                Email = inquiry.Email,
                Subject = inquiry.Subject,
                Message = inquiry.Message,
                SubmissionDate = inquiry.SubmissionDate,
                IsRead = inquiry.IsRead
            };
        }
    }
}

