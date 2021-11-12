using System;
using System.Collections.Generic;

#nullable disable

namespace Paid.Domain.Entities
{
    public partial class WorkItem
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int InvoiceId { get; set; }
        public int Duration { get; set; }
        public string Description { get; set; }
    }
}
