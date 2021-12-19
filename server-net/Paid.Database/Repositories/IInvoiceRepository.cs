using System;
using System.Threading.Tasks;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using Paid.Implementation.QueryParameters;

namespace Paid.Database.Repositories
{
    public interface IInvoiceRepository
    {
        Task<InvoiceListModel[]> GetInvoicesAsync(InvoiceQueryParameter queryParams);
        Task<InvoiceDetailModel> GetInvoiceByIdAsync(int id);
        Task<Invoice> AddInvoiceAsync(InvoiceModel invoice);
        Task DeleteInvoice(int invoiceId);
        Task<Invoice> UpdateInvoiceAsync(InvoiceModel invoice);
  }
}
