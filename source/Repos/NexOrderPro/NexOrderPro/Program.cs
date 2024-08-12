using Microsoft.EntityFrameworkCore;
using NexOrderPro.Data;
using Microsoft.Extensions.Logging;
using NexOrderPro.Services;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register the ProductService and OrderService
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles(configuration => {
    configuration.RootPath = "ClientApp/build";
});

builder.Services.AddLogging();

var app = builder.Build();
var logger = app.Services.GetRequiredService<ILogger<Program>>();

// Database initialization
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    try {
        var context = services.GetRequiredService<ApplicationDbContext>();
        var connection = context.Database.GetDbConnection();
        logger.LogInformation($"Database path: {connection.DataSource}");
        context.Database.EnsureCreated();
        logger.LogInformation("Database created successfully.");
    }
    catch (Exception ex) {
        logger.LogError($"An error occurred while creating the database: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder => {
    builder.UseSpa(spa => {
        spa.Options.SourcePath = "ClientApp";
        if (app.Environment.IsDevelopment()) {
            spa.UseReactDevelopmentServer(npmScript: "start");
        }
    });
});

app.Run();