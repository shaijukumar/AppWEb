using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppTableMasters_Title",
                table: "AppTableMasters",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs",
                columns: new[] { "Title", "Order" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppTableMasters_Title",
                table: "AppTableMasters");

            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs");
        }
    }
}
