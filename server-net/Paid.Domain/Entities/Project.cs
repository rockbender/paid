using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Paid.Domain.Entities
{
    public partial class Project
    {
        public Project()
        {
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LogicallyDeletedDate { get; set; }
        public int? Rate { get; set; }

        [JsonIgnore]
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
