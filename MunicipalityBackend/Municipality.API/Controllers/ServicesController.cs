using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Municipality.Business.DTOs;
using Municipality.Business.Services;

namespace Municipality.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAllServices()
        {
            var services = await _serviceService.GetActiveServicesAsync();
            return Ok(services);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceDto>> GetServiceById(int id)
        {
            var service = await _serviceService.GetServiceByIdAsync(id);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceDto>> CreateService([FromBody] CreateServiceDto createServiceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceService.CreateServiceAsync(createServiceDto);
            return CreatedAtAction(nameof(GetServiceById), new { id = service.Id }, service);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceDto>> UpdateService(int id, [FromBody] UpdateServiceDto updateServiceDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var service = await _serviceService.UpdateServiceAsync(id, updateServiceDto);
            if (service == null)
                return NotFound();

            return Ok(service);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteService(int id)
        {
            var result = await _serviceService.DeleteServiceAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("admin/all")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<ServiceDto>>> GetAllServicesForAdmin()
        {
            var services = await _serviceService.GetAllServicesAsync();
            return Ok(services);
        }
    }
}

