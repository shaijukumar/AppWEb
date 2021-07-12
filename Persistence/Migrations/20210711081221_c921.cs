using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class c921 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppUserAppUserRoleMaster",
                columns: table => new
                {
                    rolesId = table.Column<int>(type: "INTEGER", nullable: false),
                    usersId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserAppUserRoleMaster", x => new { x.rolesId, x.usersId });
                    table.ForeignKey(
                        name: "FK_AppUserAppUserRoleMaster_AppUserRoleMasters_rolesId",
                        column: x => x.rolesId,
                        principalTable: "AppUserRoleMasters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppUserAppUserRoleMaster_AspNetUsers_usersId",
                        column: x => x.usersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserAppUserRoleMaster_usersId",
                table: "AppUserAppUserRoleMaster",
                column: "usersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserAppUserRoleMaster");
        }
    }
}
