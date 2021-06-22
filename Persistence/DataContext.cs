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
		public DbSet<SitePage> SitePages { get; set; }
		public DbSet<PageCategory> PageCategorys { get; set; }		
		public DbSet<AppUserRole> AppUserRoles { get; set; }		
		public DbSet<AppUserAccess> AppUserAccesss { get; set; }
		public DbSet<AppTableMaster> AppTableMasters { get; set; }
		public DbSet<AppColumnMaster> AppColumnMasters { get; set; }
		public DbSet<AppUserRoleMaster> AppUserRoleMasters { get; set; }
		public DbSet<AppData> AppDatas { get; set; }        
		public DbSet<AppStatusList> AppStatusLists { get; set; }
		public DbSet<AppHistory> AppHistorys { get; set; }
		public DbSet<AppConfigType> AppConfigTypes { get; set; }

        public DbSet<AppConfig> AppConfigs { get; set; }
		public DbSet<AppAction> AppActions { get; set; }
		public DbSet<AppFlow> AppFlows { get; set; }
		public DbSet<AppApi> AppApis { get; set; }
		public DbSet<AppAttachment> AppAttachments { get; set; }
		//##ModelDbSet##
 
        protected override void OnModelCreating(ModelBuilder builder)
        {            
              base.OnModelCreating(builder); 

            //   builder.Entity<AppData>()
            //     .HasMany(u => u.Attachment1)
            //     .WithMany(t => t.)
            //     .Map(x =>
            //     {
            //         x.MapLeftKey("UserId");
            //         x.MapRightKey("TownId");
            //         x.ToTable("TownResidents");
            //     });


            //   builder.Entity<AppAction>()
            //     .HasOne(p => p.FromStatusList)
            //     .WithMany( b => b.)
            //     .HasForeignKey( p => p.FromStatusListFKey);

            //   builder
            //     .Entity<PageTagSitePage>()
            //         .HasKey( sp => new {  sp.PageTagId, sp.SitePageId } );

            //     builder.Entity<PageTagSitePage>()
            //         .HasOne( tg => tg.PageTag)
            //         .WithMany( tg => tg.SitePages)
            //         .HasForeignKey(tg => tg.PageTagId);

            //     builder.Entity<PageTagSitePage>()
            //         .HasOne( sp => sp.SitePage)
            //         .WithMany( sp => sp.PageTag)
            //         .HasForeignKey(sp => sp.SitePageId);     
            
                                             
        }
    }
}


















