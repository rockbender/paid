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

        public async Task<Invoice> AddInvoice(InvoiceModel invoice)
        {
            var newInvoice = _mapper.Map<Invoice>(invoice);

            await _dbContext.AddAsync<Invoice>(newInvoice);
            _dbContext.SaveChanges();

            return newInvoice;
        }

        public async Task<InvoiceDetailModel> GetInvoiceById(int id)
        {
            // Eager Load the related data
            var invoice = await _dbContext.Invoices
            .Include(x => x.WorkItems)
            .Include(x => x.Project)
            .SingleOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<InvoiceDetailModel>(invoice);
        }

        public Invoice[] GetInvoices()
        {
            return _dbContext.Invoices.ToArray();
        }

        public async Task<InvoiceListModel[]> GetInvoices(InvoiceQueryParameter queryParams)
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

            var invoices = await invoicesQuery.ToArrayAsync();

            var result = _mapper.Map<InvoiceListModel[]>(invoices);

            return result
                .OrderByDescending(x => x.DueDate)
                .ToArray();
        }
  }
}
