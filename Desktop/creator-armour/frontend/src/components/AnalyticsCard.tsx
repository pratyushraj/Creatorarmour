import { Card } from './Card'
import { TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, ArrowUpRight } from 'lucide-react'
import { cn } from '../lib/utils'

interface AnalyticsCardProps {
    title: string
    value: string | number
    change?: number
    changeLabel?: string
    icon?: 'revenue' | 'deals' | 'conversion' | 'engagement'
    period?: string
    data?: { label: string; value: number }[]
}

export function AnalyticsCard({
    title,
    value,
    change,
    changeLabel = 'vs last month',
    icon = 'revenue',
    period,
    data = []
}: AnalyticsCardProps) {
    const isPositive = change !== undefined && change >= 0

    const icons = {
        revenue: DollarSign,
        deals: PieChart,
        conversion: TrendingUp,
        engagement: ArrowUpRight
    }

    const Icon = icons[icon]

    return (
        <Card className="border-white">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-600" />
                </div>
            </div>

            {change !== undefined && (
                <div className="flex items-center gap-2">
                    <span className={cn(
                        'flex items-center gap-1 text-sm font-medium',
                        isPositive ? 'text-green-600' : 'text-red-600'
                    )}>
                        {isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                        ) : (
                            <TrendingDown className="w-4 h-4" />
                        )}
                        {Math.abs(change)}%
                    </span>
                    <span className="text-sm text-gray-500">{changeLabel}</span>
                </div>
            )}

            {data.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-end gap-1 h-16">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex-1 bg-primary-100 rounded-t-sm relative group"
                                style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
                            >
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                                    {item.label}: {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                    {period && (
                        <p className="text-xs text-gray-500 mt-2 text-center">{period}</p>
                    )}
                </div>
            )}
        </Card>
    )
}