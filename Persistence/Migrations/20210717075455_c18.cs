using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c18 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoles_AppNavigations_AppNavigationId",
                table: "AspNetRoles");

            migrationBuilder.DropIndex(
                name: "IX_AspNetRoles_AppNavigationId",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "AppNavigationId",
                table: "AspNetRoles");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "AppNavigations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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

            migrationBuilder.AddColumn<int>(
                name: "AppNavigationId",
                table: "AspNetRoles",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "AppNavigations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoles_AppNavigationId",
                table: "AspNetRoles",
                column: "AppNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoles_AppNavigations_AppNavigationId",
                table: "AspNetRoles",
                column: "AppNavigationId",
                principalTable: "AppNavigations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
