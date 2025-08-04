using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Municipality.Business.DTOs;
using Municipality.Business.Services;

namespace Municipality.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactInquiryService _contactInquiryService;

        public ContactController(IContactInquiryService contactInquiryService)
        {
            _contactInquiryService = contactInquiryService;
        }

        [HttpPost]
        public async Task<ActionResult<ContactInquiryDto>> CreateContactInquiry([FromBody] CreateContactInquiryDto createContactInquiryDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var inquiry = await _contactInquiryService.CreateContactInquiryAsync(createContactInquiryDto);
            return CreatedAtAction(nameof(GetContactInquiryById), new { id = inquiry.Id }, inquiry);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ContactInquiryDto>> GetContactInquiryById(int id)
        {
            var inquiry = await _contactInquiryService.GetContactInquiryByIdAsync(id);
            if (inquiry == null)
                return NotFound();

            return Ok(inquiry);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ContactInquiryDto>>> GetAllContactInquiries()
        {
            var inquiries = await _contactInquiryService.GetAllContactInquiriesAsync();
            return Ok(inquiries);
        }

        [HttpGet("unread")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ContactInquiryDto>>> GetUnreadContactInquiries()
        {
            var inquiries = await _contactInquiryService.GetUnreadContactInquiriesAsync();
            return Ok(inquiries);
        }

        [HttpPut("{id}/mark-read")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> MarkAsRead(int id)
        {
            var result = await _contactInquiryService.MarkAsReadAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteContactInquiry(int id)
        {
            var result = await _contactInquiryService.DeleteContactInquiryAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}

