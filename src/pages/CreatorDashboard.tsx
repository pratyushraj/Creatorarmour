import React, { useState, useMemo } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { Loader2, Briefcase, Clock, IndianRupee, AlertTriangle, Check } from 'lucide-react';
import { useBrandDeals } from '@/lib/hooks/useBrandDeals';
import { BrandDeal } from '@/types';
import BrandDealForm from '@/components/forms/BrandDealForm';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PIPELINE_STAGES = [
  'Offer Sent',
  'Under Review',
  'Countered',
  'Accepted',
  'Confirmed',
  'Completed',
];

const CreatorDashboard = () => {
  const { profile, loading: sessionLoading, isCreator } = useSession();
  const [isBrandDealFormOpen, setIsBrandDealFormOpen] = useState(false);
  const [editingBrandDeal, setEditingBrandDeal] = useState<BrandDeal | null>(null);

  const { data: brandDeals, isLoading: isLoadingBrandDeals, refetch: refetchBrandDeals } = useBrandDeals({
    creatorId: profile?.id,
    enabled: !sessionLoading && isCreator && !!profile?.id,
  });

  const handleAddDeal = () => {
    setEditingBrandDeal(null);
    setIsBrandDealFormOpen(true);
  };

  const handleEditDeal = (deal: BrandDeal) => {
    setEditingBrandDeal(deal);
    setIsBrandDealFormOpen(true);
  };

  const metrics = useMemo(() => {
    const deals = brandDeals || [];
    const activeDeals = deals.filter(d => ['Drafting', 'Approved', 'Payment Pending'].includes(d.status)).length;
    const pendingResponse = deals.filter(d => d.status === 'Drafting').length;
    const actionRequired = deals.filter(d => d.status === 'Payment Pending' && new Date(d.payment_expected_date) < new Date()).length;

    // Calculate this month's earnings
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthEarnings = deals
      .filter(d => d.status === 'Completed' && new Date(d.payment_expected_date).getMonth() === currentMonth && new Date(d.payment_expected_date).getFullYear() === currentYear)
      .reduce((sum, d) => sum + d.deal_amount, 0);

    return [
      { label: 'Active Deals', value: activeDeals, icon: Briefcase },
      { label: 'Pending Response', value: pendingResponse, icon: Clock },
      { label: 'This Month Earnings', value: `₹${monthEarnings.toLocaleString('en-IN')}`, icon: IndianRupee },
      { label: 'Action Required', value: actionRequired, icon: AlertTriangle },
    ];
  }, [brandDeals]);

  if (sessionLoading || isLoadingBrandDeals) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading specific operations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 bg-background max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Collaboration Operations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage pipeline, deals, and active contracts securely.</p>
        </div>
        <Button onClick={handleAddDeal} className="h-10 px-4 rounded-xl shadow-sm transition-transform hover:scale-[0.98]">
          + New Deal Record
        </Button>
      </div>

      {/* Structured Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className="rounded-xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-3">
              <metric.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <div>
                <div className="text-3xl font-semibold tracking-tight text-foreground">{metric.value}</div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-1">{metric.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pipeline Tracker */}
      <div className="w-full relative py-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Active Pipeline</h2>
        <div className="flex items-start justify-between relative z-10 w-full gap-2">
          <div className="absolute top-3 left-[5%] right-[5%] h-[1px] bg-border -z-10" />
          {PIPELINE_STAGES.map((stage, i) => {
            const isActive = i === 1; // Example active stage logic
            return (
              <div key={stage} className="flex flex-col items-center gap-3 flex-1 relative bg-card">
                <div className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium border transition-colors bg-card",
                  isActive ? "border-primary bg-primary/10 text-primary shadow-sm" : "border-border text-muted-foreground"
                )}>
                  {i < 1 ? <Check className="h-3 w-3" strokeWidth={2} /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-center",
                  isActive ? "text-foreground" : "text-muted-foreground/70"
                )}>
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandDeals?.map((deal) => (
          <div key={deal.id} className="bg-card p-5 rounded-2xl border border-border flex flex-col hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-4 gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-base font-semibold tracking-tight text-foreground truncate" title={deal.brand_name}>
                  {deal.brand_name || "Untitled Deal"}
                </h3>
                <p className="text-sm text-muted-foreground truncate min-h-[20px]" title={deal.deliverables}>
                  {deal.deliverables || "No deliverables specified"}
                </p>
              </div>
              <Badge className={cn(
                "rounded-[8px] px-2 py-0.5 text-[11px] font-medium border uppercase tracking-wider shrink-0 whitespace-nowrap",
                deal.status === 'Completed' ? "bg-green-500/10 text-green-600 border-green-500/20" :
                  deal.status === 'Payment Pending' ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                    deal.status === 'Drafting' ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                      "bg-secondary text-secondary-foreground border-border/50"
              )} variant="outline">
                {deal.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-secondary/30 p-3.5 rounded-[12px] border border-border/50">
              <div>
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase mb-1 font-semibold">Budget</p>
                <p className="font-medium text-foreground tracking-tight">₹{deal.deal_amount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase mb-1 font-semibold">Deadline</p>
                <div className="flex items-center font-medium text-foreground tracking-tight">
                  {new Date(deal.payment_expected_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-1">
              <Button
                onClick={() => handleEditDeal(deal)}
                className={cn(
                  "w-full h-10 font-semibold rounded-[10px] transition-transform duration-150 ease-out active:scale-[0.98] shadow-sm",
                  deal.status === 'Payment Pending'
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary/80 text-foreground hover:bg-secondary border border-border/50"
                )}
              >
                {deal.status === 'Payment Pending' ? 'Resolve Payment' : 'View Details'}
              </Button>
            </div>
          </div>
        ))}

        {!brandDeals?.length && (
          <div className="col-span-full py-16 text-center border border-dashed border-border rounded-2xl bg-card/50">
            <h3 className="text-lg font-medium text-foreground">No collaborations found</h3>
            <p className="text-sm text-muted-foreground mt-2">Start your first structured deal or share your collaboration link.</p>
          </div>
        )}
      </div>

      {/* Brand Deal Form Dialog */}
      <Dialog open={isBrandDealFormOpen} onOpenChange={setIsBrandDealFormOpen}>
        <DialogContent
          className="sm:max-w-[600px] bg-card text-foreground border-border h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl"
          aria-labelledby="brand-deal-form-title"
          aria-describedby="brand-deal-form-description"
        >
          <DialogHeader className="p-6 border-b border-border bg-card">
            <DialogTitle id="brand-deal-form-title" className="text-xl">{editingBrandDeal ? 'Update Collaboration' : 'New Collaboration Record'}</DialogTitle>
            <DialogDescription id="brand-deal-form-description" className="text-sm text-muted-foreground mt-1">
              Securely store or create a new deal to be tracked in your pipeline.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 p-6">
            <BrandDealForm
              initialData={editingBrandDeal}
              onSaveSuccess={() => {
                refetchBrandDeals();
                setIsBrandDealFormOpen(false);
                setEditingBrandDeal(null);
              }}
              onClose={() => {
                setIsBrandDealFormOpen(false);
                setEditingBrandDeal(null);
              }}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorDashboard;