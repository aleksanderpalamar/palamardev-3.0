'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return (
    <div className="py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-light-violet-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-zinc-950">
                Welcome to your Dashboard, {session?.user?.name}
              </h1>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>What would you like to do?</p>
                <ul className="list-disc space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/about/new" className="text-violet-600 hover:text-violet-700">
                        Add About
                      </Link>
                    </p>
                  </li>
                </ul>
                <div className="border-b border-gray-200 p-1" />
                <ul className="list-disc space-y-2">
                <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/products/new"
                        className="text-violet-600 hover:text-violet-700">
                        Create a new product
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/projects/new"
                        className="text-violet-600 hover:text-violet-700">
                        Create a new project
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/blog/new"
                        className="text-violet-600 hover:text-violet-700">
                        Create a new blog post
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/products/list"
                        className="text-violet-600 hover:text-violet-700">
                        List all products
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/projects/list"
                        className="text-violet-600 hover:text-violet-700">
                        List all projects
                      </Link>
                    </p>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-5 w-5 text-violet-50 bg-violet-600 rounded-full" />
                    <p className="ml-2">
                      <Link href="/dashboard/admin/blog/list"
                        className="text-violet-600 hover:text-violet-700">
                        List all blog posts
                      </Link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}