"""Utilities for managing the GrantStream SQLite database."""
from __future__ import annotations

from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Generator, Iterable, List, Optional
import os
import sqlite3

from dotenv import load_dotenv

load_dotenv()

DEFAULT_DB_PATH = Path(os.getenv("DATABASE_PATH", "grantstream.db")).expanduser()


@dataclass(slots=True)
class Funder:
    """Simple data structure representing a grant-making organisation."""

    name: str
    focus_area: str
    region: str
    last_grant_year: Optional[int]
    average_grant: Optional[float]
    website: Optional[str]
    notes: Optional[str]


@contextmanager
def get_connection(path: Optional[Path] = None) -> Generator[sqlite3.Connection, None, None]:
    """Yield a SQLite connection, committing/closing automatically."""

    db_path = path or DEFAULT_DB_PATH
    db_path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialise_db(path: Optional[Path] = None) -> None:
    """Create the ``funders`` table if it does not yet exist."""

    with get_connection(path) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS funders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                focus_area TEXT NOT NULL,
                region TEXT NOT NULL,
                last_grant_year INTEGER,
                average_grant REAL,
                website TEXT,
                notes TEXT,
                UNIQUE(name, region)
            )
            """
        )


def _normalise_optional(value: Optional[str]) -> Optional[str]:
    if value is None:
        return None
    value = value.strip()
    return value or None


def upsert_funders(funders: Iterable[Funder], path: Optional[Path] = None) -> int:
    """Insert or update a sequence of funders.

    Returns the number of processed rows. When a funder already exists (matched on
    ``name`` and ``region``) it will be updated with the new values.
    """

    with get_connection(path) as conn:
        cursor = conn.cursor()
        processed = 0
        for funder in funders:
            cursor.execute(
                """
                INSERT INTO funders (name, focus_area, region, last_grant_year, average_grant, website, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(name, region) DO UPDATE SET
                    focus_area=excluded.focus_area,
                    last_grant_year=excluded.last_grant_year,
                    average_grant=excluded.average_grant,
                    website=excluded.website,
                    notes=excluded.notes
                """,
                (
                    funder.name.strip(),
                    funder.focus_area.strip(),
                    funder.region.strip(),
                    funder.last_grant_year,
                    funder.average_grant,
                    _normalise_optional(funder.website),
                    _normalise_optional(funder.notes),
                ),
            )
            processed += 1
    return processed


def fetch_funders(path: Optional[Path] = None) -> List[Funder]:
    """Return all funders sorted by name."""

    with get_connection(path) as conn:
        cursor = conn.execute(
            """
            SELECT name, focus_area, region, last_grant_year, average_grant, website, notes
            FROM funders
            ORDER BY name COLLATE NOCASE
            """
        )
        return [
            Funder(
                row["name"],
                row["focus_area"],
                row["region"],
                row["last_grant_year"],
                row["average_grant"],
                row["website"],
                row["notes"],
            )
            for row in cursor.fetchall()
        ]


def search_funders(term: str, path: Optional[Path] = None) -> List[Funder]:
    """Return funders with names or focus areas matching ``term``."""

    wildcard = f"%{term.lower()}%"
    with get_connection(path) as conn:
        cursor = conn.execute(
            """
            SELECT name, focus_area, region, last_grant_year, average_grant, website, notes
            FROM funders
            WHERE lower(name) LIKE ? OR lower(focus_area) LIKE ? OR lower(region) LIKE ?
            ORDER BY name COLLATE NOCASE
            """,
            (wildcard, wildcard, wildcard),
        )
        return [
            Funder(
                row["name"],
                row["focus_area"],
                row["region"],
                row["last_grant_year"],
                row["average_grant"],
                row["website"],
                row["notes"],
            )
            for row in cursor.fetchall()
        ]


def summarise_by_focus_area(path: Optional[Path] = None) -> List[tuple[str, int]]:
    """Return counts grouped by focus area."""

    with get_connection(path) as conn:
        cursor = conn.execute(
            """
            SELECT focus_area, COUNT(*) AS total
            FROM funders
            GROUP BY focus_area
            ORDER BY total DESC, focus_area ASC
            """
        )
        return [(row["focus_area"], row["total"]) for row in cursor.fetchall()]


__all__ = [
    "Funder",
    "DEFAULT_DB_PATH",
    "initialise_db",
    "upsert_funders",
    "fetch_funders",
    "search_funders",
    "summarise_by_focus_area",
]
