import { getPayload } from 'payload'
import config from '../src/payload.config'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

async function createAdmin() {
  console.log('Starting Payload...')
  console.log('Database URI:', process.env.DATABASE_URI?.substring(0, 20) + '...')
  const payload = await getPayload({ config })

  try {
    console.log('Creating admin user...')

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@connie.direct',
        },
      },
    })

    if (existingUser.docs.length > 0) {
      console.log('User admin@connie.direct already exists. Updating password...')
      await payload.update({
        collection: 'users',
        id: existingUser.docs[0].id,
        data: {
          password: 'TempPassword123!',
        },
      })
      console.log('✅ Password updated successfully!')
    } else {
      console.log('Creating new admin user...')
      await payload.create({
        collection: 'users',
        data: {
          name: 'Admin',
          email: 'admin@connie.direct',
          password: 'TempPassword123!',
          dataroomRole: 'admin',
        },
      })
      console.log('✅ Admin user created successfully!')
    }

    console.log('\n📧 Email: admin@connie.direct')
    console.log('🔑 Password: TempPassword123!')
    console.log('\n⚠️  Please change this password after logging in!\n')

  } catch (error) {
    console.error('Error:', error)
  } finally {
    process.exit(0)
  }
}

createAdmin()
