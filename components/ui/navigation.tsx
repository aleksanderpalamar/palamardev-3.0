'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Logo } from './logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Store', path: '/store' },
    { name: 'Contact', path: '/contact' },
  ]

  if (session) {
    navItems.push({ name: 'Dashboard', path: '/dashboard' })
  }

  return (
    <nav className="bg-zinc-950 text-zinc-50 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <Logo />
            <span>Aleksander Palamar</span>
          </Link>
          <div className="hidden md:block">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`ml-4 hover:text-zinc-400 ${pathname === item.path ? 'text-violet-500' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => {
                  signOut()
                  setIsOpen(false)
                }}
                className={`ml-4 bg-violet-500 px-3 py-1 rounded hover:bg-violet-600 text-zinc-900 ${pathname === '/login' ? 'bg-violet-500 px-3 py-1 rounded hover:bg-violet-600 text-zinc-900' : ''
                  }`}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`ml-4 bg-violet-500 px-3 py-1 rounded hover:bg-violet-600 text-zinc-900 ${pathname === '/login' ? 'bg-violet-500 px-3 py-1 rounded hover:bg-violet-600 text-zinc-900' : ''
                  }`}
              >
                Login
              </Link>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 hover:bg-zinc-900 ${pathname === item.path ? 'bg-zinc-900' : ''
                }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {session ? (
            <button
              onClick={() => {
                signOut()
                setIsOpen(false)
              }}
              className={`block px-4 py-2 ${pathname === '/login' ? 'bg-zinc-900' : ''}`}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`block px-4 py-2 ${pathname === '/login' ? 'bg-zinc-900' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navigation