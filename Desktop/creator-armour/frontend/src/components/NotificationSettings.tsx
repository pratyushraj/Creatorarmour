import { useState } from 'react'
import { Bell, Mail, Smartphone, AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { Card, CardHeader, CardTitle, CardDescription } from './Card'
import type { NotificationPreferences } from '../types'

interface NotificationSettingsProps {
    preferences?: Partial<NotificationPreferences>
    onSave?: (preferences: NotificationPreferences) => void
}

const defaultPreferences: NotificationPreferences = {
    user_id: '',
    email_new_offer: true,
    email_deal_update: true,
    email_payment: true,
    email_marketing: false,
    push_new_offer: true,
    push_deal_update: true,
    push_payment: true
}

interface ToggleOption {
    id: keyof NotificationPreferences
    label: string
    description: string
    icon: 'email' | 'push'
}

const emailOptions: ToggleOption[] = [
    {
        id: 'email_new_offer',
        label: 'New Offers',
        description: 'Get notified when a brand sends you an offer',
        icon: 'email'
    },
    {
        id: 'email_deal_update',
        label: 'Deal Updates',
        description: 'Notifications about deal status changes',
        icon: 'email'
    },
    {
        id: 'email_payment',
        label: 'Payment Alerts',
        description: 'Important payment confirmations and reminders',
        icon: 'email'
    },
    {
        id: 'email_marketing',
        label: 'Tips & Updates',
        description: 'Platform updates and collaboration tips',
        icon: 'email'
    }
]

const pushOptions: ToggleOption[] = [
    {
        id: 'push_new_offer',
        label: 'New Offers',
        description: 'Instant notifications for new offers',
        icon: 'push'
    },
    {
        id: 'push_deal_update',
        label: 'Deal Updates',
        description: 'Push notifications for deal changes',
        icon: 'push'
    },
    {
        id: 'push_payment',
        label: 'Payment Alerts',
        description: 'Urgent payment notifications',
        icon: 'push'
    }
]

export function NotificationSettings({ preferences, onSave }: NotificationSettingsProps) {
    const [settings, setSettings] = useState<NotificationPreferences>({
        ...defaultPreferences,
        ...preferences
    })
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const toggleSetting = (id: keyof NotificationPreferences) => {
        setSettings(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
        setSaved(false)
    }

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        if (onSave) {
            onSave(settings)
        }
        setIsSaving(false)
        setSaved(true)
        
        // Clear success message after 3 seconds
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="space-y-6">
            {/* Email Notifications */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                                Receive important updates via email
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <div className="space-y-4 mt-4">
                    {emailOptions.map(option => (
                        <div key={option.id} className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{option.label}</h4>
                                <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                            <button
                                onClick={() => toggleSetting(option.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                                    settings[option.id] ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings[option.id] ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Push Notifications */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>
                                Get instant alerts on your device
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <div className="space-y-4 mt-4">
                    {pushOptions.map(option => (
                        <div key={option.id} className="flex items-center justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{option.label}</h4>
                                <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                            <button
                                onClick={() => toggleSetting(option.id)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                                    settings[option.id] ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings[option.id] ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Save Button */}
            <div className="flex items-center justify-between">
                <Button 
                    onClick={handleSave} 
                    isLoading={isSaving}
                    disabled={isSaving}
                >
                    <Bell className="w-4 h-4 mr-2" />
                    Save Preferences
                </Button>
                {saved && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Settings saved successfully!
                    </div>
                )}
            </div>
        </div>
    )
}