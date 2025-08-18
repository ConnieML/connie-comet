import React from 'react'

interface Props {
  className?: string
}

export const Icon: React.FC<Props> = (props) => {
  const { className } = props

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Connie Icon"
      width={32}
      height={32}
      className={className}
      src="/connie-headset-icon-pink.ico"
    />
  )
}