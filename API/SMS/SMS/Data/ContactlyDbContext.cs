using Microsoft.EntityFrameworkCore;
using SMS.Models.Domain;

namespace SMS.Data
{
    public class ContactlyDbContext : DbContext
    {
        public ContactlyDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Contact> Contacts { get; set; }
    }
}
