using System;

namespace Paid.Domain.Models
{
    public class InvoiceModel
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsPaid { get; set; }
        public DateTime PeriodStartDate { get; set; }
        public DateTime PeriodEndDate { get; set; }
        public WorkItemModel[] WorkItems { get; set; }
    }
}
