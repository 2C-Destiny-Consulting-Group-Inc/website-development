from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, Session, create_engine, select
from typing import Optional, List
from datetime import datetime, date
from pathlib import Path


# ---------- DATABASE & MODELS ----------

sqlite_file_name = "funding_lab.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=False)


class OpportunityBase(SQLModel):
    name: str

    funder: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    url: Optional[str] = None

    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    deadline: Optional[date] = None
    match_required: Optional[bool] = None
    eligibility_notes: Optional[str] = None

    status: str = "idea"

    alignment_score: int = 0
    readiness_score: int = 0
    competitiveness_score: int = 0
    strategic_value_score: int = 0

    priority_score: float = 0.0


class Opportunity(OpportunityBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class OpportunityCreate(OpportunityBase):
    pass


class OpportunityRead(OpportunityBase):
    id: int
    created_at: datetime
    updated_at: datetime


class OpportunityUpdate(SQLModel):
    name: Optional[str] = None
    funder: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    url: Optional[str] = None

    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    deadline: Optional[date] = None
    match_required: Optional[bool] = None
    eligibility_notes: Optional[str] = None

    status: Optional[str] = None

    alignment_score: Optional[int] = None
    readiness_score: Optional[int] = None
    competitiveness_score: Optional[int] = None
    strategic_value_score: Optional[int] = None


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)


def calculate_priority(opp: OpportunityBase) -> float:
    """
    Weighted priority score:
    - Alignment:       40%
    - Readiness:       25%
    - Competitiveness: 20%
    - Strategic value: 15%
    """
    score = (
        opp.alignment_score * 0.40
        + opp.readiness_score * 0.25
        + opp.competitiveness_score * 0.20
        + opp.strategic_value_score * 0.15
    )
    return round(score, 2)


# ---------- APP & CORS ----------

app = FastAPI(
    title="2C Destiny Funding Intelligence API",
    version="0.1.0",
)

# Frontend origins – adjust if needed
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


# ---------- CRUD ENDPOINTS ----------

@app.post("/opportunities", response_model=OpportunityRead)
def create_opportunity(opportunity_in: OpportunityCreate) -> Opportunity:
    """
    Create a new opportunity and compute its priority score.
    """
    with Session(engine) as session:
        opp = Opportunity.from_orm(opportunity_in)
        # compute priority
        opp.priority_score = calculate_priority(opp)
        now = datetime.utcnow()
        opp.created_at = now
        opp.updated_at = now

        session.add(opp)
        session.commit()
        session.refresh(opp)
        return opp


@app.get("/opportunities", response_model=List[OpportunityRead])
def list_opportunities(min_priority: float = 0.0) -> List[Opportunity]:
    """
    List all opportunities, with optional minimum priority filter.
    Results are ordered by priority_score descending.
    """
    with Session(engine) as session:
        statement = select(Opportunity)
        if min_priority > 0:
            statement = statement.where(Opportunity.priority_score >= min_priority)
        statement = statement.order_by(Opportunity.priority_score.desc())
        results = session.exec(statement).all()
        return results


@app.get("/opportunities/{id}", response_model=OpportunityRead)
def get_opportunity(id: int) -> Opportunity:
    with Session(engine) as session:
        opp = session.get(Opportunity, id)
        if not opp:
            raise HTTPException(status_code=404, detail="Opportunity not found")
        return opp


@app.put("/opportunities/{id}", response_model=OpportunityRead)
def update_opportunity(id: int, update: OpportunityUpdate) -> Opportunity:
    with Session(engine) as session:
        opp = session.get(Opportunity, id)
        if not opp:
            raise HTTPException(status_code=404, detail="Opportunity not found")

        # Apply partial updates
        update_data = update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(opp, key, value)

        # Recalculate priority if any scoring field changed
        opp.priority_score = calculate_priority(opp)
        opp.updated_at = datetime.utcnow()

        session.add(opp)
        session.commit()
        session.refresh(opp)
        return opp


# ---------- SIMPLE HTML ENDPOINTS (optional) ----------

@app.get("/dashboard", response_class=HTMLResponse)
def serve_dashboard() -> str:
    """
    If 'dashboard.html' exists in this folder, serve it.
    You can ignore this if you're using the Shadcn React frontend.
    """
    html_path = Path("dashboard.html")
    if not html_path.exists():
        return "<h1>2C Destiny Funding Lab</h1><p>No dashboard.html found.</p>"
    return html_path.read_text(encoding="utf-8")


@app.get("/")
def root():
    return {"message": "2C Destiny Funding Lab API is running!"}
