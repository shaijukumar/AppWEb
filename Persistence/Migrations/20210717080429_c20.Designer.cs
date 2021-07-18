﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210717080429_c20")]
    partial class c20
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.6");

            modelBuilder.Entity("AppActionAppStatusList", b =>
                {
                    b.Property<int>("ActionListId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FromStatusListId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ActionListId", "FromStatusListId");

                    b.HasIndex("FromStatusListId");

                    b.ToTable("AppActionAppStatusList");
                });

            modelBuilder.Entity("Domain.AppAction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Action")
                        .HasColumnType("TEXT");

                    b.Property<string>("ActionType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ActionXml")
                        .HasColumnType("TEXT");

                    b.Property<int>("FlowId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("InitStatus")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TableId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ToStatusId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("WhenXml")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppActions");
                });

            modelBuilder.Entity("Domain.AppApi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppApis");
                });

            modelBuilder.Entity("Domain.AppAttachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppDataColumn")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppDataId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("FileName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Path")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prop1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prop2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prop3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prop4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prop5")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppAttachments");
                });

            modelBuilder.Entity("Domain.AppColumnMaster", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AppDataFiled")
                        .HasColumnType("TEXT");

                    b.Property<int>("AttachmentConfig")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ConfigId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TableID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserAccess")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Title")
                        .IsUnique();

                    b.ToTable("AppColumnMasters");
                });

            modelBuilder.Entity("Domain.AppConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ConfigTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Det1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Det2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Det3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Det4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Det5")
                        .HasColumnType("TEXT");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ConfigTypeId");

                    b.HasIndex("Title", "ConfigTypeId")
                        .IsUnique();

                    b.ToTable("AppConfigs");
                });

            modelBuilder.Entity("Domain.AppConfigType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppConfigTypes");
                });

            modelBuilder.Entity("Domain.AppData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attachment1")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attachment2")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attachment3")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attachment4")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Attachment5")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool1")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool10")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool2")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool3")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool4")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool5")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool6")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool7")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool8")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Bool9")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config1")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config10")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config2")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config3")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config4")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config5")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config6")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config7")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config8")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Config9")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime1")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime10")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime11")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime12")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime13")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime14")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime15")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime2")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime3")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime4")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime5")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime6")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime7")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime8")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime9")
                        .HasColumnType("TEXT");

                    b.Property<float>("Float1")
                        .HasColumnType("REAL");

                    b.Property<float>("Float2")
                        .HasColumnType("REAL");

                    b.Property<float>("Float3")
                        .HasColumnType("REAL");

                    b.Property<float>("Float4")
                        .HasColumnType("REAL");

                    b.Property<float>("Float5")
                        .HasColumnType("REAL");

                    b.Property<long>("Long1")
                        .HasColumnType("INTEGER");

                    b.Property<long>("Long2")
                        .HasColumnType("INTEGER");

                    b.Property<long>("Long3")
                        .HasColumnType("INTEGER");

                    b.Property<long>("Long4")
                        .HasColumnType("INTEGER");

                    b.Property<long>("Long5")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("TEXT");

                    b.Property<int>("Num1")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num10")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num2")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num3")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num4")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num5")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num6")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num7")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num8")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Num9")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StatusId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TableId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Txt1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt10")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt11")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt12")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt13")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt14")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt15")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt16")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt17")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt18")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt19")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt20")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt21")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt22")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt23")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt24")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt25")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt5")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt6")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt7")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt8")
                        .HasColumnType("TEXT");

                    b.Property<string>("Txt9")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppDatas");
                });

            modelBuilder.Entity("Domain.AppFlow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("TableId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("TableId");

                    b.ToTable("AppFlows");
                });

            modelBuilder.Entity("Domain.AppHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Action")
                        .HasColumnType("TEXT");

                    b.Property<string>("ActionBy")
                        .HasColumnType("TEXT");

                    b.Property<int>("AppDataId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Comment")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Details1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Details2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Details3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Details4")
                        .HasColumnType("TEXT");

                    b.Property<string>("Details5")
                        .HasColumnType("TEXT");

                    b.Property<int>("FromStage")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ToStage")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("AppHistorys");
                });

            modelBuilder.Entity("Domain.AppNavigation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Access")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Icon")
                        .HasColumnType("TEXT");

                    b.Property<string>("Path")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppNavigations");
                });

            modelBuilder.Entity("Domain.AppNitificationTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Template")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppNitificationTemplates");
                });

            modelBuilder.Entity("Domain.AppNotifications", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("NotificationsMasterId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ReadStatus")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NotificationsMasterId");

                    b.ToTable("AppNotificationss");
                });

            modelBuilder.Entity("Domain.AppNotificationsMaster", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AppPath")
                        .HasColumnType("TEXT");

                    b.Property<string>("Body")
                        .HasColumnType("TEXT");

                    b.Property<string>("CCGroups")
                        .HasColumnType("TEXT");

                    b.Property<string>("CCUsers")
                        .HasColumnType("TEXT");

                    b.Property<int>("DataId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Frequency")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("NextReminderTime")
                        .HasColumnType("TEXT");

                    b.Property<int>("NoOfReminders")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Subject")
                        .HasColumnType("TEXT");

                    b.Property<string>("ToGroups")
                        .HasColumnType("TEXT");

                    b.Property<string>("ToUsers")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppNotificationsMasters");
                });

            modelBuilder.Entity("Domain.AppStatusList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TableId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Title", "TableId")
                        .IsUnique();

                    b.ToTable("AppStatusLists");
                });

            modelBuilder.Entity("Domain.AppTableMaster", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserAccess")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Title")
                        .IsUnique();

                    b.ToTable("AppTableMasters");
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Domain.AppUserAccess", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ActionScript")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppUserAccesss");
                });

            modelBuilder.Entity("Domain.AppUserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserRoleMasterId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppUserRoles");
                });

            modelBuilder.Entity("Domain.AppUserRoleMaster", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("AppUserRoleMasters");
                });

            modelBuilder.Entity("Domain.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("AppActionAppStatusList", b =>
                {
                    b.HasOne("Domain.AppAction", null)
                        .WithMany()
                        .HasForeignKey("ActionListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppStatusList", null)
                        .WithMany()
                        .HasForeignKey("FromStatusListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.AppConfig", b =>
                {
                    b.HasOne("Domain.AppConfigType", "ConfigType")
                        .WithMany()
                        .HasForeignKey("ConfigTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ConfigType");
                });

            modelBuilder.Entity("Domain.AppFlow", b =>
                {
                    b.HasOne("Domain.AppTableMaster", "Table")
                        .WithMany()
                        .HasForeignKey("TableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Table");
                });

            modelBuilder.Entity("Domain.AppNotifications", b =>
                {
                    b.HasOne("Domain.AppNotificationsMaster", "NotificationsMaster")
                        .WithMany()
                        .HasForeignKey("NotificationsMasterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("NotificationsMaster");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
