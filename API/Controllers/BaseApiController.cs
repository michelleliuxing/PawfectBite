using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Sets the base route for all derived controllers to "api/[controller]"
    [Route("api/[controller]")]
    // Marks this class as an API controller (enables features like model binding, validation, etc.)
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        // Base controller for common functionality
        // No longer using MediatR - using direct database operations instead
    }
}
