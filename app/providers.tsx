"use client"

import type React from "react"
import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { store } from "@/lib/store/store"
import { ThemeProvider } from "@/components/theme-provider"
import { initializeAuth } from "@/lib/store/slices/authSlice"

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthInitializer>{children}</AuthInitializer>
      </ThemeProvider>
    </Provider>
  )
}
