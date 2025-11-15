/**
 * 2C Funding Lab API Client
 * Provides methods to interact with the backend API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface FundingOpportunity {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  category: string;
  eligibility: string;
}

export interface Application {
  id?: number;
  opportunity_id: number;
  applicant_name: string;
  organization: string;
  requested_amount: number;
  proposal: string;
  status?: string;
}

/**
 * Fetch all funding opportunities
 */
export async function getFundingOpportunities(): Promise<FundingOpportunity[]> {
  const response = await fetch(`${API_BASE_URL}/api/funding-opportunities`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch funding opportunities');
  }
  
  return response.json();
}

/**
 * Fetch a specific funding opportunity by ID
 */
export async function getFundingOpportunity(id: number): Promise<FundingOpportunity> {
  const response = await fetch(`${API_BASE_URL}/api/funding-opportunities/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch funding opportunity ${id}`);
  }
  
  return response.json();
}

/**
 * Submit a new funding application
 */
export async function submitApplication(application: Application): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/api/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(application),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit application');
  }
  
  return response.json();
}

/**
 * Fetch all applications
 */
export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/api/applications`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  
  return response.json();
}

/**
 * Fetch a specific application by ID
 */
export async function getApplication(id: number): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/api/applications/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch application ${id}`);
  }
  
  return response.json();
}

/**
 * Update application status
 */
export async function updateApplicationStatus(
  id: number,
  status: string
): Promise<Application> {
  const response = await fetch(
    `${API_BASE_URL}/api/applications/${id}?status=${encodeURIComponent(status)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to update application status');
  }
  
  return response.json();
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  
  if (!response.ok) {
    throw new Error('API health check failed');
  }
  
  return response.json();
}
