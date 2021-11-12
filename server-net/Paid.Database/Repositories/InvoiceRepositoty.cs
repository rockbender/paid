using System;
using System.Linq;
using Paid.Database.DbContexts;
using Paid.Domain.Entities;
using Paid.Domain.Models;
using AutoMapper;
using Paid.Implementation.QueryParameters;
using System.Threading.Tasks;

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

        public Invoice GetInvoiceById(int id)
        {
            return _dbContext.Invoices.SingleOrDefault(x => x.Id == id);
        }

        public Invoice[] GetInvoices()
        {
            return _dbContext.Invoices.ToArray();
        }

        public Invoice[] GetInvoices(InvoiceQueryParameter queryParams)
        {
            var invoices = _dbContext.Invoices.AsQueryable();

            if (queryParams.IsPaid.HasValue)
            {
                invoices = invoices.Where(x => x.IsPaid == queryParams.IsPaid.Value);
            }
            if (queryParams.DueDate.HasValue)
            {
                invoices = invoices.Where(x => x.DueDate >= queryParams.DueDate.Value);
            }

            return invoices
                .OrderBy(x => x.CreatedDate)
                .ToArray();
        }
    }
}
