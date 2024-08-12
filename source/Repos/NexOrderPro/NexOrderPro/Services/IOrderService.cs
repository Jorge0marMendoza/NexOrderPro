using System.Collections.Generic;
using System.Threading.Tasks;
using NexOrderPro.Models;

namespace NexOrderPro.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task<Order> CreateOrderAsync(Order order);

    }
}