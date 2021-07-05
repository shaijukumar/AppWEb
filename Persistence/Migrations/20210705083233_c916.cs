using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c916 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextReminderTime",
                table: "AppNotificationss");

            migrationBuilder.DropColumn(
                name: "NoOfReminders",
                table: "AppNotificationss");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NextReminderTime",
                table: "AppNotificationss",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "NoOfReminders",
                table: "AppNotificationss",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
