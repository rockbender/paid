using System;
using System.Collections.Generic;
using Paid.Domain.Models;

public class InvoiceDetailModel
{
    public int InvoiceId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }
    public ProjectModel Project { get; set; }
    public DateTime PeriodStartDate { get; set; }
    public DateTime PeriodEndDate { get; set; }
    public ICollection<WorkItemModel> WorkItems { get; set; }
}