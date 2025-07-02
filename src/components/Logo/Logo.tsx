import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

interface PayloadLogoProps {
  className?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Connie Logo"
      width={193}
      height={51}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[51px]', className)}
      src="/connie-logo_v1-white.svg"
    />
  )
}

export const PayloadLogo = (props: PayloadLogoProps) => {
  const { className } = props

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Connie Logo"
      width={193}
      height={51}
      className={clsx('max-w-[9.375rem] w-full h-[51px]', className)}
      src="/connie-logo_v1-white.svg"
    />
  )
}
