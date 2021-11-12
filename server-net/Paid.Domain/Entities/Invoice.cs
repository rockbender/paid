using System;
using System.Collections.Generic;

#nullable disable

namespace Paid.Domain.Entities
{
    public partial class Invoice
    {
        public Invoice()
        {
            WorkItems = new HashSet<WorkItem>();
        }

        public int Id { get; set; }
        public int ProjectId { get; set; }
        public bool IsPaid { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public DateTime? LogicallyDeletedDate { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<WorkItem> WorkItems { get; set; }
    }
}
