"use client";

import { useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import {
  fetchOpportunities,
  createOpportunity,
  type Opportunity,
  type OpportunityCreateInput,
} from "@/lib/funding-api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function formatMoney(value: number | null | undefined): string {
  if (value == null) return "—";
  return `$${value.toLocaleString()}`;
}

export default function FundingDashboardPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [minPriority, setMinPriority] = useState<number>(0);

  const [form, setForm] = useState({
    name: "",
    funder: "",
    category: "",
    location: "",
    url: "",
    min_amount: "",
    max_amount: "",
    deadline: "",
    match_required: "",
    eligibility_notes: "",
    status: "idea",
    alignment_score: "5",
    readiness_score: "3",
    competitiveness_score: "3",
    strategic_value_score: "4",
  });

  async function loadOpportunities() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOpportunities();
      data.sort((a, b) => b.priority_score - a.priority_score);
      setOpportunities(data);
    } catch (e: any) {
      setError(e.message || "Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOpportunities();
  }, []);

  function handleFormChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const payload: OpportunityCreateInput = {
        name: form.name.trim(),
        funder: form.funder.trim() || null,
        category: form.category.trim() || null,
        location: form.location.trim() || null,
        url: form.url.trim() || null,
        min_amount: form.min_amount ? Number(form.min_amount) : null,
        max_amount: form.max_amount ? Number(form.max_amount) : null,
        deadline: form.deadline || null,
        match_required:
          form.match_required === ""
            ? null
            : form.match_required === "true",
        eligibility_notes: form.eligibility_notes.trim() || null,
        status: form.status || "idea",
        alignment_score: Number(form.alignment_score || 0),
        readiness_score: Number(form.readiness_score || 0),
        competitiveness_score: Number(form.competitiveness_score || 0),
        strategic_value_score: Number(form.strategic_value_score || 0),
      };

      if (!payload.name) {
        throw new Error("Name is required");
      }

      await createOpportunity(payload);

      setForm((prev) => ({
        ...prev,
        name: "",
        funder: "",
        category: "",
        location: "",
        url: "",
        min_amount: "",
        max_amount: "",
        deadline: "",
        match_required: "",
        eligibility_notes: "",
      }));

      await loadOpportunities();
    } catch (e: any) {
      setError(e.message || "Failed to create opportunity");
    } finally {
      setCreating(false);
    }
  }

  const filtered = opportunities.filter(
    (opp) => opp.priority_score >= minPriority,
  );

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            2C Destiny – Funding Intelligence Dashboard
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Track, score, and prioritize funding opportunities for fathers,
            families, and communities.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr),minmax(0,2fr)] items-start">
          {/* LEFT: FORM */}
          <Card>
            <CardHeader>
              <CardTitle>Add / Log Opportunity</CardTitle>
              <CardDescription>
                Capture what you find on Grants.gov, GrantWatch, foundations,
                and more—then let 2C&apos;s brain score it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleCreate}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name*</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      handleFormChange("name", e.target.value)
                    }
                    placeholder="e.g., Responsible Fatherhood & Family Resilience Initiative"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="funder">Funder / Agency</Label>
                  <Input
                    id="funder"
                    value={form.funder}
                    onChange={(e) =>
                      handleFormChange("funder", e.target.value)
                    }
                    placeholder="e.g., HHS / ACF, local foundation"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={form.category}
                      onChange={(e) =>
                        handleFormChange("category", e.target.value)
                      }
                      placeholder="fatherhood, family, youth..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Target Area</Label>
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) =>
                        handleFormChange("location", e.target.value)
                      }
                      placeholder="e.g., Marion County, SC"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={form.url}
                    onChange={(e) =>
                      handleFormChange("url", e.target.value)
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min_amount">Min Amount</Label>
                    <Input
                      id="min_amount"
                      type="number"
                      value={form.min_amount}
                      onChange={(e) =>
                        handleFormChange("min_amount", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max_amount">Max Amount</Label>
                    <Input
                      id="max_amount"
                      type="number"
                      value={form.max_amount}
                      onChange={(e) =>
                        handleFormChange("max_amount", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={form.deadline}
                      onChange={(e) =>
                        handleFormChange("deadline", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Match Required?</Label>
                    <Select
                      value={form.match_required}
                      onValueChange={(value) =>
                        handleFormChange("match_required", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Unknown / N/A" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unknown / N/A</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility_notes">Eligibility Notes</Label>
                  <Textarea
                    id="eligibility_notes"
                    value={form.eligibility_notes}
                    onChange={(e) =>
                      handleFormChange("eligibility_notes", e.target.value)
                    }
                    placeholder="Key eligibility points, population focus, required partners..."
                    rows={3}
                  />
                </div>

                {/* Scores */}
                <div className="grid gap-3 md:grid-cols-2">
                  <ScoreField
                    label="Alignment (0–5)"
                    value={form.alignment_score}
                    onChange={(v) =>
                      handleFormChange("alignment_score", v)
                    }
                    helper="Mission fit with fathers, families, rural resilience."
                  />
                  <ScoreField
                    label="Readiness (0–5)"
                    value={form.readiness_score}
                    onChange={(v) =>
                      handleFormChange("readiness_score", v)
                    }
                    helper="How ready are you to submit now?"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <ScoreField
                    label="Competitiveness (0–5)"
                    value={form.competitiveness_score}
                    onChange={(v) =>
                      handleFormChange("competitiveness_score", v)
                    }
                    helper="Your realistic chance of winning."
                  />
                  <ScoreField
                    label="Strategic Value (0–5)"
                    value={form.strategic_value_score}
                    onChange={(v) =>
                      handleFormChange("strategic_value_score", v)
                    }
                    helper="How much this grows 2C Destiny's vision."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" disabled={creating}>
                    <Plus className="mr-2 h-4 w-4" />
                    {creating ? "Saving..." : "Add Opportunity"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    onClick={() => void loadOpportunities()}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh List
                  </Button>
                </div>

                {error && (
                  <p className="text-sm text-destructive pt-2">{error}</p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* RIGHT: TABLE */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div>
                <CardTitle>Opportunities</CardTitle>
                <CardDescription>
                  Sorted by priority. Filter by minimum priority score.
                </CardDescription>
              </div>
              <div className="space-y-1 text-right">
                <Label className="text-xs uppercase text-muted-foreground">
                  Min Priority
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={minPriority}
                  onChange={(e) =>
                    setMinPriority(Number(e.target.value) || 0)
                  }
                  className="w-24 text-right"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Opportunity</TableHead>
                      <TableHead>Funder</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Priority
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-8 text-center text-muted-foreground"
                        >
                          No opportunities match this filter yet.
                        </TableCell>
                      </TableRow>
                    )}

                    {filtered.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell className="min-w-[220px]">
                          <div className="space-y-1">
                            <div className="font-medium">
                              {opp.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {opp.category || "—"} ·{" "}
                              {opp.location || "—"}
                            </div>
                            {opp.url && (
                              <a
                                href={opp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary underline"
                              >
                                View details
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="min-w-[160px]">
                          {opp.funder || "—"}
                        </TableCell>
                        <TableCell>
                          {opp.deadline || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs">
                            {formatMoney(opp.min_amount)} –{" "}
                            {formatMoney(opp.max_amount)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              opp.status === "idea"
                                ? "outline"
                                : "default"
                            }
                          >
                            {opp.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-semibold">
                            {opp.priority_score.toFixed(2)}
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            A{opp.alignment_score} R{opp.readiness_score} C
                            {opp.competitiveness_score} S
                            {opp.strategic_value_score}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

type ScoreFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
};

function ScoreField({ label, value, onChange, helper }: ScoreFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        type="number"
        min={0}
        max={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {helper && (
        <p className="text-[11px] text-muted-foreground leading-tight">
          {helper}
        </p>
      )}
    </div>
  );
}
