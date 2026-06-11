'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { authService } from '@/services/authService'
import { authCookies } from '@/lib/cookies'
import { User } from '@/types/auth'

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initUser = async () => {
      const token = authCookies.getToken()

      if (token) {
        try {
          const response = await authService.getUser()
          if (response.success) {
            setUser(response.data)
          }
        } catch {
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}