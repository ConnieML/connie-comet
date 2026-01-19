'use client'
import React, { useState } from 'react'
import { useFormFields, FieldLabel } from '@payloadcms/ui'
import type { UIFieldClientProps } from 'payload'

import './index.scss'

export const S3UrlComponent: React.FC<UIFieldClientProps> = ({ field }) => {
  const [copied, setCopied] = useState(false)

  // Get the url field value from the form
  const url = useFormFields(([fields]) => fields.url?.value as string)

  const handleCopy = async () => {
    if (url) {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  if (!url) {
    return (
      <div className="field-type s3-url-field">
        <FieldLabel label={field.label || 'S3 URL'} />
        <div className="s3-url-empty">URL will appear after upload</div>
      </div>
    )
  }

  return (
    <div className="field-type s3-url-field">
      <FieldLabel label={field.label || 'S3 URL'} />
      <div className="s3-url-container">
        <input
          type="text"
          value={url}
          readOnly
          className="s3-url-input"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          type="button"
          onClick={handleCopy}
          className={`s3-url-copy-btn ${copied ? 's3-url-copy-btn--copied' : ''}`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
