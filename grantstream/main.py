"""Command-line utilities for working with GrantStream data."""
from __future__ import annotations

from pathlib import Path
from typing import Optional

import typer

from db import (
    DEFAULT_DB_PATH,
    Funder,
    fetch_funders,
    initialise_db,
    search_funders,
    summarise_by_focus_area,
    upsert_funders,
)
from import_csv import import_csv

app = typer.Typer(help=__doc__)


@app.command()
def init(db_path: Path = typer.Option(None, help="Custom database file to create.")) -> None:
    """Initialise the SQLite database."""

    path = db_path or DEFAULT_DB_PATH
    initialise_db(path)
    typer.echo(f"Initialised GrantStream database at {path}.")


@app.command()
def add(
    name: str = typer.Argument(..., help="Name of the funder."),
    focus_area: str = typer.Argument(..., help="Primary funding focus area."),
    region: str = typer.Argument(..., help="Geographic region covered."),
    last_grant_year: Optional[int] = typer.Option(None, help="Most recent grant year."),
    average_grant: Optional[float] = typer.Option(None, help="Typical grant amount."),
    website: Optional[str] = typer.Option(None, help="Website URL."),
    notes: Optional[str] = typer.Option(None, help="Supplementary notes."),
    db_path: Path = typer.Option(None, help="Custom database file."),
) -> None:
    """Insert a new funder into the database."""

    initialise_db(db_path)
    funder = Funder(name, focus_area, region, last_grant_year, average_grant, website, notes)
    upsert_funders([funder], db_path)
    typer.echo(f"Stored funder record for {name}.")


@app.command("import")
def import_data(
    csv_path: Path = typer.Argument(..., help="CSV file containing funder information."),
    db_path: Path = typer.Option(None, help="Custom database file."),
    dry_run: bool = typer.Option(False, "--dry-run", help="Validate the CSV without writing."),
) -> None:
    """Import a CSV file into the database."""

    count = import_csv(csv_path, db_path=db_path, dry_run=dry_run)
    action = "validated" if dry_run else "imported"
    typer.echo(f"Successfully {action} {count} funder{'s' if count != 1 else ''}.")


@app.command()
def list(
    db_path: Path = typer.Option(None, help="Custom database file."),
    search: Optional[str] = typer.Option(None, "--search", help="Filter by keyword."),
) -> None:
    """List funders in the database."""

    if search:
        funders = search_funders(search, db_path)
    else:
        funders = fetch_funders(db_path)

    if not funders:
        typer.echo("No funders stored yet. Use the import or add commands first.")
        raise typer.Exit(code=0)

    for funder in funders:
        _print_funder(funder)


@app.command()
def summary(db_path: Path = typer.Option(None, help="Custom database file.")) -> None:
    """Show a breakdown of funders by focus area."""

    counts = summarise_by_focus_area(db_path)
    if not counts:
        typer.echo("No data available. Import funders first.")
        raise typer.Exit(code=0)

    typer.echo("Funders by focus area:")
    for focus_area, total in counts:
        typer.echo(f"- {focus_area}: {total}")


def _print_funder(funder: Funder) -> None:
    typer.echo(f"{funder.name} ({funder.region}) - {funder.focus_area}")
    if funder.last_grant_year:
        typer.echo(f"  Last grant year: {funder.last_grant_year}")
    if funder.average_grant:
        typer.echo(f"  Average grant: ${funder.average_grant:,.0f}")
    if funder.website:
        typer.echo(f"  Website: {funder.website}")
    if funder.notes:
        typer.echo(f"  Notes: {funder.notes}")


if __name__ == "__main__":
    app()
