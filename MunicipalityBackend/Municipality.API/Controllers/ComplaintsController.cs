using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Municipality.Business.DTOs;
using Municipality.Business.Services;

namespace Municipality.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintsController : ControllerBase
    {
        private readonly IComplaintService _complaintService;

        public ComplaintsController(IComplaintService complaintService)
        {
            _complaintService = complaintService;
        }

        [HttpPost]
        public async Task<ActionResult<ComplaintDto>> CreateComplaint([FromBody] CreateComplaintDto createComplaintDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var complaint = await _complaintService.CreateComplaintAsync(createComplaintDto);
            return CreatedAtAction(nameof(GetComplaintById), new { id = complaint.Id }, complaint);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ComplaintDto>> GetComplaintById(int id)
        {
            var complaint = await _complaintService.GetComplaintByIdAsync(id);
            if (complaint == null)
                return NotFound();

            return Ok(complaint);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ComplaintDto>>> GetAllComplaints()
        {
            var complaints = await _complaintService.GetAllComplaintsAsync();
            return Ok(complaints);
        }

        [HttpGet("status/{status}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ComplaintDto>>> GetComplaintsByStatus(string status)
        {
            var complaints = await _complaintService.GetComplaintsByStatusAsync(status);
            return Ok(complaints);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ComplaintDto>> UpdateComplaintStatus(int id, [FromBody] UpdateComplaintStatusDto updateStatusDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var complaint = await _complaintService.UpdateComplaintStatusAsync(id, updateStatusDto);
            if (complaint == null)
                return NotFound();

            return Ok(complaint);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteComplaint(int id)
        {
            var result = await _complaintService.DeleteComplaintAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}

