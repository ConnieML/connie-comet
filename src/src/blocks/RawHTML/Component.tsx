import React from 'react'

type RawHTMLBlockProps = {
  html: string
  wrapperClass?: string
}

export const RawHTMLBlock: React.FC<RawHTMLBlockProps> = ({ html, wrapperClass }) => {
  if (!html) return null

  return (
    <div 
      className={wrapperClass || ''}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}