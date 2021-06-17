using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c73 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppActionAppStatusList",
                columns: table => new
                {
                    ActionListId = table.Column<int>(type: "INTEGER", nullable: false),
                    FromStatusListId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppActionAppStatusList", x => new { x.ActionListId, x.FromStatusListId });
                    table.ForeignKey(
                        name: "FK_AppActionAppStatusList_AppActions_ActionListId",
                        column: x => x.ActionListId,
                        principalTable: "AppActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppActionAppStatusList_AppStatusLists_FromStatusListId",
                        column: x => x.FromStatusListId,
                        principalTable: "AppStatusLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppActionAppStatusList_FromStatusListId",
                table: "AppActionAppStatusList",
                column: "FromStatusListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppActionAppStatusList");
        }
    }
}
