using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppFlows_TableId",
                table: "AppFlows",
                column: "TableId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppFlows_AppTableMasters_TableId",
                table: "AppFlows",
                column: "TableId",
                principalTable: "AppTableMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppFlows_AppTableMasters_TableId",
                table: "AppFlows");

            migrationBuilder.DropIndex(
                name: "IX_AppFlows_TableId",
                table: "AppFlows");
        }
    }
}
