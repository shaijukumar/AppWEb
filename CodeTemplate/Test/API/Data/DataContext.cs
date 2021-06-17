using API.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserPhoto> UserPhoto { get; set; }
        public DbSet<CatalogPhoto> CatalogPhotos { get; set; }
        public DbSet<Value> Values { get; set; }
        public DbSet<Catalog> Catalogs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AppConfig> AppConfig { get; set; }
        public DbSet<CategorySize> CategorySize { get; set; }
        public DbSet<CategoryColores> CategoryColores { get; set; }
        public DbSet<TestApp> TestApps { get; set; }
		//##ModelDbSet##
 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);



            //builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "User", NormalizedName = "USER", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });
            //builder.Entity<IdentityRole>().HasData(new IdentityRole { Name = "Admin", NormalizedName = "ADMIN", Id = Guid.NewGuid().ToString(), ConcurrencyStamp = Guid.NewGuid().ToString() });

            //    builder.Entity<Value>()
            //        .HasData(
            //            new Value { Id = 1, Name = "Value 101" },
            //            new Value { Id = 2, Name = "Value 102" },
            //            new Value { Id = 3, Name = "Value 103" }
            //        );
        }
    }
}




