'use client'

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface SessionResponse {
  isValid: boolean
  session?: {
    payment_status: string
    customer_email?: string
  }
  message?: string
}

function SuccessContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState<SessionResponse | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setSessionData({ isValid: false, message: 'No Session ID provided' })
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        const data: SessionResponse = await response.json()
        setSessionData(data)
      } catch (error) {
        console.error('Failed to verify session:', error)
        setSessionData({ isValid: false, message: 'Failed to verify session' })
      } finally {
        setIsLoading(false)
      }
    }

    verifySession()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!sessionData?.isValid) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Invalid session</h1>
        <p className="text-lg text-zinc-50">
          {sessionData?.message || 'Please try again.'}
        </p>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-zinc-50 px-4 py-2 rounded-lg w-fit">
          <Link href="/store">Go back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
      {sessionData.session?.customer_email && (
        <p className="mb-4 text-zinc-50">
          One email confirmation has been sent to {sessionData.session.customer_email}.
        </p>
      )}
      <p className="mb-8">Obrigado por sua compra. Seu template está pronto para download.</p>
      <Button asChild>
        <Link href="/download-template">
          Download template
        </Link>
      </Button>
      <div className="mt-4">
        <Link href="/store" className="text-violet-500 hover:underline">
          Voltar para a loja
        </Link>
      </div>
    </div>
  )
}

function ErrorFallback({ resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <p className="mb-8 text-zinc-50">Sorry, an unexpected error has occurred. Please try again later.</p>
      <Button onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loader2 className="w-6 h-6 animate-spin" />}>
        <SuccessContent />
      </Suspense>
    </ErrorBoundary>
  )
}