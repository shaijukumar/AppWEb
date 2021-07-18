using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
       // public DbSet<IdentityUserRole> test { get; set; }	

        public DbSet<Value> Values { get; set; }	
        public DbSet<IdentityRole> AspNetRoles { get; set; }		
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
        public DbSet<AppNavigation> AppNavigations { get; set; }			
		public DbSet<AppNotificationsMaster> AppNotificationsMasters { get; set; }
        public DbSet<AppNotifications> AppNotificationss { get; set; }
		public DbSet<AppNitificationTemplate> AppNitificationTemplates { get; set; }
		//##ModelDbSet##
 
        protected override void OnModelCreating(ModelBuilder builder)
        {            
              base.OnModelCreating(builder); 

            //   builder.Entity<AppUserRoleMaster>(entity => {
            //         entity.HasIndex(e => e.Title).IsUnique();
            //     });

            builder.Entity<AppTableMaster>(entity => {
                 entity.HasIndex(e => e.Title).IsUnique();
            });

            builder.Entity<AppColumnMaster>(entity => {
                 entity.HasIndex(e => e.Title).IsUnique();
            });

            builder.Entity<AppStatusList>(entity => {
                entity.HasIndex(e => new  {e.Title, e.TableId} ).IsUnique();
            });

            builder.Entity<AppConfig>(entity => {
                entity.HasIndex(e => new  {e.Title, e.ConfigTypeId} ).IsUnique();
            });
                

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






















