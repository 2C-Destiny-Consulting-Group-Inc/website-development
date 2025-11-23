import requests
from datetime import datetime
from typing import List

from sqlmodel import Session, select

from main import Opportunity, calculate_priority, engine


# Keywords you care about. Tweak as you like.
KEYWORDS: List[str] = [
    "fatherhood",
    "family",
    "parenting",
    "youth",
    "resilience",
    "rural",
]

SEARCH_URL = "https://api.grants.gov/v1/api/search2"


def fetch_hits(keyword: str):
    """
    Call Grants.gov search2 API for a single keyword.
    Returns a list of 'oppHits'.
    """
    body = {
        "rows": 25,
        "keyword": keyword,
        "oppStatuses": "forecasted|posted",
        "eligibilities": "",
        "agencies": "",
        "aln": "",
        "fundingCategories": "",
        "fundingInstruments": "",
    }

    resp = requests.post(SEARCH_URL, json=body, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    hits = data.get("data", {}).get("oppHits", [])
    return hits


def import_hit(hit: dict, session: Session) -> None:
    """
    Convert a single Grants.gov hit into an Opportunity row.
    Skip if name+funder already exist.
    """
    title = (hit.get("title") or "").strip()
    agency_name = (hit.get("agencyName") or "").strip()
    opp_number = (hit.get("number") or "").strip()
    close_date_str = (hit.get("closeDate") or "").strip()
    opp_id = (hit.get("id") or "").strip()

    if not title:
        return

    # De-dup by name + funder
    existing = session.exec(
        select(Opportunity).where(
            Opportunity.name == title,
            Opportunity.funder == agency_name,
        )
    ).first()
    if existing:
        return

    # Deadline: MM/DD/YYYY -> date
    deadline = None
    if close_date_str:
        try:
            deadline = datetime.strptime(close_date_str, "%m/%d/%Y").date()
        except ValueError:
            deadline = None

    # Construct Grants.gov detail URL
    detail_url = ""
    if opp_id:
        detail_url = f"https://www.grants.gov/search-results-detail/oppId={opp_id}"

    # Very simple auto scoring; you refine later.
    title_lower = title.lower()
    if any(word in title_lower for word in ["father", "parent", "family"]):
        alignment_score = 5
    else:
        alignment_score = 3

    readiness_score = 2
    competitiveness_score = 3
    strategic_value_score = 3

    priority_score = calculate_priority(
        type(
            "Tmp",
            (),
            {
                "alignment_score": alignment_score,
                "readiness_score": readiness_score,
                "competitiveness_score": competitiveness_score,
                "strategic_value_score": strategic_value_score,
            },
        )()
    )

    now = datetime.utcnow()

    opp = Opportunity(
        name=title,
        funder=agency_name,
        category="federal",
        location="US",
        url=detail_url,
        min_amount=None,
        max_amount=None,
        deadline=deadline,
        match_required=None,
        eligibility_notes=(
            f"Imported from Grants.gov (opportunity number: {opp_number}). "
            f"Review the full NOFO for details and eligibility."
        ),
        status="idea",
        alignment_score=alignment_score,
        readiness_score=readiness_score,
        competitiveness_score=competitiveness_score,
        strategic_value_score=strategic_value_score,
        priority_score=priority_score,
        created_at=now,
        updated_at=now,
    )

    session.add(opp)


def run_import():
    print("=== 2C Destiny Funding Lab – Grants.gov import starting ===")

    with Session(engine) as session:
        existing_before = session.exec(select(Opportunity)).all()
        before_count = len(existing_before)
        print(f"Currently in Funding Lab: {before_count} opportunities")

        for kw in KEYWORDS:
            print(f"\nFetching keyword: {kw!r}")
            try:
                hits = fetch_hits(kw)
            except Exception as e:
                print(f"  Error fetching for {kw!r}: {e}")
                continue

            print(f"  Found {len(hits)} hits for {kw!r}")
            for hit in hits:
                import_hit(hit, session)

            session.commit()

        all_after = session.exec(select(Opportunity)).all()
        after_count = len(all_after)

    print("\nImport complete.")
    print(f"Total opportunities before: {before_count}")
    print(f"Total opportunities now:    {after_count}")
    print("=== Import finished ===")


if __name__ == "__main__":
    run_import()
