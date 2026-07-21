'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
  deleteAccount: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize user from localStorage on client
  useEffect(() => {
    const storedUser = localStorage.getItem('balaji_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('balaji_user')
  }

  const deleteAccount = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null)
        localStorage.removeItem('balaji_user')
        resolve(void 0)
      }, 1000)
    })
  }

  const value = { user, isLoading, logout, deleteAccount, setUser }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
