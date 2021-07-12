using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c927 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs",
                columns: new[] { "Title", "Order" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs");

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs",
                columns: new[] { "Title", "ConfigTypeId" },
                unique: true);
        }
    }
}
