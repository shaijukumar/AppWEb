using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c41 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppColumnMasters_Title",
                table: "AppColumnMasters");

            migrationBuilder.CreateIndex(
                name: "IX_AppColumnMasters_Title_TableID",
                table: "AppColumnMasters",
                columns: new[] { "Title", "TableID" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppColumnMasters_Title_TableID",
                table: "AppColumnMasters");

            migrationBuilder.CreateIndex(
                name: "IX_AppColumnMasters_Title",
                table: "AppColumnMasters",
                column: "Title",
                unique: true);
        }
    }
}
