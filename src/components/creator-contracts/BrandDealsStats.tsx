import React from 'react';
import { Card } from '@/components/ui/card';
import { IndianRupee, Briefcase, Clock, FileText, Loader2 } from 'lucide-react';
import { BrandDeal } from '@/types';
import { cn } from '@/lib/utils';

interface BrandDealsStatsProps {
  allDeals: BrandDeal[];
  isLoading: boolean;
}

export default function BrandDealsStats({ allDeals, isLoading }: BrandDealsStatsProps) {
  const totalDeals = allDeals.length;
  const activeDeals = allDeals.filter(d => d.status === 'Drafting' || d.status === 'Approved').length;
  const pendingPayments = allDeals.filter(d => d.status === 'Payment Pending').length;

  const incomeTracked = allDeals
    .filter(d => d.status === 'Completed')
    .reduce((sum, deal) => sum + deal.deal_amount, 0);

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  const stats = [
    {
      title: 'Total Deals',
      value: totalDeals,
      icon: Briefcase,
    },
    {
      title: 'Active Deals',
      value: activeDeals,
      icon: Clock,
    },
    {
      title: 'Pending Payments',
      value: pendingPayments,
      icon: FileText,
    },
    {
      title: 'Income Tracked',
      value: formatCurrency(incomeTracked),
      icon: IndianRupee,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="rounded-xl border border-border shadow-sm p-5 flex items-center justify-center h-[120px]">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-3">
              <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <div className="text-3xl font-semibold tracking-tight text-foreground">{stat.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">{stat.title}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}