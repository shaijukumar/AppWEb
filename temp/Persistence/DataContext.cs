using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        public DbSet<ToDo> Todos { get; set; }
        public DbSet<PageTag> PageTags { get; set; }
		//##ModelDbSet##

        protected override void OnModelCreating(ModelBuilder builder)
        {
              base.OnModelCreating(builder);         
        }
    }
}

