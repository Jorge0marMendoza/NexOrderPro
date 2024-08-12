using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NexOrderPro.Models;
using NexOrderPro.Services;
using Microsoft.Extensions.Logging;

namespace NexOrderPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
        {
            _orderService = orderService;
            _logger = logger;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            try {
                var orders = await _orderService.GetAllOrdersAsync();
                return orders.Any() ? Ok(orders) : NoContent();
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error occurred while retrieving orders");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid order ID. ID must be greater than 0.");            

            try {
                var order = await _orderService.GetOrderByIdAsync(id);

                if (order == null) {
                    _logger.LogInformation("Order not found: {OrderId}", id);
                    return NotFound($"Order with ID {id} not found.");
                }

                return Ok(order);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error occurred while retrieving order with id: {OrderId}", id);
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        // POST api/Orders
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody] Order order)
        {
            if (order == null)
                return BadRequest("Order cannot be null");
          
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            try {
                var createdOrder = await _orderService.CreateOrderAsync(order);
                return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.OrderId }, createdOrder);
            }
            catch (ArgumentException ex) {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error occurred while creating an order");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

    }
}