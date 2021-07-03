using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c99 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppNotificationsMasters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Subject = table.Column<string>(type: "TEXT", nullable: true),
                    Body = table.Column<string>(type: "TEXT", nullable: true),
                    NextReminderTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    NoOfReminders = table.Column<int>(type: "INTEGER", nullable: false),
                    Frequency = table.Column<int>(type: "INTEGER", nullable: false),
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
                name: "AppNotificationss",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NotificationsMasterId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: true),
                    NextReminderTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    NoOfReminders = table.Column<int>(type: "INTEGER", nullable: false),
                    ReadStatus = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppNotificationss", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppNotificationsMasters");

            migrationBuilder.DropTable(
                name: "AppNotificationss");
        }
    }
}
