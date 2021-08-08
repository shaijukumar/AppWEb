using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    ToStatusId = table.Column<int>(type: "INTEGER", nullable: false),
                    Action = table.Column<string>(type: "TEXT", nullable: true),
                    ActionType = table.Column<string>(type: "TEXT", nullable: true),
                    WhenXml = table.Column<string>(type: "TEXT", nullable: true),
                    FlowId = table.Column<int>(type: "INTEGER", nullable: false),
                    InitStatus = table.Column<bool>(type: "INTEGER", nullable: false),
                    TableId = table.Column<int>(type: "INTEGER", nullable: false),
                    ActionXml = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppActions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppApis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppApis", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppAttachments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppDataId = table.Column<int>(type: "INTEGER", nullable: false),
                    AppDataColumn = table.Column<int>(type: "INTEGER", nullable: false),
                    FileName = table.Column<string>(type: "TEXT", nullable: true),
                    Path = table.Column<string>(type: "TEXT", nullable: true),
                    Prop1 = table.Column<string>(type: "TEXT", nullable: true),
                    Prop2 = table.Column<string>(type: "TEXT", nullable: true),
                    Prop3 = table.Column<string>(type: "TEXT", nullable: true),
                    Prop4 = table.Column<string>(type: "TEXT", nullable: true),
                    Prop5 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAttachments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppColumnMasters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    TableID = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    AppDataFiled = table.Column<string>(type: "TEXT", nullable: true),
                    UserAccess = table.Column<string>(type: "TEXT", nullable: true),
                    ConfigId = table.Column<int>(type: "INTEGER", nullable: false),
                    AttachmentConfig = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppColumnMasters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppConfigTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppConfigTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppDatas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TableId = table.Column<int>(type: "INTEGER", nullable: false),
                    TableItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    StatusId = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedBy = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedBy = table.Column<string>(type: "TEXT", nullable: true),
                    ModifiedOn = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Txt1 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt2 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt3 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt4 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt5 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt6 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt7 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt8 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt9 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt10 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt11 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt12 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt13 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt14 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt15 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt16 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt17 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt18 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt19 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt20 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt21 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt22 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt23 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt24 = table.Column<string>(type: "TEXT", nullable: true),
                    Txt25 = table.Column<string>(type: "TEXT", nullable: true),
                    Num1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num5 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num6 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num7 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num8 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num9 = table.Column<int>(type: "INTEGER", nullable: false),
                    Num10 = table.Column<int>(type: "INTEGER", nullable: false),
                    Float1 = table.Column<float>(type: "REAL", nullable: false),
                    Float2 = table.Column<float>(type: "REAL", nullable: false),
                    Float3 = table.Column<float>(type: "REAL", nullable: false),
                    Float4 = table.Column<float>(type: "REAL", nullable: false),
                    Float5 = table.Column<float>(type: "REAL", nullable: false),
                    Long1 = table.Column<long>(type: "INTEGER", nullable: false),
                    Long2 = table.Column<long>(type: "INTEGER", nullable: false),
                    Long3 = table.Column<long>(type: "INTEGER", nullable: false),
                    Long4 = table.Column<long>(type: "INTEGER", nullable: false),
                    Long5 = table.Column<long>(type: "INTEGER", nullable: false),
                    Bool1 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool2 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool3 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool4 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool5 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool6 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool7 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool8 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool9 = table.Column<bool>(type: "INTEGER", nullable: false),
                    Bool10 = table.Column<bool>(type: "INTEGER", nullable: false),
                    DateTime1 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime2 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime3 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime4 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime5 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime6 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime7 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime8 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime9 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime10 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime11 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime12 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime13 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime14 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateTime15 = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Config1 = table.Column<string>(type: "TEXT", nullable: true),
                    Config2 = table.Column<string>(type: "TEXT", nullable: true),
                    Config3 = table.Column<string>(type: "TEXT", nullable: true),
                    Config4 = table.Column<string>(type: "TEXT", nullable: true),
                    Config5 = table.Column<string>(type: "TEXT", nullable: true),
                    Config6 = table.Column<string>(type: "TEXT", nullable: true),
                    Config7 = table.Column<string>(type: "TEXT", nullable: true),
                    Config8 = table.Column<string>(type: "TEXT", nullable: true),
                    Config9 = table.Column<string>(type: "TEXT", nullable: true),
                    Config10 = table.Column<string>(type: "TEXT", nullable: true),
                    Attachment1 = table.Column<int>(type: "INTEGER", nullable: false),
                    Attachment2 = table.Column<int>(type: "INTEGER", nullable: false),
                    Attachment3 = table.Column<int>(type: "INTEGER", nullable: false),
                    Attachment4 = table.Column<int>(type: "INTEGER", nullable: false),
                    Attachment5 = table.Column<int>(type: "INTEGER", nullable: false),
                    User1 = table.Column<string>(type: "TEXT", nullable: true),
                    User2 = table.Column<string>(type: "TEXT", nullable: true),
                    User3 = table.Column<string>(type: "TEXT", nullable: true),
                    Role1 = table.Column<string>(type: "TEXT", nullable: true),
                    Role2 = table.Column<string>(type: "TEXT", nullable: true),
                    Role3 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDatas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppHistorys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppDataId = table.Column<int>(type: "INTEGER", nullable: false),
                    Action = table.Column<string>(type: "TEXT", nullable: true),
                    FromStage = table.Column<int>(type: "INTEGER", nullable: false),
                    ToStage = table.Column<int>(type: "INTEGER", nullable: false),
                    ActionBy = table.Column<string>(type: "TEXT", nullable: true),
                    DateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    Details1 = table.Column<string>(type: "TEXT", nullable: true),
                    Details2 = table.Column<string>(type: "TEXT", nullable: true),
                    Details3 = table.Column<string>(type: "TEXT", nullable: true),
                    Details4 = table.Column<string>(type: "TEXT", nullable: true),
                    Details5 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppHistorys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppNitificationTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Template = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNitificationTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppNotificationsMasters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Subject = table.Column<string>(type: "TEXT", nullable: true),
                    Body = table.Column<string>(type: "TEXT", nullable: true),
                    AppPath = table.Column<string>(type: "TEXT", nullable: true),
                    NextReminderTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    NoOfReminders = table.Column<int>(type: "INTEGER", nullable: false),
                    Frequency = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    DataId = table.Column<int>(type: "INTEGER", nullable: false),
                    ToUsers = table.Column<string>(type: "TEXT", nullable: true),
                    CCUsers = table.Column<string>(type: "TEXT", nullable: true),
                    ToGroups = table.Column<string>(type: "TEXT", nullable: true),
                    CCGroups = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNotificationsMasters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppStatusLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    TableId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppStatusLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppTableCouters",
                columns: table => new
                {
                    TableId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    counter = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTableCouters", x => x.TableId);
                });

            migrationBuilder.CreateTable(
                name: "AppTableMasters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    UserAccess = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppTableMasters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserAccesss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    ActionScript = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserAccesss", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserRoleMasters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserRoleMasters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserRoleMasterId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    ConfigTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Det1 = table.Column<string>(type: "TEXT", nullable: true),
                    Det2 = table.Column<string>(type: "TEXT", nullable: true),
                    Det3 = table.Column<string>(type: "TEXT", nullable: true),
                    Det4 = table.Column<string>(type: "TEXT", nullable: true),
                    Det5 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppConfigs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                        column: x => x.ConfigTypeId,
                        principalTable: "AppConfigTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppNotificationss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NotificationsMasterId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    ReadStatus = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNotificationss", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppNotificationss_AppNotificationsMasters_NotificationsMasterId",
                        column: x => x.NotificationsMasterId,
                        principalTable: "AppNotificationsMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppActionAppStatusList",
                columns: table => new
                {
                    ActionListId = table.Column<int>(type: "INTEGER", nullable: false),
                    FromStatusListId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppActionAppStatusList", x => new { x.ActionListId, x.FromStatusListId });
                    table.ForeignKey(
                        name: "FK_AppActionAppStatusList_AppActions_ActionListId",
                        column: x => x.ActionListId,
                        principalTable: "AppActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppActionAppStatusList_AppStatusLists_FromStatusListId",
                        column: x => x.FromStatusListId,
                        principalTable: "AppStatusLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppFlows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    TableId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppFlows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppFlows_AppTableMasters_TableId",
                        column: x => x.TableId,
                        principalTable: "AppTableMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppNavigations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Path = table.Column<string>(type: "TEXT", nullable: true),
                    Icon = table.Column<string>(type: "TEXT", nullable: true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNavigations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppNavigations_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppActionAppStatusList_FromStatusListId",
                table: "AppActionAppStatusList",
                column: "FromStatusListId");

            migrationBuilder.CreateIndex(
                name: "IX_AppColumnMasters_Title_TableID",
                table: "AppColumnMasters",
                columns: new[] { "Title", "TableID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_ConfigTypeId",
                table: "AppConfigs",
                column: "ConfigTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs",
                columns: new[] { "Title", "ConfigTypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppDatas_TableId_TableItemId",
                table: "AppDatas",
                columns: new[] { "TableId", "TableItemId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppFlows_TableId",
                table: "AppFlows",
                column: "TableId");

            migrationBuilder.CreateIndex(
                name: "IX_AppNavigations_RoleId",
                table: "AppNavigations",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AppNotificationss_NotificationsMasterId",
                table: "AppNotificationss",
                column: "NotificationsMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppStatusLists_Title_TableId",
                table: "AppStatusLists",
                columns: new[] { "Title", "TableId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppTableMasters_Title",
                table: "AppTableMasters",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppActionAppStatusList");

            migrationBuilder.DropTable(
                name: "AppApis");

            migrationBuilder.DropTable(
                name: "AppAttachments");

            migrationBuilder.DropTable(
                name: "AppColumnMasters");

            migrationBuilder.DropTable(
                name: "AppConfigs");

            migrationBuilder.DropTable(
                name: "AppDatas");

            migrationBuilder.DropTable(
                name: "AppFlows");

            migrationBuilder.DropTable(
                name: "AppHistorys");

            migrationBuilder.DropTable(
                name: "AppNavigations");

            migrationBuilder.DropTable(
                name: "AppNitificationTemplates");

            migrationBuilder.DropTable(
                name: "AppNotificationss");

            migrationBuilder.DropTable(
                name: "AppTableCouters");

            migrationBuilder.DropTable(
                name: "AppUserAccesss");

            migrationBuilder.DropTable(
                name: "AppUserRoleMasters");

            migrationBuilder.DropTable(
                name: "AppUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Values");

            migrationBuilder.DropTable(
                name: "AppActions");

            migrationBuilder.DropTable(
                name: "AppStatusLists");

            migrationBuilder.DropTable(
                name: "AppConfigTypes");

            migrationBuilder.DropTable(
                name: "AppTableMasters");

            migrationBuilder.DropTable(
                name: "AppNotificationsMasters");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
