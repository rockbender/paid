using System;
using System.Threading.Tasks;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using Paid.Implementation.QueryParameters;

namespace Paid.Database.Repositories
{
    public interface IInvoiceRepository
    {
        Invoice[] GetInvoices();
        Invoice[] GetInvoices(InvoiceQueryParameter queryParams);
        Invoice GetInvoiceById(int id);
        Task<Invoice> AddInvoice(InvoiceModel invoice);
    }
}
