using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c928 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppUserRoleMasters_Title",
                table: "AppUserRoleMasters");

            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppUserRoleMasters_Title",
                table: "AppUserRoleMasters",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_Order",
                table: "AppConfigs",
                columns: new[] { "Title", "Order" },
                unique: true);
        }
    }
}
