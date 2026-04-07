import { Card } from './Card'
import { Users, TrendingUp, Award, Clock, Star } from 'lucide-react'
import { cn } from '../lib/utils'

interface SocialProofProps {
    type?: 'earnings' | 'active' | 'recent' | 'testimonials'
    className?: string
}

interface Stat {
    label: string
    value: string | number
    icon: typeof Users
    suffix?: string
}

const stats: Stat[] = [
    {
        label: 'Creators earned this week',
        value: '₹2.4L',
        icon: TrendingUp
    },
    {
        label: 'Active collaborations',
        value: '156',
        icon: Users
    },
    {
        label: 'Average deal value',
        value: '₹18,500',
        icon: Award,
        suffix: '+'
    },
    {
        label: 'Deals completed today',
        value: '23',
        icon: Clock
    }
]

const testimonials = [
    {
        name: 'Priya Sharma',
        handle: '@priyabeauty',
        text: 'Creator Armour transformed how I work with brands. No more confusing DMs!',
        rating: 5,
        earned: '₹1.2L this month'
    },
    {
        name: 'Rohan Mehta',
        handle: '@rohantravels',
        text: 'The payment protection gives me peace of mind. Highly recommended!',
        rating: 5,
        earned: '₹85K this month'
    },
    {
        name: 'Ananya Iyer',
        handle: '@ananya.fashion',
        text: 'I\'ve completed 10 deals in 3 months. This platform is amazing!',
        rating: 5,
        earned: '₹2.1L this month'
    }
]

export function SocialProof({ type = 'earnings', className }: SocialProofProps) {
    if (type === 'earnings' || type === 'active' || type === 'recent') {
        const stat = stats[type === 'earnings' ? 0 : type === 'active' ? 1 : 3]
        return (
            <div className={cn('animate-pulse', className)}>
                <div className="flex items-center gap-2 text-sm">
                    <stat.icon className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">
                        <span className="font-bold text-gray-900">{stat.value}</span>
                        {' '}{stat.label}
                    </span>
                </div>
            </div>
        )
    }

    if (type === 'testimonials') {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                    What Creators Say
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-white">
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">"{testimonial.text}"</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                                    <p className="text-xs text-gray-500">{testimonial.handle}</p>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {testimonial.earned}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} padding="sm" className="border-white text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <stat.icon className="w-4 h-4 text-primary-600" />
                        <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                </Card>
            ))}
        </div>
    )
}

// Live activity feed component
export function LiveActivityFeed() {
    const activities = [
        { action: 'completed a deal', user: 'Priya S.', amount: '₹15,000', time: '2m ago' },
        { action: 'received an offer', user: 'Rohan M.', amount: '₹25,000', time: '5m ago' },
        { action: 'earned', user: 'Ananya I.', amount: '₹8,500', time: '8m ago' },
        { action: 'started a collab', user: 'Vikram P.', amount: '₹20,000', time: '12m ago' },
    ]

    return (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-semibold text-gray-900 text-sm">Live Activity</h3>
            </div>
            <div className="space-y-2">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            {' '}{activity.action}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-600">{activity.amount}</span>
                            <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}