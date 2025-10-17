"use client"

import { useTheme } from '@/lib/ThemeContext'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

export default function ChangeTheme() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed 
        bottom-6 
        right-6 
        z-50
        p-3
        rounded-full
        border
        border-border-secondary
        transition-all
        duration-300
        ease-in-out
        hover:scale-110
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-background
        focus:ring-border
        group
      "
      style={{
        backgroundColor: 'var(--background-secondary)',
        color: 'var(--foreground)',
        borderColor: 'var(--border-secondary)'
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <IoSunnyOutline
          size={24}
          className="
            transition-all 
            duration-300 
            ease-in-out 
            group-hover:rotate-90 
            group-hover:text-yellow-400
          "
        />
      ) : (
        <IoMoonOutline
          size={24}
          className="
            transition-all 
            duration-300 
            ease-in-out 
            group-hover:rotate-12 
            group-hover:text-blue-400
          "
        />
      )}
    </button>
  )
}