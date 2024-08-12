using System.ComponentModel.DataAnnotations;

namespace NexOrderPro.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "The ProductId field is required and must be greater than 0.")]
        public int ProductId { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "The Quantity field is required and must be greater than 0.")]

        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }
        public Product? Product { get; set; }

    }
}
