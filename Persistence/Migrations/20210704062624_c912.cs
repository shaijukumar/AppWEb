using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c912 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "URL",
                table: "AppNitificationTemplates");

            migrationBuilder.AddColumn<int>(
                name: "ConfigTypeId",
                table: "AppConfigs",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_ConfigTypeId",
                table: "AppConfigs",
                column: "ConfigTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs",
                column: "ConfigTypeId",
                principalTable: "AppConfigTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.DropColumn(
                name: "ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.AddColumn<string>(
                name: "URL",
                table: "AppNitificationTemplates",
                type: "TEXT",
                nullable: true);
        }
    }
}
