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
        public bool? IsActive { get; set; }
        public DateTime? LogicallyDeletedDate { get; set; }
        public int? RateCents { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        [JsonIgnore]
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
