using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs");

            migrationBuilder.CreateIndex(
                name: "IX_AppStatusLists_Title_TableId",
                table: "AppStatusLists",
                columns: new[] { "Title", "TableId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs",
                columns: new[] { "Title", "ConfigTypeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppColumnMasters_Title",
                table: "AppColumnMasters",
                column: "Title",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppStatusLists_Title_TableId",
                table: "AppStatusLists");

            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.DropIndex(
                name: "IX_AppColumnMasters_Title",
                table: "AppColumnMasters");

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs",
                columns: new[] { "Title", "Order" },
                unique: true);
        }
    }
}
