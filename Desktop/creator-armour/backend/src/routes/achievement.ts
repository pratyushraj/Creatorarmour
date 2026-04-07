import { Router, Request, Response } from 'express'
import db from '../db.js'

const router = Router()

// Achievement definitions
const ACHIEVEMENTS = {
    first_offer: {
        title: 'First Offer',
        description: 'Received your first collaboration offer',
        icon: 'star'
    },
    first_deal: {
        title: 'First Deal',
        description: 'Completed your first collaboration',
        icon: 'trophy'
    },
    five_deals: {
        title: 'Rising Star',
        description: 'Completed 5 collaborations',
        icon: 'star'
    },
    ten_deals: {
        title: 'Collaboration Pro',
        description: 'Completed 10 collaborations',
        icon: 'crown'
    },
    top_earner: {
        title: 'Top Earner',
        description: 'Earned over ₹50,000',
        icon: 'crown'
    },
    fast_responder: {
        title: 'Fast Responder',
        description: 'Responded to an offer within 24 hours',
        icon: 'zap'
    },
    verified: {
        title: 'Verified Creator',
        description: 'Account verified by the platform',
        icon: 'check-circle'
    }
}

// Get achievements for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const { data, error } = await db
            .from('achievements')
            .select('*')
            .eq('user_id', userId)
            .order('earned_at', { ascending: false })

        if (error) throw error

        res.json(data || [])
    } catch (error) {
        console.error('Error fetching achievements:', error)
        res.status(500).json({ error: 'Failed to fetch achievements' })
    }
})

// Award an achievement to a user
router.post('/award', async (req: Request, res: Response) => {
    try {
        const { user_id, badge } = req.body

        // Validate badge type
        if (!ACHIEVEMENTS[badge]) {
            return res.status(400).json({ error: 'Invalid badge type' })
        }

        // Check if already awarded
        const { data: existing } = await db
            .from('achievements')
            .select('id')
            .eq('user_id', user_id)
            .eq('badge', badge)
            .single()

        if (existing) {
            return res.status(409).json({ error: 'Achievement already awarded' })
        }

        const achievement = ACHIEVEMENTS[badge]

        const { data, error } = await db
            .from('achievements')
            .insert([{
                user_id,
                badge,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon
            }])
            .select()
            .single()

        if (error) throw error

        res.status(201).json(data)
    } catch (error) {
        console.error('Error awarding achievement:', error)
        res.status(500).json({ error: 'Failed to award achievement' })
    }
})

// Check and award achievements based on deal completion
router.post('/check-deal', async (req: Request, res: Response) => {
    try {
        const { user_id, deal_id, budget } = req.body

        const awardedAchievements = []

        // Check for first deal
        const { data: completedDeals } = await db
            .from('deals')
            .select('id')
            .eq('creator_id', user_id)
            .eq('status', 'completed')

        if (completedDeals && completedDeals.length === 1) {
            // First deal achievement
            try {
                const achievement = await router.post('/award', { user_id, badge: 'first_deal' })
                awardedAchievements.push(achievement)
            } catch (e) {
                // Already has this achievement
            }
        }

        // Check for 5 deals
        if (completedDeals && completedDeals.length === 5) {
            try {
                const achievement = await router.post('/award', { user_id, badge: 'five_deals' })
                awardedAchievements.push(achievement)
            } catch (e) {
                // Already has this achievement
            }
        }

        // Check for 10 deals
        if (completedDeals && completedDeals.length === 10) {
            try {
                const achievement = await router.post('/award', { user_id, badge: 'ten_deals' })
                awardedAchievements.push(achievement)
            } catch (e) {
                // Already has this achievement
            }
        }

        // Check for top earner (₹50,000+)
        const { data: earningsData } = await db
            .from('deals')
            .select('budget')
            .eq('creator_id', user_id)
            .eq('status', 'completed')

        const totalEarnings = earningsData?.reduce((sum, d) => sum + d.budget, 0) || 0
        if (totalEarnings >= 50000) {
            try {
                const achievement = await router.post('/award', { user_id, badge: 'top_earner' })
                awardedAchievements.push(achievement)
            } catch (e) {
                // Already has this achievement
            }
        }

        res.json({ awardedAchievements, totalEarnings })
    } catch (error) {
        console.error('Error checking achievements:', error)
        res.status(500).json({ error: 'Failed to check achievements' })
    }
})

// Award verified badge (admin only)
router.post('/verify-creator', async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body

        // In production, verify admin credentials here

        try {
            const achievement = await router.post('/award', { user_id, badge: 'verified' })
            res.json(achievement)
        } catch (e) {
            res.status(409).json({ error: 'Creator already verified' })
        }
    } catch (error) {
        console.error('Error verifying creator:', error)
        res.status(500).json({ error: 'Failed to verify creator' })
    }
})

// Get achievement statistics
router.get('/stats/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        // Get user's achievements
        const { data: achievements } = await db
            .from('achievements')
            .select('badge')
            .eq('user_id', userId)

        const userBadges = achievements?.map(a => a.badge) || []

        // Calculate progress towards next achievements
        const { data: completedDeals } = await db
            .from('deals')
            .select('budget')
            .eq('creator_id', userId)
            .eq('status', 'completed')

        const totalEarnings = completedDeals?.reduce((sum, d) => sum + d.budget, 0) || 0
        const dealCount = completedDeals?.length || 0

        const progress = {
            deals: dealCount,
            earnings: totalEarnings,
            nextAchievement: dealCount >= 10 ? 'top_earner' : dealCount >= 5 ? 'ten_deals' : dealCount >= 1 ? 'five_deals' : 'first_deal',
            progressToNext: dealCount >= 5 ? Math.min(dealCount / 10, 1) : dealCount >= 1 ? Math.min(dealCount / 5, 1) : 0,
            totalAchievements: Object.keys(ACHIEVEMENTS).length,
            earnedAchievements: userBadges.length
        }

        res.json(progress)
    } catch (error) {
        console.error('Error fetching achievement stats:', error)
        res.status(500).json({ error: 'Failed to fetch achievement stats' })
    }
})

export default router