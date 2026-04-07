import { Trophy, Star, Zap, Crown, Users, Clock, CheckCircle } from 'lucide-react'
import { cn } from '../lib/utils'
import type { Achievement } from '../types'

interface AchievementBadgeProps {
    achievement: Achievement
    size?: 'sm' | 'md' | 'lg'
    showTooltip?: boolean
}

const badgeIcons = {
    first_offer: Star,
    first_deal: Trophy,
    five_deals: Star,
    ten_deals: Crown,
    top_earner: Crown,
    fast_responder: Zap,
    verified: CheckCircle
}

const badgeColors = {
    first_offer: 'from-yellow-400 to-orange-500',
    first_deal: 'from-green-400 to-emerald-500',
    five_deals: 'from-blue-400 to-indigo-500',
    ten_deals: 'from-purple-400 to-pink-500',
    top_earner: 'from-amber-400 to-yellow-500',
    fast_responder: 'from-cyan-400 to-blue-500',
    verified: 'from-green-400 to-teal-500'
}

export function AchievementBadge({ achievement, size = 'md', showTooltip = true }: AchievementBadgeProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        })
    }

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    }

    const iconSizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }

    const Icon = badgeIcons[achievement.badge] || Star
    const colorClass = badgeColors[achievement.badge] || 'from-gray-400 to-gray-500'

    return (
        <div 
            className={cn(
                'relative group',
                showTooltip && 'cursor-help'
            )}
        >
            <div className={cn(
                sizeClasses[size],
                `bg-gradient-to-br ${colorClass}`,
                'rounded-full flex items-center justify-center text-white shadow-lg',
                'transform transition-transform group-hover:scale-110'
            )}>
                <Icon className={iconSizeClasses[size]} />
            </div>
            
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="font-semibold">{achievement.title}</div>
                    <div className="text-gray-300 mt-1">{achievement.description}</div>
                    <div className="text-gray-400 text-[10px] mt-1">Earned {formatDate(achievement.earned_at)}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </div>
    )
}

interface AchievementBadgeListProps {
    achievements: Achievement[]
}

export function AchievementBadgeList({ achievements }: AchievementBadgeListProps) {
    if (achievements.length === 0) {
        return (
            <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No achievements yet</p>
                <p className="text-gray-400 text-sm mt-1">Complete deals to earn badges!</p>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} size="md" />
            ))}
        </div>
    )
}