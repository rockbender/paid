using System;
using System.Collections.Generic;
using Paid.Domain.Entities;
using Paid.Domain.Models;

public class InvoiceDetailModel
{
  public int InvoiceId { get; set; }
  public DateTime InvoiceDate { get; set; }
  public DateTime DueDate { get; set; }
  public ProjectModel Project { get; set; }
  public ICollection<WorkItemModel> WorkItems { get; set; }
}