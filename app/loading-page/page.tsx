'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function LoadingPage() {
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
          <span className="animate-pulse">Loading animation...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-80 h-80 md:w-96 md:h-96">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        </div>
        <div className="font-mono text-[#00ff00] text-sm md:text-base">
          <span className="animate-pulse">Loading terminal...</span>
        </div>
      </div>
    </div>
  )
}

