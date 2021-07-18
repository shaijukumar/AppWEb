using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c23 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "AppNavigations",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppNavigations_RoleId",
                table: "AppNavigations",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppNavigations_AspNetRoles_RoleId",
                table: "AppNavigations",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppNavigations_AspNetRoles_RoleId",
                table: "AppNavigations");

            migrationBuilder.DropIndex(
                name: "IX_AppNavigations_RoleId",
                table: "AppNavigations");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "AppNavigations");
        }
    }
}
