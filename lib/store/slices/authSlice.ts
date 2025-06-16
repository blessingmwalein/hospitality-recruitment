import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: any | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  isAdmin: false,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.isAdmin = user.role === "admin"

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isAdmin = false

      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token")
        const userStr = localStorage.getItem("user")

        if (token && userStr) {
          try {
            const user = JSON.parse(userStr)
            state.user = user
            state.token = token
            state.isAuthenticated = true
            state.isAdmin = user.role === "admin"
          } catch (error) {
            // Clear invalid data
            localStorage.removeItem("token")
            localStorage.removeItem("user")
          }
        }
      }
    },
  },
})

export const { setCredentials, logout, setLoading, initializeAuth } = authSlice.actions

export default authSlice.reducer

// Mock authentication functions
export const mockLogin = async (credentials: { email: string; password: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock user data
  const mockUser = {
    id: 1,
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    email: credentials.email,
    role: credentials.email.includes("admin") ? "admin" : "student",
    profileImage: null,
  }

  const mockToken = "mock-jwt-token-" + Date.now()

  return {
    user: mockUser,
    token: mockToken,
  }
}

export const mockRegister = async (userData: {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock user data
  const mockUser = {
    id: Date.now(),
    name: `${userData.firstName} ${userData.lastName}`,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    role: "student",
    profileImage: null,
  }

  const mockToken = "mock-jwt-token-" + Date.now()

  return {
    user: mockUser,
    token: mockToken,
  }
}
