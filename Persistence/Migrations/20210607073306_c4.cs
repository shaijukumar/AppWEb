using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MidifiedBy",
                table: "AppDatas");

            migrationBuilder.RenameColumn(
                name: "MidifiedOn",
                table: "AppDatas",
                newName: "ModifiedOn");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedBy",
                table: "AppDatas",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "AppDatas",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "AppDatas");

            migrationBuilder.RenameColumn(
                name: "ModifiedOn",
                table: "AppDatas",
                newName: "MidifiedOn");

            migrationBuilder.AlterColumn<int>(
                name: "CreatedBy",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MidifiedBy",
                table: "AppDatas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
