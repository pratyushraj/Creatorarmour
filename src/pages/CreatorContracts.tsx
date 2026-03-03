import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Loader2, PlusCircle, AlertTriangle, Search, Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';
import { useBrandDeals } from '@/lib/hooks/useBrandDeals';
import { usePagination } from '@/lib/hooks/usePagination';
import { BrandDeal } from '@/types';
import BrandDealForm from '@/components/forms/BrandDealForm';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import BrandDealsStats from '@/components/creator-contracts/BrandDealsStats';
import MarkPaymentReceivedDialog from '@/components/creator-contracts/MarkPaymentReceivedDialog';
import { cn } from '@/lib/utils';

const DEAL_STATUS_OPTIONS = ['Drafting', 'Approved', 'Payment Pending', 'Completed', 'Cancelled'];

export default function CreatorContracts() {
  const { profile, loading: sessionLoading, isCreator } = useSession();
  const creatorId = profile?.id;
  const [isBrandDealFormOpen, setIsBrandDealFormOpen] = useState(false);
  const [editingBrandDeal, setEditingBrandDeal] = useState<BrandDeal | null>(null);
  const [isMarkPaymentDialogOpen, setIsMarkPaymentDialogOpen] = useState(false);
  const [dealToMarkPaid, setDealToMarkPaid] = useState<BrandDeal | null>(null);
  const [statusFilter, setStatusFilter] = useState<BrandDeal['status'] | 'All'>('All');
  const [platformFilter, setPlatformFilter] = useState<string | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'due_date' | 'payment_expected_date' | 'deal_amount'>('payment_expected_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const pageSize = 12;

  // --- Data Hooks ---
  const { data: allBrandDeals, isLoading: isLoadingBrandDeals, error: brandDealsError, refetch: refetchBrandDeals } = useBrandDeals({
    creatorId: creatorId,
    enabled: !sessionLoading && isCreator && !!creatorId,
    statusFilter: statusFilter !== 'All' ? statusFilter : undefined,
    platformFilter: platformFilter !== 'All' ? platformFilter : undefined,
    sortBy: sortBy,
    sortOrder: sortOrder,
  });

  useEffect(() => {
    if (brandDealsError) {
      toast.error('Error fetching brand deals', { description: brandDealsError.message });
    }
  }, [brandDealsError]);

  // --- Filtering and Pagination ---
  const filteredAndSearchedDeals = useMemo(() => {
    return (allBrandDeals || []).filter(deal => {
      const matchesSearch = searchTerm ? deal.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.deliverables.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesSearch;
    });
  }, [allBrandDeals, searchTerm]);

  const { currentPage, totalPages, handlePreviousPage, handleNextPage, setCurrentPage } = usePagination({
    totalCount: filteredAndSearchedDeals.length,
    pageSize: pageSize,
  });

  const paginatedDeals = filteredAndSearchedDeals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // --- Handlers ---
  const handleAddBrandDeal = () => {
    setEditingBrandDeal(null);
    setIsBrandDealFormOpen(true);
  };

  const handleEditBrandDeal = (deal: BrandDeal) => {
    setEditingBrandDeal(deal);
    setIsBrandDealFormOpen(true);
  };

  const handleMarkPaymentReceived = (deal: BrandDeal) => {
    setDealToMarkPaid(deal);
    setIsMarkPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    refetchBrandDeals();
    setIsMarkPaymentDialogOpen(false);
    setDealToMarkPaid(null);
  };

  const isOverdue = (paymentExpectedDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expectedDate = new Date(paymentExpectedDate);
    expectedDate.setHours(0, 0, 0, 0);
    return expectedDate < today;
  };

  if (sessionLoading || isLoadingBrandDeals) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading specific operations...</p>
      </div>
    );
  }

  const uniquePlatforms: string[] = Array.from(new Set((allBrandDeals || []).map(d => d.platform).filter((p): p is string => Boolean(p))));

  return (
    <div className="flex flex-col gap-10 bg-background max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Brand Deals & Contracts</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all your active structured deals and payments.</p>
        </div>
        <Button onClick={handleAddBrandDeal} className="h-10 px-4 rounded-xl shadow-sm transition-transform hover:scale-[0.98]">
          + New Deal Record
        </Button>
      </div>

      {/* Stats Section */}
      <BrandDealsStats allDeals={allBrandDeals || []} isLoading={isLoadingBrandDeals} />

      <section className="bg-transparent mt-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Active Operations</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals..."
                className="pl-9 h-10 rounded-xl bg-card border-border shadow-sm text-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex gap-3">
              <Select onValueChange={(value: BrandDeal['status'] | 'All') => {
                setStatusFilter(value);
                setCurrentPage(1);
              }} value={statusFilter}>
                <SelectTrigger className="w-[140px] h-10 rounded-xl bg-card border-border shadow-sm text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  {DEAL_STATUS_OPTIONS.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </SelectContent>
              </Select>

              {/* Optional: Add a general sort dropdown if really needed, but keeping UI clean */}
              <Select onValueChange={(value: string | 'All') => {
                setPlatformFilter(value);
                setCurrentPage(1);
              }} value={platformFilter}>
                <SelectTrigger className="w-[140px] h-10 rounded-xl bg-card border-border shadow-sm text-sm">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Platforms</SelectItem>
                  {uniquePlatforms.map(platform => <SelectItem key={platform} value={platform}>{platform}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {paginatedDeals.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedDeals.map((deal) => (
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
                        {isOverdue(deal.payment_expected_date) && deal.status === 'Payment Pending' && (
                          <span title="Overdue"><AlertTriangle className="h-4 w-4 text-amber-500 ml-1.5" /></span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-1">
                    <Button
                      onClick={() => deal.status === 'Payment Pending' ? handleMarkPaymentReceived(deal) : handleEditBrandDeal(deal)}
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
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isLoadingBrandDeals}
                  className="rounded-xl border-border hover:bg-secondary shadow-sm"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isLoadingBrandDeals}
                  className="rounded-xl border-border hover:bg-secondary shadow-sm"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center border border-dashed border-border rounded-2xl bg-card/30">
            <Filter className="h-8 w-8 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium text-foreground tracking-tight">No active deals</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm text-center">Adjust your filters or create a new deal to populate this workspace.</p>
            <Button onClick={handleAddBrandDeal} variant="outline" className="mt-6 rounded-xl">
              Create Deal Record
            </Button>
          </div>
        )}
      </section>

      {/* Brand Deal Form Dialog */}
      <Dialog open={isBrandDealFormOpen} onOpenChange={setIsBrandDealFormOpen}>
        <DialogContent
          className="sm:max-w-[600px] bg-card text-foreground border-border h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl shadow-xl"
          aria-labelledby="brand-deal-form-title"
          aria-describedby="brand-deal-form-description"
        >
          <DialogHeader className="p-6 border-b border-border bg-card">
            <DialogTitle id="brand-deal-form-title" className="text-xl tracking-tight">{editingBrandDeal ? 'Update Collaboration' : 'New Collaboration Record'}</DialogTitle>
            <DialogDescription id="brand-deal-form-description" className="text-sm text-muted-foreground mt-1">
              {editingBrandDeal ? 'Update the details for this collaboration pipeline record.' : 'Enter the details for your new pipeline collaboration.'}
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

      {/* Mark Payment Received Dialog */}
      <Dialog open={isMarkPaymentDialogOpen} onOpenChange={setIsMarkPaymentDialogOpen}>
        <DialogContent
          className="sm:max-w-[425px] bg-card text-foreground border-border rounded-2xl shadow-xl"
          aria-labelledby="mark-payment-title"
          aria-describedby="mark-payment-description"
        >
          <DialogHeader>
            <DialogTitle id="mark-payment-title" className="tracking-tight">Mark Payment Received</DialogTitle>
            <DialogDescription id="mark-payment-description" className="text-muted-foreground">
              Confirm the payment details for this deal. This will mark the record as 'Completed'.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {dealToMarkPaid && (
              <MarkPaymentReceivedDialog
                deal={dealToMarkPaid}
                onSaveSuccess={handlePaymentSuccess}
                onClose={() => setIsMarkPaymentDialogOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}