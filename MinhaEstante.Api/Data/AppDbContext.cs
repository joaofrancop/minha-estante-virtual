using Microsoft.EntityFrameworkCore;
using MinhaEstante.Api.Models;

namespace MinhaEstante.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Livro> Livros { get; set; }
    }
}