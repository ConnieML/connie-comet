import React from 'react'
import { Phone } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CallUsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-slate-600" />
          <CardTitle>Give Us a Call</CardTitle>
        </div>
        <CardDescription>
          Speak directly with our team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <a
          href="tel:+18776064520"
          className="text-2xl font-semibold text-slate-800 hover:text-indigo-600 transition-colors block mb-4"
        >
          +1 (877) 606-4520
        </a>
        <p className="text-sm text-slate-600">
          Business hours vary by location
        </p>
      </CardContent>
    </Card>
  )
}
