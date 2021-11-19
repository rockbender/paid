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
            var result = await _invoiceRepo.GetInvoices(queryParams);
            return result;
        }

        [HttpGet("{id}", Name = "GetInvoice")]
        [ProducesResponseType(typeof(InvoiceDetailModel), StatusCodes.Status200OK)]
        public async Task<ActionResult<InvoiceDetailModel>> GetInvoiceByIdAsync(int id)
        {
            var result = await _invoiceRepo.GetInvoiceById(id);

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
            var newInvoice = await _invoiceRepo.AddInvoice(invoice);
            return CreatedAtRoute("GetInvoice", new { id = newInvoice.Id }, newInvoice);
        }
    }
}
