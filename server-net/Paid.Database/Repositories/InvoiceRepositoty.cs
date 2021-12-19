using System;
using System.Linq;
using Paid.Database.DbContexts;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using AutoMapper;
using Paid.Implementation.QueryParameters;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Paid.Database.Repositories
{
    public class InvoiceRepositoty : IInvoiceRepository
    {
        private PaidDbContext _dbContext;
        private IMapper _mapper;

        public InvoiceRepositoty(PaidDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<Invoice> AddInvoiceAsync(InvoiceModel invoice)
        {
            var newInvoice = _mapper.Map<Invoice>(invoice);

            await _dbContext.AddAsync<Invoice>(newInvoice);
            _dbContext.SaveChanges();

            return newInvoice;
        }

    public async Task DeleteInvoice(int invoiceId)
    {
      var existingInvoice = await _dbContext.Invoices.SingleOrDefaultAsync(x => x.Id == invoiceId);

      if(existingInvoice != null)
      {
          _dbContext.Invoices.Remove(existingInvoice);
          await _dbContext.SaveChangesAsync();
      }
    }

    public async Task<InvoiceDetailModel> GetInvoiceByIdAsync(int id)
        {
            // Eager Load the related data
            var invoice = await _dbContext.Invoices
            .Include(x => x.WorkItems)
            .Include(x => x.Project)
            .SingleOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<InvoiceDetailModel>(invoice);
        }

        public async Task<Invoice[]> GetInvoicesAsync()
        {
            return await _dbContext.Invoices.ToArrayAsync();
        }

        public async Task<InvoiceListModel[]> GetInvoicesAsync(InvoiceQueryParameter queryParams)
        {
            var invoicesQuery = _dbContext.Invoices
                .Include(x => x.Project)
                .Include(x => x.WorkItems)
                .AsQueryable()
                ;

            if (queryParams.IsPaid.HasValue)
            {
                invoicesQuery = invoicesQuery.Where(x => x.IsPaid == queryParams.IsPaid.Value);
            }
            if (queryParams.DueDate.HasValue)
            {
                invoicesQuery = invoicesQuery.Where(x => x.DueDate >= queryParams.DueDate.Value);
            }
            if (queryParams.ProjectIds?.Length > 0)
            {
                invoicesQuery = invoicesQuery.Where(x => queryParams.ProjectIds.Contains(x.ProjectId));
            }

            var invoices = await invoicesQuery.ToArrayAsync();

            var result = _mapper.Map<InvoiceListModel[]>(invoices);

            return result
                .OrderByDescending(x => x.InvoiceId)
                .ToArray();
        }

    public async Task<Invoice> UpdateInvoiceAsync(InvoiceModel invoiceModel)
    {
            var existingInvoice = _dbContext.Invoices
                .Include(c => c.WorkItems)
                .SingleOrDefault(x => x.Id == invoiceModel.Id);

            if(existingInvoice == null)
            {
                return null;
            }

            _mapper.Map<InvoiceModel, Invoice>(invoiceModel, existingInvoice);
            _dbContext.Update<Invoice>(existingInvoice);
            await _dbContext.SaveChangesAsync();

            return existingInvoice;
    }
  }
}
