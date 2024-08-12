using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NexOrderPro.Models;
using NexOrderPro.Services;

namespace NexOrderPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(IProductService productService, ILogger<ProductsController> logger)
        {
            _productService = productService;
            _logger = logger;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            try {
                var products = await _productService.GetAllProductsAsync();
                return products.Any() ? Ok(products) : NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error occurred while retrieving products");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        //// GET: api/Products/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Product>> GetProduct(int id)
        //{
        //    try {
        //        var product = await _productService.GetProductByIdAsync(id);
        //        return product != null ? Ok(product) : NotFound($"Product with ID {id} not found");
        //    }
        //    catch (Exception ex) {
        //        _logger.LogError(ex, "Error occurred while retrieving product with ID: {ProductId}", id);
        //        return StatusCode(500, "An error occurred while processing your request.");
        //    }
        //}

    }
}