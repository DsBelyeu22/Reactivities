using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Activities;
using Application.Core;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
// middleware - things that can do something to 
// http request going in and out
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
// using statement--> when done with this scope anything inside it will be destroyed
// creating a scope to have access to a service within the scope of DataContext
// When API controller gets HTTP request, it will create new isntance of DataContext
// The new isntance will be disposed of when the http request is done

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
   await context.Database.MigrateAsync();
    await Seed.SeedData(context);

}
catch (Exception ex)
{

    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An Error Occured during migration");
}

app.Run();
