using System.Collections.Generic;
using System.Threading.Tasks;
using NexOrderPro.Models;

namespace NexOrderPro.Services
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
    }
}