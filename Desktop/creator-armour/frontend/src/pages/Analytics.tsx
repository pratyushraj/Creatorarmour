import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Button } from '../components/Button'
import { AnalyticsCard } from '../components/AnalyticsCard'
import { SocialProof, LiveActivityFeed } from '../components/SocialProof'
import { useStore } from '../store/useStore'
import {

    TrendingUp,
    Users,
    PieChart,
    Calendar,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Award,
    Clock
} from 'lucide-react'
// import type { Deal } from '../types'

export function Analytics() {
    const navigate = useNavigate()
    const { isAuthenticated } = useStore()
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

    // Mock analytics data
    const analytics = {
        totalEarnings: 125000,
        earningsChange: 23.5,
        completedDeals: 12,
        dealsChange: 50,
        averageDealValue: 10416,
        valueChange: 8.2,
        conversionRate: 68,
        conversionChange: 12,
        monthlyData: [
            { label: 'Jan', value: 45000 },
            { label: 'Feb', value: 52000 },
            { label: 'Mar', value: 38000 },
            { label: 'Apr', value: 65000 },
            { label: 'May', value: 48000 },
            { label: 'Jun', value: 72000 },
        ],
        topDeals: [
            { brand: 'Glow Skincare', value: 25000, status: 'completed', date: 'Jun 15' },
            { brand: 'Tech Gadgets Co', value: 18000, status: 'in_progress', date: 'Jun 20' },
            { brand: 'Fashion Hub', value: 15000, status: 'completed', date: 'Jun 10' },
        ]
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value)
    }

    if (!isAuthenticated) {
        navigate('/login')
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
                        <p className="text-sm text-gray-500">Track your performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                        <Button variant="secondary" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                {/* Live Activity Banner */}
                <LiveActivityFeed />

                {/* Social Proof Stats */}
                <SocialProof />

                {/* Main Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnalyticsCard
                        title="Total Earnings"
                        value={formatCurrency(analytics.totalEarnings)}
                        change={analytics.earningsChange}
                        icon="revenue"
                        data={analytics.monthlyData}
                        period="Last 6 months"
                    />
                    <AnalyticsCard
                        title="Completed Deals"
                        value={analytics.completedDeals}
                        change={analytics.dealsChange}
                        icon="deals"
                    />
                    <AnalyticsCard
                        title="Avg. Deal Value"
                        value={formatCurrency(analytics.averageDealValue)}
                        change={analytics.valueChange}
                        icon="conversion"
                    />
                    <AnalyticsCard
                        title="Conversion Rate"
                        value={`${analytics.conversionRate}%`}
                        change={analytics.conversionChange}
                        icon="engagement"
                    />
                </div>

                {/* Earnings Chart */}
                <Card className="border-white">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Earnings Overview</CardTitle>
                                <CardDescription>Your monthly earnings trend</CardDescription>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-primary-500 rounded-full" />
                                    Earnings
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="h-64 flex items-end gap-4 px-4">
                        {analytics.monthlyData.map((month, index) => {
                            const maxValue = Math.max(...analytics.monthlyData.map(d => d.value))
                            const height = (month.value / maxValue) * 100
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full relative group">
                                        <div
                                            className="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all group-hover:from-primary-600 group-hover:to-primary-500"
                                            style={{ height: `${height}%`, minHeight: '20px' }}
                                        />
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                            {formatCurrency(month.value)}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{month.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </Card>

                {/* Top Deals */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-white">
                        <CardHeader>
                            <CardTitle>Top Performing Deals</CardTitle>
                            <CardDescription>Your highest value collaborations</CardDescription>
                        </CardHeader>
                        <div className="space-y-4">
                            {analytics.topDeals.map((deal, index) => {
                                const statusColor = deal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
                                const statusText = deal.status === 'completed' ? 'Completed' : 'In Progress';
                                return (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Award className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{deal.brand}</p>
                                                <p className="text-sm text-gray-500">{deal.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{formatCurrency(deal.value)}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                                                {statusText}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Performance Metrics */}
                    <Card className="border-white">
                        <CardHeader>
                            <CardTitle>Performance Metrics</CardTitle>
                            <CardDescription>Key indicators of your success</CardDescription>
                        </CardHeader>
                        <div className="space-y-4">
                            {[
                                { label: 'Response Time', value: '< 2 hours', icon: Clock, trend: 'fast' },
                                { label: 'Deal Success Rate', value: '92%', icon: TrendingUp, trend: 'up' },
                                { label: 'Repeat Clients', value: '67%', icon: Users, trend: 'up' },
                                { label: 'On-Time Delivery', value: '98%', icon: Calendar, trend: 'up' },
                            ].map((metric, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <metric.icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{metric.label}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-900">{metric.value}</span>
                                        {metric.trend === 'up' ? (
                                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <ArrowDownRight className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Recommendations */}
                <Card className="bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <PieChart className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">AI Insights</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Based on your performance, you could increase earnings by <span className="font-bold text-primary-600">₹35,000/month</span> by:
                            </p>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                <li>• Accepting 2 more deals per month</li>
                                <li>• Increasing rates by 15% (your engagement supports this)</li>
                                <li>• Focusing on tech niche (highest paying for you)</li>
                            </ul>
                            <Button className="mt-4" size="sm">
                                View Full Report
                            </Button>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    )
}