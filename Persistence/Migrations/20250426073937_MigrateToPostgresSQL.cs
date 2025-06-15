using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MigrateToPostgresSQL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // … other column‐type changes …

            // 1) Drop the old integer column (data lost)
            migrationBuilder.DropColumn(
                name: "IsDesexed",
                table: "Pets");

            // 2) Recreate it as a boolean, with a default value (false)
            migrationBuilder.AddColumn<bool>(
                name: "IsDesexed",
                table: "Pets",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            // … any remaining alterations …
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // reverse: drop the boolean…
            migrationBuilder.DropColumn(
                name: "IsDesexed",
                table: "Pets");

            // …and recreate the old integer column so Down() matches Up()
            migrationBuilder.AddColumn<int>(
                name: "IsDesexed",
                table: "Pets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            // … other Down() steps …
        }
    }
}
