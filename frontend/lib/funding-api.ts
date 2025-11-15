export const API_BASE = "http://127.0.0.1:8000";

export type Opportunity = {
  id: number;
  name: string;
  funder: string | null;
  category: string | null;
  location: string | null;
  url: string | null;
  min_amount: number | null;
  max_amount: number | null;
  deadline: string | null;
  match_required: boolean | null;
  eligibility_notes: string | null;
  status: string;
  alignment_score: number;
  readiness_score: number;
  competitiveness_score: number;
  strategic_value_score: number;
  priority_score: number;
  created_at: string;
  updated_at: string;
};

export type OpportunityCreateInput = {
  name: string;
  funder?: string | null;
  category?: string | null;
  location?: string | null;
  url?: string | null;
  min_amount?: number | null;
  max_amount?: number | null;
  deadline?: string | null; // "YYYY-MM-DD"
  match_required?: boolean | null;
  eligibility_notes?: string | null;
  status?: string;
  alignment_score: number;
  readiness_score: number;
  competitiveness_score: number;
  strategic_value_score: number;
};

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const res = await fetch(`${API_BASE}/opportunities`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch opportunities: ${res.status}`);
  }
  return await res.json();
}

export async function createOpportunity(
  data: OpportunityCreateInput,
): Promise<Opportunity> {
  const res = await fetch(`${API_BASE}/opportunities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create opportunity: ${res.status} ${text}`);
  }

  return await res.json();
}
