using Microsoft.EntityFrameworkCore.Migrations;

namespace NexOrderPro.Migrations
{
    public partial class SeedCarCleaningProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductName", "Description", "ProductPrice", "Category" },
                values: new object[,]
                {
                    { "Ultimate Car Wash Soap", "High-foaming car wash soap for a streak-free shine", 14.99m, "Exterior Cleaning" },
                    { "Microfiber Wash Mitt", "Ultra-soft microfiber mitt for gentle car washing", 9.99m, "Cleaning Tools" },
                    { "Wheel Cleaner Spray", "Powerful spray to remove brake dust and grime from wheels", 12.99m, "Wheel Care" },
                    { "Interior Detailing Spray", "All-in-one interior cleaner and protectant", 11.99m, "Interior Cleaning" },
                    { "Car Wax", "Long-lasting carnauba wax for ultimate paint protection", 24.99m, "Paint Protection" },
                    { "Glass Cleaner", "Streak-free formula for crystal clear windows", 8.99m, "Glass Care" },
                    { "Tire Shine Gel", "Long-lasting tire shine for a wet look", 15.99m, "Tire Care" },
                    { "Leather Cleaner and Conditioner", "2-in-1 solution to clean and moisturize leather", 19.99m, "Interior Care" },
                    { "Clay Bar Kit", "Remove contaminants and restore smooth paint", 29.99m, "Paint Correction" },
                    { "Microfiber Towels (Pack of 12)", "Ultra-soft, lint-free towels for various cleaning tasks", 18.99m, "Cleaning Tools" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "ProductName",
                keyValues: new object[]
                {
                    "Ultimate Car Wash Soap", "Microfiber Wash Mitt", "Wheel Cleaner Spray",
                    "Interior Detailing Spray", "Car Wax", "Glass Cleaner", "Tire Shine Gel",
                    "Leather Cleaner and Conditioner", "Clay Bar Kit", "Microfiber Towels (Pack of 12)"
                });
        }
    }
}