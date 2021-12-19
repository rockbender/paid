using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using Paid.Database.Repositories;
using Paid.Implementation.QueryParameters;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace Paid.Api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class InvoicesController : ControllerBase
    {
        private ILogger<InvoicesController> _logger;
        private IInvoiceRepository _invoiceRepo;

        public InvoicesController(ILogger<InvoicesController> logger, IInvoiceRepository invoiceRepository)
        {
            _logger = logger;
            _invoiceRepo = invoiceRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(InvoiceListModel[]), StatusCodes.Status200OK)]
        public async Task<ActionResult<InvoiceListModel[]>> GetInvoicesAsync([FromQuery] InvoiceQueryParameter queryParams)
        {
            System.Console.WriteLine(JsonSerializer.Serialize(queryParams));
            var result = await _invoiceRepo.GetInvoicesAsync(queryParams);
            return result;
        }

        [HttpGet("{id}", Name = "GetInvoice")]
        [ProducesResponseType(typeof(InvoiceDetailModel), StatusCodes.Status200OK)]
        public async Task<ActionResult<InvoiceDetailModel>> GetInvoiceByIdAsync(int id)
        {
            var result = await _invoiceRepo.GetInvoiceByIdAsync(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Invoice), StatusCodes.Status200OK)]
        public async Task<ActionResult<Invoice>> AddInvoiceAsync(InvoiceModel invoice)
        {
            var newInvoice = await _invoiceRepo.AddInvoiceAsync(invoice);
            return CreatedAtRoute("GetInvoice", new { id = newInvoice.Id }, newInvoice);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Invoice), StatusCodes.Status200OK)]
        public async Task<ActionResult<Invoice>> UpdateInvocieAsync(InvoiceModel model)
        {
            var invocieToupdate = await _invoiceRepo.UpdateInvoiceAsync(model);
            return CreatedAtRoute("GetInvoice", new { id = invocieToupdate.Id }, invocieToupdate);
        }

        [HttpDelete("{invoiceId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult> DeleteInvoice(int invoiceId)
        {
            var existingInvoice = await _invoiceRepo.GetInvoiceByIdAsync(invoiceId);

            if(existingInvoice == null)
            {
                return NotFound();
            }

            await _invoiceRepo.DeleteInvoice(invoiceId);
            return NoContent();
        }
    }
}
