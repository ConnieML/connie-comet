import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'dark' | 'light'
}

interface PayloadLogoProps {
  className?: string
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, variant = 'dark' } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  const logoSrc = variant === 'light' ? '/connie-logo_v1-white.svg' : '/connie-logo_v1-black.svg'

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
      src={logoSrc}
    />
  )
}

export const PayloadLogo: React.FC<PayloadLogoProps> = (props) => {
  const { className } = props

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Connie Logo"
      width={150}
      height={40}
      className={clsx('max-w-[150px] w-full h-[40px]', className)}
      src="/connie-logo-black.svg"
    />
  )
}
