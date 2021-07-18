using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c31 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppLeftNavigations_AspNetRoles_RoleId1",
                table: "AppLeftNavigations");

            migrationBuilder.DropIndex(
                name: "IX_AppLeftNavigations_RoleId1",
                table: "AppLeftNavigations");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId1",
                table: "AppLeftNavigations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "AppLeftNavigations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_AppLeftNavigations_RoleId",
                table: "AppLeftNavigations",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppLeftNavigations_AspNetRoles_RoleId",
                table: "AppLeftNavigations",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppLeftNavigations_AspNetRoles_RoleId",
                table: "AppLeftNavigations");

            migrationBuilder.DropIndex(
                name: "IX_AppLeftNavigations_RoleId",
                table: "AppLeftNavigations");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId1",
                table: "AppLeftNavigations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "AppLeftNavigations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppLeftNavigations_RoleId1",
                table: "AppLeftNavigations",
                column: "RoleId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AppLeftNavigations_AspNetRoles_RoleId1",
                table: "AppLeftNavigations",
                column: "RoleId1",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
