import React from 'react'
import { Calendar } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ScheduleCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-slate-600" />
          <CardTitle>Book a Time</CardTitle>
        </div>
        <CardDescription>
          Schedule a 30-minute discovery call with our team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-4">
          Let&apos;s discuss how Connie can help your nonprofit transform communications.
        </p>
        <Button variant="outline" disabled className="w-full">
          View Available Times (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  )
}
