using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c25 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppNavigations_AspNetRoles_RoleId1",
                table: "AppNavigations");

            migrationBuilder.DropIndex(
                name: "IX_AppNavigations_RoleId1",
                table: "AppNavigations");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId1",
                table: "AppNavigations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

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

            migrationBuilder.AlterColumn<string>(
                name: "RoleId1",
                table: "AppNavigations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

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
                name: "IX_AppNavigations_RoleId1",
                table: "AppNavigations",
                column: "RoleId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AppNavigations_AspNetRoles_RoleId1",
                table: "AppNavigations",
                column: "RoleId1",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
