import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

interface StarRatingProps {
    rating: number
    maxRating?: number
    size?: 'sm' | 'md' | 'lg'
    interactive?: boolean
    onChange?: (rating: number) => void
}

export function StarRating({ 
    rating, 
    maxRating = 5, 
    size = 'md', 
    interactive = false,
    onChange 
}: StarRatingProps) {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    }

    const handleClick = (index: number) => {
        if (interactive && onChange) {
            onChange(index + 1)
        }
    }

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, index) => (
                <Star
                    key={index}
                    className={cn(
                        sizeClasses[size],
                        'transition-colors',
                        index < rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300',
                        interactive && 'cursor-pointer hover:text-yellow-400 hover:fill-yellow-400'
                    )}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    )
}