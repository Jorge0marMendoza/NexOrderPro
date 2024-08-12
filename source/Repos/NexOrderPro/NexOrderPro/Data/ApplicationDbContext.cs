using Microsoft.EntityFrameworkCore;
using NexOrderPro.Models;

namespace NexOrderPro.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId);
                entity.Property(e => e.ProductName).IsRequired();
                entity.Property(e => e.ProductPrice).HasColumnType("REAL");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.OrderId);
                entity.Property(e => e.CustomerName).IsRequired();
                entity.Property(e => e.Quantity).IsRequired();
                entity.Property(e => e.OrderDate).IsRequired();
                entity.HasOne(d => d.Product)
                      .WithMany()
                      .HasForeignKey(d => d.ProductId);
            });
        }
    }
}
