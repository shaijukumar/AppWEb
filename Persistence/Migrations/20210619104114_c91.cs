using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c91 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Attachment1",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Attachment2",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Attachment3",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Attachment4",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Attachment5",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config1",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config10",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config2",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config3",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config4",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config5",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config6",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config7",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config8",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Config9",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Attachment1",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Attachment2",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Attachment3",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Attachment4",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Attachment5",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config1",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config10",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config2",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config3",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config4",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config5",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config6",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config7",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config8",
                table: "AppDatas");

            migrationBuilder.DropColumn(
                name: "Config9",
                table: "AppDatas");
        }
    }
}
