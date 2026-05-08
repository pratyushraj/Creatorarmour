import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CollabLink() {
    const { username } = useParams();
    const [showOfferForm, setShowOfferForm] = useState(false);
    const [showSecureDetails, setShowSecureDetails] = useState(false);
    const offerSectionRef = useRef<HTMLDivElement>(null);

    const handleStartCollaboration = () => {
        setShowOfferForm(true);
        setTimeout(() => {
            offerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 md:px-6">
            <div className="w-full max-w-2xl space-y-12">
                {/* Above The Fold */}
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-semibold tracking-tight">{username || 'Creator Name'}</h1>
                        <p className="text-muted-foreground font-medium">Tech & Legal Content Creator</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 w-full max-w-lg mx-auto py-1">
                        <div className="flex-1 px-2 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-medium border border-border/50 flex items-center justify-center whitespace-nowrap">
                            <span className="opacity-70 mr-1.5">✓</span> 11+ Brands
                        </div>
                        <div className="flex-1 px-2 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-medium border border-border/50 flex items-center justify-center whitespace-nowrap">
                            <span className="opacity-70 mr-1.5">⏱</span> ~3hr Resp
                        </div>
                        <div className="flex-1 px-2 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-medium border border-border/50 flex items-center justify-center whitespace-nowrap">
                            <span className="opacity-70 mr-1.5">⚡</span> 0% Cancel
                        </div>
                        <div className="flex-1 px-2 py-1.5 rounded-full bg-secondary text-secondary-foreground text-[11px] sm:text-xs font-medium border border-border/50 flex items-center justify-center whitespace-nowrap">
                            <span className="opacity-70 mr-1.5">📍</span> NCR Area
                        </div>
                    </div>

                    {!showOfferForm && (
                        <div className="sticky bottom-6 z-50 w-full mt-4 flex justify-center">
                            <Button
                                onClick={handleStartCollaboration}
                                className="w-full max-w-md h-12 text-base font-medium rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-150 ease-out active:scale-[0.98]"
                            >
                                Create Offer
                            </Button>
                        </div>
                    )}

                    {/* Trust Layer */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 text-xs text-muted-foreground w-full border-t border-border mt-8">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 opacity-50" />
                            <span>Contract auto-generated</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 opacity-50" />
                            <span>Payment tracked</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4 opacity-50" />
                            <span>Creator responds inside platform</span>
                        </div>
                    </div>
                </div>

                {/* Offer Section */}
                <div
                    className={cn(
                        "transition-all duration-500 ease-in-out transform origin-top",
                        showOfferForm ? "opacity-100 scale-y-100 h-auto" : "opacity-0 scale-y-0 h-0 overflow-hidden"
                    )}
                    ref={offerSectionRef}
                >
                    <Card className="rounded-2xl border border-border bg-card shadow-sm p-4 sm:p-6 mb-8">
                        <CardHeader className="px-0 pt-0 pb-6 border-b border-border mb-6">
                            <CardTitle className="text-xl font-semibold">Collaboration Details</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 pb-0 space-y-10">

                            {/* Group 1 – Offer Core */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Offer Core</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="collab-type">Collaboration Type</Label>
                                        <Select>
                                            <SelectTrigger className="bg-input border-border rounded-xl">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dedicated">Dedicated Video</SelectItem>
                                                <SelectItem value="integration">Integration</SelectItem>
                                                <SelectItem value="shoutout">Shoutout</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="budget">Budget (₹)</Label>
                                        <Input id="budget" type="number" placeholder="Enter amount" className="bg-input border-border rounded-xl" />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <Label htmlFor="deliverables">Deliverables</Label>
                                        <Textarea id="deliverables" placeholder="What exactly do you need?" className="bg-input border-border rounded-xl resize-none min-h-[80px]" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="timeline">Timeline</Label>
                                        <Input id="timeline" type="date" className="bg-input border-border rounded-xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Group 2 – Campaign Context */}
                            <div className="space-y-4 pt-8 border-t border-border">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Campaign Context</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="goal">Campaign Goal</Label>
                                        <Input id="goal" placeholder="e.g. App Installs, Brand Awareness" className="bg-input border-border rounded-xl" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="category">Category</Label>
                                        <Input id="category" placeholder="e.g. Finance, Tech" className="bg-input border-border rounded-xl" />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-2">
                                        <Label htmlFor="rights">Usage Rights Needed</Label>
                                        <Select>
                                            <SelectTrigger className="bg-input border-border rounded-xl">
                                                <SelectValue placeholder="Select rights" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30days">30 Days Digital</SelectItem>
                                                <SelectItem value="1year">1 Year All Media</SelectItem>
                                                <SelectItem value="perpetual">Perpetual Rights</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Group 3 – Secure Details */}
                            <div className="pt-8 border-t border-border">
                                <button
                                    type="button"
                                    onClick={() => setShowSecureDetails(!showSecureDetails)}
                                    className="flex items-center justify-between w-full text-left p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-transparent"
                                >
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm font-medium text-foreground">Secure Contract Details (after acceptance)</span>
                                    </div>
                                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", showSecureDetails ? "rotate-180" : "rotate-0")} />
                                </button>

                                <div className={cn(
                                    "grid gap-4 transition-all duration-200 ease-in-out overflow-hidden px-4",
                                    showSecureDetails ? "opacity-100 max-h-[500px] mt-4" : "opacity-0 max-h-0 mt-0"
                                )}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="legal-name" className="text-xs">Brand Legal Entity Name</Label>
                                            <Input id="legal-name" placeholder="Company Pvt Ltd." className="bg-input border-border rounded-xl" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="billing" className="text-xs">Billing Email</Label>
                                            <Input id="billing" type="email" placeholder="finance@company.com" className="bg-input border-border rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-base font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mt-8 transition-transform duration-150 ease-out active:scale-[0.98]"
                            >
                                Submit Offer Record
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
