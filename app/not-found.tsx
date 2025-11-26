'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Lottie from 'lottie-react'

export default function NotFound() {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/404-error.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null))
  }, [])

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-[#2d2d2d] rounded-xl border border-border overflow-hidden">
          {/* Terminal Header */}
          <div className="flex flex-col gap-y-2 border-b border-border p-4">
            <div className="flex flex-row gap-x-2">
              <div className="h-3 w-3 rounded-full bg-[#ff605c]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd44]"></div>
              <div className="h-3 w-3 rounded-full bg-[#00ca4e]"></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-4">
            <div className="font-mono text-sm">
              {animationData && (
                <div className="flex justify-center mb-4">
                  <div className="w-64 h-64">
                    <Lottie
                      animationData={animationData}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </div>
              )}
              
              <div className="text-[#00ff00] mb-2">
                <span>abbasslp@SLP-MacBook-Pro %</span>
                <span className="text-white"> cat 404.txt</span>
              </div>
              
              <div className="text-[#999]">
                <div className="text-[#999] mb-4 text-center">
                  The page you are looking for does not exist.
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="text-[#00ff00]">$ ls -la /</div>
                  <div className="text-[#999] pl-4">
                    <div>drwxr-xr-x  home</div>
                    <div>drwxr-xr-x  about</div>
                    <div>-rw-r--r--  <Link href="/" className="text-[#7800af] hover:text-[#6b229b] hover:bg-[rgba(0,163,163,0.631)] hover:rounded px-1">index</Link></div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[#00ff00]">$ cd /</div>
                  <div className="text-[#999] mt-2">
                    <Link 
                      href="/" 
                      className="text-[#7800af] hover:text-[#6b229b] hover:bg-[rgba(0,163,163,0.631)] hover:rounded px-1 underline"
                    >
                      Go back to home
                    </Link>
                  </div>
                </div>

                <div className="mt-8 text-xs text-[#666]">
                  <div>Type 'help' for available commands</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




