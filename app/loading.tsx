'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

export default function Loading() {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/loading.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [])

  if (!animationData) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <div className="font-mono text-[#00ff00] text-sm">
          <span className="animate-pulse">Loading terminal...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-64 h-64">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        </div>
        <div className="font-mono text-[#00ff00] text-sm">
          <span className="animate-pulse">Loading terminal...</span>
        </div>
      </div>
    </div>
  )
}

