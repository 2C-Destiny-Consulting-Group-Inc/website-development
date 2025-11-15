"""
2C Funding Lab API Server
A FastAPI-based backend for the 2C Destiny Consulting Group funding lab application.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

# Initialize FastAPI app
app = FastAPI(
    title="2C Funding Lab API",
    description="API for managing funding opportunities and applications",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data Models
class FundingOpportunity(BaseModel):
    id: int
    title: str
    description: str
    amount: float
    deadline: str
    category: str
    eligibility: str


class Application(BaseModel):
    id: Optional[int] = None
    opportunity_id: int
    applicant_name: str
    organization: str
    requested_amount: float
    proposal: str
    status: str = "pending"


# In-memory storage (replace with database in production)
funding_opportunities = [
    {
        "id": 1,
        "title": "Community Development Grant",
        "description": "Funding for community development projects",
        "amount": 50000.0,
        "deadline": "2025-12-31",
        "category": "Community",
        "eligibility": "Non-profit organizations"
    },
    {
        "id": 2,
        "title": "Youth Education Initiative",
        "description": "Support for youth education programs",
        "amount": 25000.0,
        "deadline": "2025-11-30",
        "category": "Education",
        "eligibility": "Schools and educational institutions"
    }
]

applications = []


# API Routes
@app.get("/")
def read_root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to 2C Funding Lab API",
        "version": "1.0.0",
        "endpoints": {
            "funding_opportunities": "/api/funding-opportunities",
            "applications": "/api/applications"
        }
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.get("/api/funding-opportunities", response_model=List[FundingOpportunity])
def get_funding_opportunities():
    """Get all available funding opportunities"""
    return funding_opportunities


@app.get("/api/funding-opportunities/{opportunity_id}", response_model=FundingOpportunity)
def get_funding_opportunity(opportunity_id: int):
    """Get a specific funding opportunity by ID"""
    for opportunity in funding_opportunities:
        if opportunity["id"] == opportunity_id:
            return opportunity
    raise HTTPException(status_code=404, detail="Funding opportunity not found")


@app.post("/api/applications", response_model=Application)
def create_application(application: Application):
    """Submit a new funding application"""
    # Validate that the funding opportunity exists
    opportunity_exists = any(
        opp["id"] == application.opportunity_id for opp in funding_opportunities
    )
    if not opportunity_exists:
        raise HTTPException(status_code=404, detail="Funding opportunity not found")
    
    # Assign ID and add to applications
    application.id = len(applications) + 1
    applications.append(application.dict())
    return application


@app.get("/api/applications", response_model=List[Application])
def get_applications():
    """Get all applications"""
    return applications


@app.get("/api/applications/{application_id}", response_model=Application)
def get_application(application_id: int):
    """Get a specific application by ID"""
    for application in applications:
        if application["id"] == application_id:
            return application
    raise HTTPException(status_code=404, detail="Application not found")


@app.put("/api/applications/{application_id}", response_model=Application)
def update_application_status(application_id: int, status: str):
    """Update application status"""
    for application in applications:
        if application["id"] == application_id:
            application["status"] = status
            return application
    raise HTTPException(status_code=404, detail="Application not found")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
