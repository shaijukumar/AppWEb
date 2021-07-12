using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c926 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.AlterColumn<int>(
                name: "ConfigTypeId",
                table: "AppConfigs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs",
                columns: new[] { "Title", "ConfigTypeId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs",
                column: "ConfigTypeId",
                principalTable: "AppConfigTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.DropIndex(
                name: "IX_AppConfigs_Title_ConfigTypeId",
                table: "AppConfigs");

            migrationBuilder.AlterColumn<int>(
                name: "ConfigTypeId",
                table: "AppConfigs",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_AppConfigs_AppConfigTypes_ConfigTypeId",
                table: "AppConfigs",
                column: "ConfigTypeId",
                principalTable: "AppConfigTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
