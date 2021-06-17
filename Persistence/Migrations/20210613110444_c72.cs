using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c72 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppStatusLists_AppActions_AppActionId",
                table: "AppStatusLists");

            migrationBuilder.DropIndex(
                name: "IX_AppStatusLists_AppActionId",
                table: "AppStatusLists");

            migrationBuilder.DropColumn(
                name: "AppActionId",
                table: "AppStatusLists");

            migrationBuilder.DropColumn(
                name: "FromStatusListFKey",
                table: "AppActions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppActionId",
                table: "AppStatusLists",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FromStatusListFKey",
                table: "AppActions",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AppStatusLists_AppActionId",
                table: "AppStatusLists",
                column: "AppActionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppStatusLists_AppActions_AppActionId",
                table: "AppStatusLists",
                column: "AppActionId",
                principalTable: "AppActions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
