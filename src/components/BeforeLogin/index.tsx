import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <p>
        <b>Welcome to Connie Admin!</b>
      </p>
      <a
        href="/api/auth/okta"
        style={{
          backgroundColor: '#007dc1',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px',
          display: 'inline-block'
        }}
      >
        Login with Okta SSO
      </a>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Use your Okta credentials to access the admin panel
      </p>
    </div>
  )
}

export default BeforeLogin
