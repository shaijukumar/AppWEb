using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c35 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Group1",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group2",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Group3",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "User1",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "User2",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "User3",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "AppColumnMasters",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group1",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Group2",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Group3",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "User1",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "User2",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "User3",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "AppColumnMasters");
        }
    }
}
