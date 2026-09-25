using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OmniPay.Application.Commands;
using System.Threading.Tasks;

namespace OmniPay.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TransactionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> TransferFunds([FromBody] ProcessFundTransferCommand command)
        {
            var result = await _mediator.Send(command);

            if (result)
            {
                return Ok("Transfer successful.");
            }
            else
            {
                return BadRequest("Transfer failed.");
            }
        }
    }
}
