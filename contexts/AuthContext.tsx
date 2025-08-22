import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('portfolio_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('portfolio_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get stored users
      const users = JSON.parse(localStorage.getItem('portfolio_users') || '[]')
      const user = users.find((u: any) => u.email === email && u.password === password)
      
      if (user) {
        const userData = { id: user.id, username: user.username, email: user.email }
        setUser(userData)
        localStorage.setItem('portfolio_user', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get stored users
      const users = JSON.parse(localStorage.getItem('portfolio_users') || '[]')
      
      // Check if email already exists
      if (users.find((u: any) => u.email === email)) {
        return false
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password
      }

      users.push(newUser)
      localStorage.setItem('portfolio_users', JSON.stringify(users))

      // Auto-login after registration
      const userData = { id: newUser.id, username: newUser.username, email: newUser.email }
      setUser(userData)
      localStorage.setItem('portfolio_user', JSON.stringify(userData))
      
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('portfolio_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
