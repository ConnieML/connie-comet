import React from 'react'
import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'dark' | 'light'
}

interface PayloadLogoProps {
  className?: string
}

// ThreadConnect wordmark, intrinsic 358x116 (aspect ~3.09:1).
// variant 'dark' = dark-teal mark for light backgrounds; 'light' = white mark for dark backgrounds.
export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, variant = 'dark' } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logoSrc =
    variant === 'light' ? '/threadconnect-logo-white.svg' : '/threadconnect-logo-darkteal.svg'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="ThreadConnect"
      width={179}
      height={58}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={cn('h-[58px] w-auto max-w-full', className)}
      src={logoSrc}
    />
  )
}

export const PayloadLogo: React.FC<PayloadLogoProps> = (props) => {
  const { className } = props

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="ThreadConnect"
      width={154}
      height={50}
      className={cn('h-[50px] w-auto max-w-full', className)}
      src="/threadconnect-logo-darkteal.svg"
    />
  )
}
