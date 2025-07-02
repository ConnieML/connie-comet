import type { User } from '../payload-types'

export interface DataroomUser extends User {
  dataroomRole?: 'public' | 'investor' | 'board' | 'admin'
}

export function checkDataroomAccess(user: DataroomUser | null, requiredLevel: string): boolean {
  // If no user, only allow public access
  if (!user) {
    return requiredLevel === 'public'
  }

  const userRole = user.dataroomRole || 'public'

  // Access hierarchy (higher levels include lower levels)
  const accessLevels = {
    public: 0,
    investor: 1,
    board: 2,
    admin: 3,
  }

  const userLevel = accessLevels[userRole] ?? 0
  const documentLevel = accessLevels[requiredLevel as keyof typeof accessLevels] ?? 0

  return userLevel >= documentLevel
}

export function getAccessibleCategories(user: DataroomUser | null): string[] {
  if (!user) {
    return ['public']
  }

  const userRole = user.dataroomRole || 'public'

  switch (userRole) {
    case 'admin':
      return ['public', 'investor', 'board', 'restricted']
    case 'board':
      return ['public', 'investor', 'board']
    case 'investor':
      return ['public', 'investor']
    default:
      return ['public']
  }
}

export function getUserAccessLabel(user: DataroomUser | null): string {
  if (!user) return 'Public Access'
  
  const role = user.dataroomRole || 'public'
  
  switch (role) {
    case 'admin':
      return 'Administrator Access'
    case 'board':
      return 'Board Member Access'
    case 'investor':
      return 'Investor Access'
    default:
      return 'Public Access'
  }
}