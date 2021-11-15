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

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(255)
                    .HasColumnName("address_line1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(255)
                    .HasColumnName("address line2");

                entity.Property(e => e.City)
                    .HasMaxLength(255)
                    .HasColumnName("city");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .HasColumnName("country");

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

                entity.Property(e => e.PostalCode)
                    .HasMaxLength(255)
                    .HasColumnName("postal_code");

                entity.Property(e => e.Province)
                    .HasMaxLength(255)
                    .HasColumnName("province");

                entity.Property(e => e.RateCents).HasColumnName("rateCents");
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

                entity.Property(e => e.DurationMins).HasColumnName("duration_mins");

                entity.Property(e => e.InvoiceId).HasColumnName("invoice_id");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.WorkItems)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("invoice_work_item");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
