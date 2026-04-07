import { Router, Request, Response } from 'express'
import db from '../db.js'

const router = Router()

// Get reviews for a creator
router.get('/creator/:creatorId', async (req: Request, res: Response) => {
    try {
        const { creatorId } = req.params
        const { limit = 10, offset = 0 } = req.query

        const { data, error } = await db
            .from('reviews')
            .select('*')
            .eq('creator_id', creatorId)
            .order('created_at', { ascending: false })
            .range(Number(offset), Number(offset) + Number(limit) - 1)

        if (error) throw error

        // Calculate average rating
        const { data: stats } = await db
            .from('reviews')
            .select('rating')
            .eq('creator_id', creatorId)

        const averageRating = stats && stats.length > 0
            ? stats.reduce((sum, r) => sum + r.rating, 0) / stats.length
            : 0

        res.json({
            reviews: data || [],
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews: stats?.length || 0
        })
    } catch (error) {
        console.error('Error fetching reviews:', error)
        res.status(500).json({ error: 'Failed to fetch reviews' })
    }
})

// Create a review (after deal completion)
router.post('/', async (req: Request, res: Response) => {
    try {
        const { deal_id, reviewer_id, reviewer_name, reviewer_type, rating, comment } = req.body

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' })
        }

        // Check if review already exists for this deal
        const { data: existingReview } = await db
            .from('reviews')
            .select('id')
            .eq('deal_id', deal_id)
            .eq('reviewer_type', reviewer_type)
            .single()

        if (existingReview) {
            return res.status(409).json({ error: 'Review already exists for this deal' })
        }

        const { data, error } = await db
            .from('reviews')
            .insert([{
                deal_id,
                reviewer_id,
                reviewer_name,
                reviewer_type,
                rating,
                comment: comment || null
            }])
            .select()
            .single()

        if (error) throw error

        res.status(201).json(data)
    } catch (error) {
        console.error('Error creating review:', error)
        res.status(500).json({ error: 'Failed to create review' })
    }
})

// Get review for a specific deal
router.get('/deal/:dealId', async (req: Request, res: Response) => {
    try {
        const { dealId } = req.params

        const { data, error } = await db
            .from('reviews')
            .select('*')
            .eq('deal_id', dealId)

        if (error) throw error

        res.json(data || [])
    } catch (error) {
        console.error('Error fetching deal reviews:', error)
        res.status(500).json({ error: 'Failed to fetch deal reviews' })
    }
})

// Update a review
router.put('/:reviewId', async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params
        const { rating, comment } = req.body

        const { data, error } = await db
            .from('reviews')
            .update({
                rating: rating !== undefined ? rating : undefined,
                comment: comment !== undefined ? comment : undefined
            })
            .eq('id', reviewId)
            .select()
            .single()

        if (error) throw error

        res.json(data)
    } catch (error) {
        console.error('Error updating review:', error)
        res.status(500).json({ error: 'Failed to update review' })
    }
})

// Delete a review (admin only)
router.delete('/:reviewId', async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params

        const { error } = await db
            .from('reviews')
            .delete()
            .eq('id', reviewId)

        if (error) throw error

        res.status(204).send()
    } catch (error) {
        console.error('Error deleting review:', error)
        res.status(500).json({ error: 'Failed to delete review' })
    }
})

export default router