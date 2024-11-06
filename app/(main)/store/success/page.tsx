'use client'

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "sonner"

interface SessionResponse {
  isValid: boolean
  session: {
    payment_status: string
    customer_email: string
  }
  message?: string
}

function SuccessContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [sessionData, setSessionData] = useState<SessionResponse | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setSessionData({ isValid: false, message: 'No Session ID provided' } as SessionResponse)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        const data = await response.json()

        setSessionData(data)
      } catch (error) {
        console.error('Failed to verify session:', error)
        setSessionData({ isValid: false, message: 'Failed to verify session' } as SessionResponse)
      } finally {
        setIsLoading(false)
      }
    }

    verifySession()
  }, [searchParams])

  const downloadTemplate = async () => {
    if (!sessionData?.session?.customer_email) {
      console.error('No email found in session data', sessionData)
      toast.error('Email not found. Please try again later.')
      return
    }

    setIsDownloading(true)
    try {
      const response = await fetch('/api/download-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: sessionData.session.customer_email }),
      })

      if (!response.ok) {
        throw new Error('Failed to download template')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'template.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success('Download iniciado com sucesso!')
    } catch (error) {
      console.error('Error downloading template:', error)
      toast.error('Failed to download template. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

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
        <h1 className="text-4xl font-bold">Sessão inválida</h1>
        <p className="text-lg text-zinc-50">
          {sessionData?.message || 'Por favor, tente novamente.'}
        </p>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-zinc-50 px-4 py-2 rounded-lg w-fit">
          <Link href="/store">Voltar para a loja</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
      {sessionData.session?.customer_email && (
        <p className="mb-4 text-zinc-50">
          Um email de confirmação foi enviado para: {sessionData.session.customer_email}
        </p>
      )}
      <p className="mb-8">Obrigado por sua compra. Seu template está pronto para download.</p>
      <Button 
        onClick={downloadTemplate} 
        disabled={isDownloading}
        className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-700/50"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Downloading...
          </>
        ) : (
          'Download template'
        )}
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
      <h1 className="text-3xl font-bold mb-4">Algo deu errado</h1>
      <p className="mb-8 text-zinc-50">Desculpe, ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
      <Button onClick={resetErrorBoundary}>
        Tentar novamente
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