import React from 'react'
import { MessageSquare } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LiveChatCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-slate-600" />
          <CardTitle>Chat with Us</CardTitle>
        </div>
        <CardDescription>
          Talk to our team in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          <span className="text-sm text-slate-600">Currently unavailable</span>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Our chat is currently offline. Please use the contact form or schedule a call.
        </p>
        <Button variant="outline" disabled className="w-full">
          Start Chat (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  )
}
