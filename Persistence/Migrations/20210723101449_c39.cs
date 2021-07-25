using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c39 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppDatas_TableId_TableItemId",
                table: "AppDatas",
                columns: new[] { "TableId", "TableItemId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppDatas_TableId_TableItemId",
                table: "AppDatas");
        }
    }
}
