using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c36 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Group3",
                table: "AppDatas",
                newName: "Role3");

            migrationBuilder.RenameColumn(
                name: "Group2",
                table: "AppDatas",
                newName: "Role2");

            migrationBuilder.RenameColumn(
                name: "Group1",
                table: "AppDatas",
                newName: "Role1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role3",
                table: "AppDatas",
                newName: "Group3");

            migrationBuilder.RenameColumn(
                name: "Role2",
                table: "AppDatas",
                newName: "Group2");

            migrationBuilder.RenameColumn(
                name: "Role1",
                table: "AppDatas",
                newName: "Group1");
        }
    }
}
