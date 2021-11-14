using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Paid.Domain.Entities
{
    public partial class WorkItem
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public int InvoiceId { get; set; }
        public int DurationMins { get; set; }
        public string Description { get; set; }
        public virtual Invoice Invoice { get; set; }
  }
}
