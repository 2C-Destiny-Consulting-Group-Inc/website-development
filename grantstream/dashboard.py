"""Terminal dashboard for exploring GrantStream data."""
from __future__ import annotations

from collections import Counter
from pathlib import Path
from typing import Iterable

from rich.console import Console
from rich.table import Table

from db import Funder, fetch_funders, summarise_by_focus_area

console = Console()


def _funders_table(funders: Iterable[Funder]) -> Table:
    table = Table(title="GrantStream Funders", show_lines=True)
    table.add_column("Name", style="bold")
    table.add_column("Region")
    table.add_column("Focus Area")
    table.add_column("Last Grant")
    table.add_column("Average Grant")
    table.add_column("Website")

    for funder in funders:
        last_grant = str(funder.last_grant_year or "–")
        average = f"${funder.average_grant:,.0f}" if funder.average_grant else "–"
        table.add_row(
            funder.name,
            funder.region,
            funder.focus_area,
            last_grant,
            average,
            funder.website or "–",
        )
    return table


def show_dashboard(db_path: Path | None = None) -> None:
    funders = fetch_funders(db_path)
    if not funders:
        console.print("[yellow]No data available. Import funders first using main.py.[/]")
        return

    console.print(_funders_table(funders))

    focus_areas = summarise_by_focus_area(db_path)
    if focus_areas:
        console.print("\n[bold]Funders by focus area[/bold]")
        for focus_area, total in focus_areas:
            console.print(f"- {focus_area}: {total}")

    regions = Counter(funder.region for funder in funders)
    console.print("\n[bold]Regions represented[/bold]")
    for region, total in regions.most_common():
        console.print(f"- {region}: {total}")


if __name__ == "__main__":
    show_dashboard()
