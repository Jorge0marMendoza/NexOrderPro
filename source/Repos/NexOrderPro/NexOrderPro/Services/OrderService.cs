using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NexOrderPro.Data;
using NexOrderPro.Models;

namespace NexOrderPro.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders.Include(o => o.Product).ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.Include(o => o.Product).FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            var product = await _context.Products.FindAsync(order.ProductId);
            if (product == null) {
                throw new ArgumentException($"Product with ID {order.ProductId} not found.");
            }

            order.Product = product;
            order.OrderDate = DateTime.Now;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            await _context.Entry(order).ReloadAsync();
            return order;
        }

    }
}