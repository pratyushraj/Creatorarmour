import { Router, Request, Response } from 'express'
import db from '../db.js'

const router = Router()

// Get notification preferences for a user
router.get('/preferences/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const { data, error } = await db
            .from('notification_preferences')
            .select('*')
            .eq('user_id', userId)
            .single()

        if (error && error.code !== 'PGRST116') throw error // PGRST116 = not found

        // Return defaults if not set
        res.json(data || {
            user_id: userId,
            email_new_offer: true,
            email_deal_update: true,
            email_payment: true,
            email_marketing: false,
            push_new_offer: true,
            push_deal_update: true,
            push_payment: true
        })
    } catch (error) {
        console.error('Error fetching notification preferences:', error)
        res.status(500).json({ error: 'Failed to fetch notification preferences' })
    }
})

// Update notification preferences
router.put('/preferences', async (req: Request, res: Response) => {
    try {
        const {
            user_id,
            email_new_offer,
            email_deal_update,
            email_payment,
            email_marketing,
            push_new_offer,
            push_deal_update,
            push_payment
        } = req.body

        // Check if preferences exist
        const { data: existing } = await db
            .from('notification_preferences')
            .select('id')
            .eq('user_id', user_id)
            .single()

        let data, error

        if (existing) {
            // Update existing
            const result = await db
                .from('notification_preferences')
                .update({
                    email_new_offer,
                    email_deal_update,
                    email_payment,
                    email_marketing,
                    push_new_offer,
                    push_deal_update,
                    push_payment,
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', user_id)
                .select()
                .single()

            data = result.data
            error = result.error
        } else {
            // Create new
            const result = await db
                .from('notification_preferences')
                .insert([{
                    user_id,
                    email_new_offer,
                    email_deal_update,
                    email_payment,
                    email_marketing,
                    push_new_offer,
                    push_deal_update,
                    push_payment
                }])
                .select()
                .single()

            data = result.data
            error = result.error
        }

        if (error) throw error

        res.json(data)
    } catch (error) {
        console.error('Error updating notification preferences:', error)
        res.status(500).json({ error: 'Failed to update notification preferences' })
    }
})

// Get notifications for a user
router.get('/', async (req: Request, res: Response) => {
    try {
        const { userId, unread = false, limit = 20, offset = 0 } = req.query

        let query = db
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .range(Number(offset), Number(offset) + Number(limit) - 1)

        if (unread) {
            query = query.eq('read', false)
        }

        const { data, error } = await query

        if (error) throw error

        res.json(data || [])
    } catch (error) {
        console.error('Error fetching notifications:', error)
        res.status(500).json({ error: 'Failed to fetch notifications' })
    }
})

// Mark notification as read
router.put('/:notificationId/read', async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params

        const { data, error } = await db
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId)
            .select()
            .single()

        if (error) throw error

        res.json(data)
    } catch (error) {
        console.error('Error marking notification as read:', error)
        res.status(500).json({ error: 'Failed to mark notification as read' })
    }
})

// Mark all notifications as read for a user
router.put('/read-all', async (req: Request, res: Response) => {
    try {
        const { userId } = req.body

        const { error } = await db
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId)
            .eq('read', false)

        if (error) throw error

        res.json({ success: true })
    } catch (error) {
        console.error('Error marking all notifications as read:', error)
        res.status(500).json({ error: 'Failed to mark notifications as read' })
    }
})

// Create a notification (internal use)
router.post('/create', async (req: Request, res: Response) => {
    try {
        const { user_id, title, message, type, deal_id } = req.body

        const { data, error } = await db
            .from('notifications')
            .insert([{
                user_id,
                title,
                message,
                type,
                deal_id: deal_id || null,
                read: false
            }])
            .select()
            .single()

        if (error) throw error

        res.status(201).json(data)
    } catch (error) {
        console.error('Error creating notification:', error)
        res.status(500).json({ error: 'Failed to create notification' })
    }
})

// Delete a notification
router.delete('/:notificationId', async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params

        const { error } = await db
            .from('notifications')
            .delete()
            .eq('id', notificationId)

        if (error) throw error

        res.status(204).send()
    } catch (error) {
        console.error('Error deleting notification:', error)
        res.status(500).json({ error: 'Failed to delete notification' })
    }
})

// Get unread notification count
router.get('/unread-count/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const { count, error } = await db
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('read', false)

        if (error) throw error

        res.json({ count: count || 0 })
    } catch (error) {
        console.error('Error fetching unread count:', error)
        res.status(500).json({ error: 'Failed to fetch unread count' })
    }
})

export default router