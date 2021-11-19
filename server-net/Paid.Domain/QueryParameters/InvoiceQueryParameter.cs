using System;
namespace Paid.Implementation.QueryParameters
{
    public class InvoiceQueryParameter
    {
        public bool? IsPaid { get; set; }
        public DateTime? DueDate { get; set; }
        public int[] ProjectIds { get; set; }
    }
}
