'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getFundingOpportunities, type FundingOpportunity } from '@/lib/funding-api';

export default function Home() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const data = await getFundingOpportunities();
        setOpportunities(data);
      } catch (err) {
        setError('Failed to load funding opportunities. Please make sure the backend is running.');
        console.error('Error fetching opportunities:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading funding opportunities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Run the backend server: cd backend && python3 main.py
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            2C Funding Lab
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore funding opportunities and submit applications to support your community projects
          </p>
        </div>

        {/* Funding Opportunities Grid */}
        {opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No funding opportunities available at this time.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4">
                    {opportunity.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Amount:</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ${opportunity.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Deadline:</span>
                      <span>{new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Eligibility:</span>
                      <p className="text-muted-foreground mt-1">
                        {opportunity.eligibility}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" variant="default">
                    Apply Now
                  </Button>
                  <Button variant="outline">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            2C Destiny Consulting Group, Inc. | Empowering Communities Through Funding
          </p>
        </div>
      </div>
    </main>
  );
}
