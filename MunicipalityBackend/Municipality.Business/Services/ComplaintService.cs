using Municipality.Business.DTOs;
using Municipality.Data.Entities;
using Municipality.Data.Repositories;

namespace Municipality.Business.Services
{
    public class ComplaintService : IComplaintService
    {
        private readonly IRepository<Complaint> _complaintRepository;

        public ComplaintService(IRepository<Complaint> complaintRepository)
        {
            _complaintRepository = complaintRepository;
        }

        public async Task<IEnumerable<ComplaintDto>> GetAllComplaintsAsync()
        {
            var complaints = await _complaintRepository.GetAllAsync();
            return complaints.OrderByDescending(c => c.SubmissionDate).Select(MapToDto);
        }

        public async Task<ComplaintDto?> GetComplaintByIdAsync(int id)
        {
            var complaint = await _complaintRepository.GetByIdAsync(id);
            return complaint != null ? MapToDto(complaint) : null;
        }

        public async Task<ComplaintDto> CreateComplaintAsync(CreateComplaintDto createComplaintDto)
        {
            var complaint = new Complaint
            {
                Subject = createComplaintDto.Subject,
                Description = createComplaintDto.Description,
                ContactName = createComplaintDto.ContactName,
                ContactEmail = createComplaintDto.ContactEmail,
                ContactPhone = createComplaintDto.ContactPhone,
                SubmissionDate = DateTime.UtcNow,
                Status = "Pending"
            };

            var createdComplaint = await _complaintRepository.AddAsync(complaint);
            return MapToDto(createdComplaint);
        }

        public async Task<ComplaintDto?> UpdateComplaintStatusAsync(int id, UpdateComplaintStatusDto updateStatusDto)
        {
            var existingComplaint = await _complaintRepository.GetByIdAsync(id);
            if (existingComplaint == null)
                return null;

            existingComplaint.Status = updateStatusDto.Status;
            existingComplaint.AdminResponse = updateStatusDto.AdminResponse;
            existingComplaint.ResponseDate = DateTime.UtcNow;

            var updatedComplaint = await _complaintRepository.UpdateAsync(existingComplaint);
            return MapToDto(updatedComplaint);
        }

        public async Task<bool> DeleteComplaintAsync(int id)
        {
            var exists = await _complaintRepository.ExistsAsync(id);
            if (!exists)
                return false;

            await _complaintRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<ComplaintDto>> GetComplaintsByStatusAsync(string status)
        {
            var complaints = await _complaintRepository.FindAsync(c => c.Status == status);
            return complaints.OrderByDescending(c => c.SubmissionDate).Select(MapToDto);
        }

        private static ComplaintDto MapToDto(Complaint complaint)
        {
            return new ComplaintDto
            {
                Id = complaint.Id,
                Subject = complaint.Subject,
                Description = complaint.Description,
                SubmissionDate = complaint.SubmissionDate,
                Status = complaint.Status,
                ContactName = complaint.ContactName,
                ContactEmail = complaint.ContactEmail,
                ContactPhone = complaint.ContactPhone,
                AdminResponse = complaint.AdminResponse,
                ResponseDate = complaint.ResponseDate
            };
        }
    }
}

