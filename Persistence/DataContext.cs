
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // DbSet represents the tables we're going to create
        public DbSet<Activity> Activities { get; set; }
    }
}