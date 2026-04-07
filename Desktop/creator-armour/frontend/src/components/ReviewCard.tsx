import { Card } from './Card'
import { StarRating } from './StarRating'
import { User, Calendar } from 'lucide-react'
import type { Review } from '../types'

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        })
    }

    return (
        <Card padding="md" className="border-white">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-900">{review.reviewer_name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full">
                                    {review.reviewer_type === 'brand' ? 'Brand' : 'Creator'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(review.created_at)}
                                </span>
                            </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                    </div>
                    {review.comment && (
                        <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                    )}
                </div>
            </div>
        </Card>
    )
}