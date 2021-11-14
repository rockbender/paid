using System;

public class InvoiceListModel
{
  public int InvoiceId { get; set; }
  public string ProjectName { get; set; }
  public double TotalAmount { get; set; }
  public DateTime DueDate { get; set; }
  public bool IsPaid { get; set; }
}