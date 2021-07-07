using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c917 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppNotificationss_NotificationsMasterId",
                table: "AppNotificationss",
                column: "NotificationsMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppNotificationss_AppNotificationsMasters_NotificationsMasterId",
                table: "AppNotificationss",
                column: "NotificationsMasterId",
                principalTable: "AppNotificationsMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppNotificationss_AppNotificationsMasters_NotificationsMasterId",
                table: "AppNotificationss");

            migrationBuilder.DropIndex(
                name: "IX_AppNotificationss_NotificationsMasterId",
                table: "AppNotificationss");
        }
    }
}
