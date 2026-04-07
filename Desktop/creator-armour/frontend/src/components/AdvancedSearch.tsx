import { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { Input } from './Input'
import { Search, Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cn } from '../lib/utils'

interface FilterOption {
    id: string
    label: string
    options: string[]
}

interface AdvancedSearchProps {
    placeholder?: string
    filters?: FilterOption[]
    onSearch?: (query: string, filters: Record<string, string[]>) => void
    showFilters?: boolean
}

const defaultFilters: FilterOption[] = [
    {
        id: 'niche',
        label: 'Niche',
        options: ['Lifestyle', 'Beauty', 'Fashion', 'Tech', 'Travel', 'Fitness', 'Food', 'Gaming']
    },
    {
        id: 'audience',
        label: 'Audience Size',
        options: ['< 10K', '10K-50K', '50K-100K', '100K-500K', '500K+']
    },
    {
        id: 'engagement',
        label: 'Engagement Rate',
        options: ['< 2%', '2-4%', '4-6%', '6%+']
    },
    {
        id: 'budget',
        label: 'Budget Range',
        options: ['< ₹5K', '₹5K-₹15K', '₹15K-₹30K', '₹30K+']
    }
]

export function AdvancedSearch({
    placeholder = 'Search creators...',
    filters = defaultFilters,
    onSearch,
    showFilters = true
}: AdvancedSearchProps) {
    const [query, setQuery] = useState('')
    const [showFilterPanel, setShowFilterPanel] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
    const [activeFilterCount, setActiveFilterCount] = useState(0)

    const handleFilterToggle = (filterId: string, option: string) => {
        setSelectedFilters(prev => {
            const current = prev[filterId] || []
            const exists = current.includes(option)
            const updated = exists
                ? current.filter(item => item !== option)
                : [...current, option]

            const newFilters = { ...prev, [filterId]: updated }

            // Update active filter count
            const count = Object.values(newFilters).reduce((sum, arr) => sum + arr.length, 0)
            setActiveFilterCount(count)

            return newFilters
        })
    }

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query, selectedFilters)
        }
    }

    const clearAllFilters = () => {
        setSelectedFilters({})
        setActiveFilterCount(0)
        setQuery('')
    }

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <Button onClick={handleSearch} size="lg">
                    Search
                </Button>
                {showFilters && (
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => setShowFilterPanel(!showFilterPanel)}
                        className="relative"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        {activeFilterCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>
                )}
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {Object.entries(selectedFilters)
                        .filter(([_, values]) => values.length > 0)
                        .map(([filterId, values]) =>
                            values.map(value => (
                                <span
                                    key={`${filterId}-${value}`}
                                    className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                                >
                                    {value}
                                    <button
                                        onClick={() => handleFilterToggle(filterId, value)}
                                        className="hover:text-primary-900"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))
                        )}
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Filter Panel */}
            {showFilterPanel && showFilterPanel && (
                <Card className="border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filters
                        </h3>
                        {activeFilterCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                Clear all
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filters.map(filter => (
                            <div key={filter.id}>
                                <h4 className="font-medium text-gray-900 mb-3">{filter.label}</h4>
                                <div className="space-y-2">
                                    {filter.options.map(option => (
                                        <label
                                            key={option}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={(selectedFilters[filter.id] || []).includes(option)}
                                                onChange={() => handleFilterToggle(filter.id, option)}
                                                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-600">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                        <Button onClick={handleSearch}>
                            Apply Filters
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    )
}