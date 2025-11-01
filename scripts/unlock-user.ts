import { getPayload } from 'payload'
import config from '../src/payload.config'

async function unlockUser() {
  console.log('Starting Payload...')
  const payload = await getPayload({ config })

  try {
    console.log('Finding user admin@connie.direct...')

    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@connie.direct',
        },
      },
    })

    if (users.docs.length === 0) {
      console.log('❌ User not found!')
      process.exit(1)
    }

    const user = users.docs[0]
    console.log(`Found user: ${user.email}`)

    // Reset login attempts and lockout
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        loginAttempts: 0,
        lockUntil: null,
      },
    })

    console.log('✅ Account unlocked successfully!')
    console.log('\nYou can now log in with:')
    console.log('📧 Email: admin@connie.direct')
    console.log('🔑 Password: TempPassword123!\n')

  } catch (error) {
    console.error('Error:', error)
  } finally {
    process.exit(0)
  }
}

unlockUser()
