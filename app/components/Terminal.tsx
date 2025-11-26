'use client'

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface OutputLine {
  type: 'command' | 'result'
  content: string
  prompt?: string
}

interface Skill {
  name: string
  percent: number
  explanation: string
}

export default function Terminal() {
  // Initialize with default content immediately for better Speed Index
  // Use useLayoutEffect to prevent layout shift by syncing state before paint
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767
    }
    return false
  })
  const [output, setOutput] = useState<OutputLine[]>(() => {
    // Initialize with default hint immediately based on initial screen size
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 767
        ? [{ type: 'result', content: "hint : type 'help'" }]
        : [{ type: 'result', content: 'hint : slp --help' }]
    }
    return [{ type: 'result', content: 'hint : slp --help' }]
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)

  // Use useLayoutEffect to sync state before paint to prevent CLS
  useLayoutEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true
    
    const checkMobile = () => {
      const mobile = window.innerWidth <= 767
      setIsMobile(mobile)
      // Only update output if it actually changed to prevent unnecessary re-renders
      setOutput((prev) => {
        const expectedContent = mobile ? "hint : type 'help'" : 'hint : slp --help'
        if (prev.length === 1 && prev[0].content === expectedContent) {
          return prev
        }
        return [{ type: 'result', content: expectedContent }]
      })
    }
    checkMobile()
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 767
      setIsMobile(mobile)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (workspaceRef.current) {
      // Use requestAnimationFrame for smoother scrolling and less layout shift
      requestAnimationFrame(() => {
        workspaceRef.current?.scrollTo({
          top: workspaceRef.current.scrollHeight,
          behavior: 'smooth',
        })
      })
    }
  }, [output])


  const getCurrentPrompt = () => {
    if (isMobile) {
      return `> %`
    } else {
      return `abbasslp@SLP-MacBook-Pro %`
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand()
    }
  }

  const executeCommand = () => {
    if (!inputRef.current) return

    const command = inputRef.current.value
    const prompt = getCurrentPrompt()

    if (command.toLowerCase() === 'clear') {
      setOutput([])
      inputRef.current.value = ''
      return
    }

    setOutput((prev: OutputLine[]) => [
      ...prev,
      {
        type: 'command',
        content: command,
        prompt,
      },
    ])

    const result = processCommand(command)
    if (result !== null && result !== '') {
      setOutput((prev: OutputLine[]) => [
        ...prev,
        {
          type: 'result',
          content: result,
        },
      ])
    }

    inputRef.current.value = ''
  }

  const processCommand = (command: string): string | null => {
    let normalizedCommand = command.trim().toLowerCase()
    normalizedCommand = normalizedCommand.replace(/—/g, '--')

    if (normalizedCommand.startsWith('--') || normalizedCommand.startsWith('-')) {
      switch (normalizedCommand) {
        case '--help':
        case '--contact':
        case '--skills':
        case '--about':
          return processBasicCommand(normalizedCommand.substring(2))
      }
    }

    return processBasicCommand(normalizedCommand)
  }

  const processBasicCommand = (cmd: string): string | null => {
    const parsedCommand = parseCommand(cmd)

    switch (parsedCommand[0]) {
      case 'slp --help':
        return `VERSION</br>&nbsp;@SLP/2.3.0 darwin-arm64 node-v18.16.0</br>COMMANDS
            </br>&nbsp;--about&nbsp;&nbsp;&nbsp;&nbsp;To display about me
            </br>&nbsp;--contact&nbsp;&nbsp;&nbsp;To display my contact info
            </br>&nbsp;--skills&nbsp;&nbsp;&nbsp;&nbsp;To display my skills in-detail
            </br>&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To clear all the commands`
      case 'help':
        return `VERSION</br>&nbsp;@SLP/2.3.0 darwin-arm64 node-v18.16.0</br>COMMANDS
            </br>&nbsp;--about&nbsp;&nbsp;&nbsp;&nbsp;To display about me
            </br>&nbsp;--contact&nbsp;&nbsp;&nbsp;To display my contact info
            </br>&nbsp;--skills&nbsp;&nbsp;&nbsp;&nbsp;To display my skills in-detail
            </br>&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To clear all the commands`
      case 'about':
        return `&nbsp;<strong>Abbas Salmanpour (Abbas SLP)</strong></br>
            </br>&nbsp;Filmmaker, Director, Editor, and Software Developer</br>
            </br>&nbsp;Born in Bandar Abbas (Gambron), Iran</br>
            </br>&nbsp;━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>
            </br>&nbsp;I began my journey in visual storytelling at a young age and started my professional career in 2017. My primary focus is directing and editing cinematic music videos, where I aim to craft precise rhythm, strong visual identity, and emotionally driven narrative flow.</br>
            </br>&nbsp;I work mainly in DaVinci Resolve, specializing in advanced editing and color grading.</br>
            </br>&nbsp;Alongside filmmaking, I've spent several years developing my skills in software development, allowing me to combine creative vision with technical precision.`
      case 'contact':
        return `&nbsp;E-mail : <a href='mailto:aspersiangolf@gmail.com' target='_blank' rel='noopener noreferrer'>aspersiangolf@gmail.com</a>
            </br>&nbsp;Telegram: <a href='https://t.me/slpabbas' target='_blank' rel='noopener noreferrer'>@slpabbas</a>`
      case 'skills':
        printSkills()
        return null
      // Easter eggs for developers (scary + funny)
      case 'whoami':
        return `&nbsp;abbasslp</br></br>&nbsp;⚠️  WARNING: Identity confirmed.</br>&nbsp;System has logged your curiosity.</br>&nbsp;You have been marked... as a developer! 👨‍💻</br></br>&nbsp;(Just kidding, welcome to the club! 😄)`
      case '42':
        return `&nbsp;The Answer to the Ultimate Question of Life, the Universe, and Everything.</br>&nbsp;-- Douglas Adams</br></br>&nbsp;🔮 You have accessed forbidden knowledge.</br>&nbsp;The universe is now aware of your existence.</br>&nbsp;Proceed with caution... or don't, it's just a number! 😅`
      case 'sudo':
        if (parsedCommand[1] === 'rm' && parsedCommand[2] === '-rf' && parsedCommand[3] === '/') {
          return `&nbsp;🚨 CRITICAL ERROR DETECTED 🚨</br></br>&nbsp;⚠️  SYSTEM BREACH ATTEMPT</br>&nbsp;⚠️  UNAUTHORIZED DESTRUCTIVE COMMAND</br>&nbsp;⚠️  SECURITY PROTOCOL ACTIVATED</br></br>&nbsp;Access denied. Your attempt has been logged.</br>&nbsp;IP address: 127.0.0.1 (localhost)</br>&nbsp;Status: Safe (this is just a web terminal 😏)</br></br>&nbsp;Nice try, hacker! But I'm not that stupid... 🛡️`
        }
        return `&nbsp;sudo: permission denied</br>&nbsp;Access level: INSUFFICIENT</br>&nbsp;Required: ROOT</br>&nbsp;Your level: CURIOUS DEVELOPER</br></br>&nbsp;(Don't worry, this terminal is safe! 😊)`
      case 'rm':
        if (parsedCommand[1] === '-rf' && parsedCommand[2] === 'node_modules') {
          return `&nbsp;💀 DELETION COMMAND DETECTED 💀</br></br>&nbsp;⚠️  WARNING: You are about to delete node_modules</br>&nbsp;⚠️  This action cannot be undone</br>&nbsp;⚠️  All dependencies will be lost</br></br>&nbsp;Processing... Processing...</br></br>&nbsp;✅ Deletion complete! (Just kidding 😅)</br>&nbsp;This is a terminal emulator, not your actual system.</br>&nbsp;Your node_modules are safe... for now. 🎯</br></br>&nbsp;But seriously, we've all been there! 😂`
        }
        return `&nbsp;rm: cannot remove '${parsedCommand[1] || 'file'}': No such file or directory</br>&nbsp;Error code: 404</br>&nbsp;The file has escaped into the void... 🕳️`
      case 'hello':
        if (parsedCommand[1] === 'world') {
          return `&nbsp;Hello, World! 👋</br></br>&nbsp;🔊 SYSTEM MESSAGE:</br>&nbsp;You have initiated first contact.</br>&nbsp;The terminal is now aware of your presence.</br>&nbsp;Welcome, developer. Your journey begins... now! 🚀</br></br>&nbsp;(Classic first program! You're one of us! 😄)`
        }
        return `&nbsp;Hello! 👋</br>&nbsp;Type 'hello world' for a surprise... or a warning! 😈`
      case 'console.log':
      case 'console.log()':
        return `&nbsp;console.log("Hello, Developer! 👨‍💻");</br></br>&nbsp;⚠️  JavaScript execution detected!</br>&nbsp;⚠️  Console access granted</br>&nbsp;⚠️  Debug mode: ACTIVATED</br></br>&nbsp;You found the JavaScript easter egg!</br>&nbsp;This terminal is built with Next.js and React.</br>&nbsp;The code is watching... always watching! 👀</br></br>&nbsp;(Just kidding, it's just a portfolio site! 😅)`
      case '':
        return ''
      default:
        return `zsh: command not found: ${cmd}</br>Please type 'help' or '--help' to see a list of commands.`
    }
  }

  const parseCommand = (command: string): string[] => {
    return command.split(/ (?!--)/)
  }

  const printSkills = () => {
    const skills: Skill[] = [
      {
        name: 'Next.js',
        percent: 80,
        explanation: 'React framework for web development',
      },
      {
        name: 'Golang',
        percent: 45,
        explanation: 'Backend development',
      },
      {
        name: 'DaVinci Resolve',
        percent: 100,
        explanation: 'Professional video editing software',
      },
    ]

    skills.forEach((skill) => {
      let bar = '['

      for (let i = 0; i < skill.percent; i += 5) {
        bar += '='
      }

      bar += '>'

      for (let i = skill.percent + 5; i <= 100; i += 5) {
        bar += '&nbsp;'
      }

      bar += ']'

      const output = `<div Id="skills"><div>&nbsp;${skill.name} ${bar} ${skill.percent}</div><div>&nbsp; ${skill.explanation}</div></div>`

      setOutput((prev: OutputLine[]) => [
        ...prev,
        {
          type: 'result',
          content: output,
        },
      ])
    })
  }

  return (
    <div
      className={cn(
        'z-0 h-full w-full max-w-2xl rounded-xl border border-border bg-[#2d2d2d]',
        isMobile ? 'h-screen max-h-screen' : 'max-h-[600px]'
      )}
      onClick={handleClick}
      style={{ contain: 'layout style paint' }}
    >
      <div className="flex flex-col gap-y-2 border-b border-border p-4" style={{ minHeight: '60px' }}>
        <div className="flex flex-row gap-x-2">
          <div className="h-3 w-3 rounded-full bg-[#ff605c]"></div>
          <div className="h-3 w-3 rounded-full bg-[#ffbd44]"></div>
          <div className="h-3 w-3 rounded-full bg-[#00ca4e]"></div>
        </div>
      </div>
      <div
        className={cn(
          'overflow-y-auto p-4',
          isMobile ? 'h-[calc(100vh-80px)]' : 'max-h-[500px]'
        )}
        ref={workspaceRef}
        style={{ contain: 'layout style' }}
      >
        <div className="space-y-1" style={{ minHeight: '20px' }}>
          {output.map((line, index) => (
            <div key={index} style={{ minHeight: '18px' }}>
              {line.type === 'command' ? (
                <div className="flex items-center">
                  <span className="text-[#00ff00] font-mono text-sm">
                    {line.prompt}
                    <span className="text-white"> {line.content}</span>
                  </span>
                </div>
              ) : (
                <div
                  className="text-[#999] font-mono text-sm leading-[18px]"
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2" style={{ minHeight: '24px' }}>
          <label htmlFor="commandInput" className="sr-only">
            Terminal command input
          </label>
          <span className="text-[#00ff00] font-mono text-sm" id="prompt-div">
            {getCurrentPrompt()}
          </span>
          <input
            id="commandInput"
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm ml-2"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Terminal command input"
            aria-describedby="prompt-div"
          />
        </div>
      </div>
    </div>
  )
}
