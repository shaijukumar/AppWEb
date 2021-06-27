using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c93 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Float10",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Float6",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Float7",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Float8",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Float9",
                table: "AppDatas");

            migrationBuilder.AddColumn<long>(
                name: "Long1",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Long2",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Long3",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Long4",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "Long5",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Long1",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Long2",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Long3",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Long4",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Long5",
                table: "AppDatas");

            migrationBuilder.AddColumn<float>(
                name: "Float10",
                table: "AppDatas",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Float6",
                table: "AppDatas",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Float7",
                table: "AppDatas",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Float8",
                table: "AppDatas",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Float9",
                table: "AppDatas",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
