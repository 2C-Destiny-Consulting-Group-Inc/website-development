"""Load funder records from a CSV file into the GrantStream database."""
from __future__ import annotations

import csv
from pathlib import Path
from typing import Iterator

import typer

from db import Funder, initialise_db, upsert_funders


def _parse_optional_int(value: str) -> int | None:
    value = value.strip()
    if not value:
        return None
    return int(value)


def _parse_optional_float(value: str) -> float | None:
    value = value.strip()
    if not value:
        return None
    return float(value)


def load_funders_from_csv(csv_path: Path) -> Iterator[Funder]:
    with csv_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        required = {"name", "focus_area", "region"}
        missing = required - set(reader.fieldnames or [])
        if missing:
            raise typer.BadParameter(
                f"Missing required columns in {csv_path.name}: {', '.join(sorted(missing))}"
            )
        for index, row in enumerate(reader, start=2):
            name = row.get("name", "").strip()
            focus_area = row.get("focus_area", "").strip()
            region = row.get("region", "").strip()

            if not (name and focus_area and region):
                typer.echo(
                    f"[warning]Skipping row {index}: missing required field(s).",
                    err=True,
                )
                continue

            yield Funder(
                name=name,
                focus_area=focus_area,
                region=region,
                last_grant_year=_parse_optional_int(row.get("last_grant_year", "")),
                average_grant=_parse_optional_float(row.get("average_grant", "")),
                website=row.get("website", "").strip() or None,
                notes=row.get("notes", "").strip() or None,
            )


def import_csv(
    csv_path: Path,
    *,
    initialise: bool = True,
    dry_run: bool = False,
    db_path: Path | None = None,
) -> int:
    """Import a CSV file into the database and return the number of processed rows."""

    if initialise:
        initialise_db(db_path)

    funders = list(load_funders_from_csv(csv_path))

    if dry_run:
        return len(funders)

    return upsert_funders(funders, db_path)


app = typer.Typer(help=__doc__)


@app.command()
def load(
    csv_path: Path = typer.Argument(..., help="Path to a CSV file containing funders."),
    initialise_database: bool = typer.Option(
        True,
        "--init/--no-init",
        help="Initialise the database before importing.",
    ),
    dry_run: bool = typer.Option(
        False,
        "--dry-run",
        help="Parse the CSV but do not write to the database.",
    ),
    db_path: Path = typer.Option(
        None,
        "--database",
        help="Override the database path configured in the .env file.",
    ),
) -> None:
    count = import_csv(
        csv_path,
        initialise=initialise_database,
        dry_run=dry_run,
        db_path=db_path,
    )
    action = "validated" if dry_run else "imported"
    typer.echo(f"{action.title()} {count} funder{'s' if count != 1 else ''} from {csv_path}.")


if __name__ == "__main__":
    app()
