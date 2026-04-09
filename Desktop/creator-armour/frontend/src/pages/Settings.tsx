import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription } from '../components/Card'
import { Button } from '../components/Button'
import { NotificationSettings } from '../components/NotificationSettings'
import { AchievementBadgeList } from '../components/AchievementBadge'
import { ReviewCard } from '../components/ReviewCard'
import { StarRating } from '../components/StarRating'
import { useStore } from '../store/useStore'
import {
    User,
    Bell,
    Trophy,
    Star,
    Shield,
    LogOut,
    ChevronRight,
    Mail,
    Instagram
} from 'lucide-react'
import type { Review, Achievement } from '../types'

export function Settings() {
    const navigate = useNavigate()
    const { user, creator, logout, isAuthenticated } = useStore()
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'achievements' | 'reviews'>('profile')

    // Mock achievements data
    const mockAchievements: Achievement[] = [
        {
            id: '1',
            user_id: '1',
            badge: 'first_deal',
            title: 'First Deal',
            description: 'Completed your first collaboration',
            icon: 'trophy',
            earned_at: '2024-01-15T10:00:00Z'
        },
        {
            id: '2',
            user_id: '1',
            badge: 'verified',
            title: 'Verified Creator',
            description: 'Account verified by the platform',
            icon: 'check-circle',
            earned_at: '2024-01-10T10:00:00Z'
        },
        {
            id: '3',
            user_id: '1',
            badge: 'fast_responder',
            title: 'Fast Responder',
            description: 'Responded to an offer within 24 hours',
            icon: 'zap',
            earned_at: '2024-01-20T10:00:00Z'
        }
    ]

    // Mock reviews data
    const mockReviews: Review[] = [
        {
            id: '1',
            deal_id: '1',
            reviewer_id: 'brand_1',
            reviewer_name: 'Glow Skincare',
            reviewer_type: 'brand',
            rating: 5,
            comment: 'Amazing creator to work with! Delivered high-quality content on time.',
            created_at: '2024-01-25T10:00:00Z'
        },
        {
            id: '2',
            deal_id: '2',
            reviewer_id: 'brand_2',
            reviewer_name: 'Tech Gadgets Co',
            reviewer_type: 'brand',
            rating: 4,
            comment: 'Great communication and professional delivery. Would work with again!',
            created_at: '2024-01-20T10:00:00Z'
        }
    ]

    const averageRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length

    if (!isAuthenticated) {
        navigate('/login')
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-premium pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 glass border-b border-gray-100/50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                            {creator?.name.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                            <h1 className="font-semibold text-gray-900">Settings</h1>
                            <p className="text-sm text-gray-500">Manage your account</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => logout()}>
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Profile Card */}
                <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {creator?.name.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{creator?.name || user?.name}</h2>
                            <p className="text-slate-300 flex items-center gap-2 mt-1">
                                <Instagram className="w-4 h-4" />
                                @{creator?.instagram_handle || 'username'}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Navigation Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                        { id: 'achievements', label: 'Achievements', icon: Trophy },
                        { id: 'reviews', label: 'Reviews', icon: Star }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'profile' && (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Information</CardTitle>
                                <CardDescription>
                                    Manage your profile and account settings
                                </CardDescription>
                            </CardHeader>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{user?.email}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Change</Button>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Instagram Handle</p>
                                        <p className="font-medium">@{creator?.instagram_handle}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Update</Button>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm text-gray-500">Password</p>
                                        <p className="font-medium">••••••••</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Change</Button>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-red-50 border-red-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-red-900">Danger Zone</h3>
                                    <p className="text-sm text-red-700 mt-1">
                                        Delete your account and all associated data
                                    </p>
                                </div>
                                <Button variant="danger" size="sm">Delete Account</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <NotificationSettings
                        onSave={(prefs) => console.log('Saved preferences:', prefs)}
                    />
                )}

                {activeTab === 'achievements' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Achievements</CardTitle>
                            <CardDescription>
                                Badges you've earned through your collaborations
                            </CardDescription>
                        </CardHeader>
                        <AchievementBadgeList achievements={mockAchievements} />
                    </Card>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-900">Your Rating</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <StarRating rating={Math.round(averageRating)} size="lg" />
                                        <span className="text-lg font-bold">{averageRating.toFixed(1)}</span>
                                        <span className="text-gray-500">({mockReviews.length} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">Recent Reviews</h3>
                            {mockReviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}