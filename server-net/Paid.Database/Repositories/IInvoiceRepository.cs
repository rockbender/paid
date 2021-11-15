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
        Task<InvoiceListModel[]> GetInvoices(InvoiceQueryParameter queryParams);
        Task<InvoiceDetailModel> GetInvoiceById(int id);
        Task<Invoice> AddInvoice(InvoiceModel invoice);
  }
}
