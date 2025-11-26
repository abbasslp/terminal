'use client'

import { useEffect, useState } from 'react'
import Terminal from '../components/Terminal'

export default function TestLoadingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return null // This will trigger the loading.tsx
  }

  return <Terminal />
}

