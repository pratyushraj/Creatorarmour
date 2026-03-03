"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { CreatorKpi } from '@/types';

interface CreatorKpiCardsProps {
  kpiCards: CreatorKpi[];
}

const CreatorKpiCards: React.FC<CreatorKpiCardsProps> = ({ kpiCards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;

        return (
          <Card key={index} className="rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between h-[120px]">
            <div className="flex flex-col space-y-3">
              <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <div className="text-3xl font-semibold tracking-tight text-foreground">{kpi.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">{kpi.title}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CreatorKpiCards;