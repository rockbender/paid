using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using Paid.Database.Repositories;
using Paid.Implementation.QueryParameters;

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
        public ActionResult<IAsyncEnumerable<Invoice>[]> GetInvoices([FromQuery] InvoiceQueryParameter queryParams)
        {
            return new JsonResult(_invoiceRepo.GetInvoices(queryParams));
        }


        [HttpGet("{id}", Name = "GetInvoice")]
        public ActionResult<Invoice> GetInvoiceById(int id)
        {
            var result = _invoiceRepo.GetInvoiceById(id);

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpPost]
        public async System.Threading.Tasks.Task<ActionResult<Invoice>> AddInvoiceAsync(InvoiceModel invoice)
        {
            var newInvoice = await _invoiceRepo.AddInvoice(invoice);
            return CreatedAtRoute("GetInvoice", new { id = newInvoice.Id }, newInvoice);
        }
    }
}
