# GrantStream

GrantStream is a lightweight toolkit for managing grant funder research. It
stores profiles in a local SQLite database, provides a command-line interface
for quick updates, and includes a Rich-powered terminal dashboard to explore
the data.

## Getting started

1. Create a virtual environment and install the Python dependencies:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. Configure the database path if desired. The default is `grantstream.db` in
   the project directory. To override it, edit the `.env` file or set the
   `DATABASE_PATH` environment variable.

3. Initialise the database and import the sample funder data:

   ```bash
   python main.py init
   python main.py import funders.csv
   ```

4. Explore the data:

   ```bash
   python main.py list
   python main.py list --search "environment"
   python main.py summary
   python dashboard.py
   ```

## Data format

The CSV importer expects the following columns:

| Column            | Required | Description                                     |
| ----------------- | -------- | ----------------------------------------------- |
| `name`            | ✅       | Funder name                                      |
| `focus_area`      | ✅       | Primary funding focus                            |
| `region`          | ✅       | Geographic area served                           |
| `last_grant_year` | ❌       | Most recent known grant year                     |
| `average_grant`   | ❌       | Typical grant amount (numeric, no currency sign) |
| `website`         | ❌       | Website URL                                      |
| `notes`           | ❌       | Additional context                               |

Extra columns are ignored. Records missing required fields are skipped.

## Automation

The repository includes a scheduled GitHub Actions workflow in
`.github/workflows/grantstream-cron.yml`. It validates the CSV importer weekly
using the built-in dry-run mode so that format regressions are caught early.

