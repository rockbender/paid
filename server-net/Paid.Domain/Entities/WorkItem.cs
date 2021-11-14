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
        public int Duration { get; set; }
        public string Description { get; set; }
        
        // Ignore the property, otherwise Json Serializer throw:
        // System.Text.Json.JsonException: A possible object cycle was detected.
        [JsonIgnore]
        public virtual Invoice Invoice { get; set; }
  }
}
