using Microsoft.EntityFrameworkCore;
using Paid.Domain.Entities;

#nullable disable

namespace Paid.Database.DbContexts
{
    public partial class PaidDbContext : DbContext
    {
        public PaidDbContext()
        {
        }

        public PaidDbContext(DbContextOptions<PaidDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<WorkItem> WorkItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.ToTable("invoice");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("created_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.DueDate).HasColumnName("due_date");

                entity.Property(e => e.InvoiceDate).HasColumnName("invoice_date");

                entity.Property(e => e.IsPaid).HasColumnName("is_paid");

                entity.Property(e => e.LogicallyDeletedDate).HasColumnName("logically_deleted_date");

                entity.Property(e => e.PeriodEndDate).HasColumnName("period_end_date");

                entity.Property(e => e.PeriodStartDate).HasColumnName("period_start_date");

                entity.Property(e => e.ProjectId).HasColumnName("project_id");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Invoices)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("invoice_project");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("project");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("created_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasColumnName("is_active")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.LogicallyDeletedDate).HasColumnName("logically_deleted_date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.Rate).HasColumnName("rate");
            });

            modelBuilder.Entity<WorkItem>(entity =>
            {
                entity.ToTable("work_item");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedDate)
                    .HasColumnName("created_date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Duration).HasColumnName("duration");

                entity.Property(e => e.InvoiceId).HasColumnName("invoice_id");

                //Causing circular dependency
                //entity
                    //.HasOne(d => d.Invoice)
                    //.WithMany(p => p.WorkItems)
                    //.HasForeignKey(d => d.InvoiceId)
                    //.OnDelete(DeleteBehavior.ClientSetNull)
                    //.HasConstraintName("invoice_work_item");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
