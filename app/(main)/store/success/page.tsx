'use client'

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SuccessPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifySession = async () => {
      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setIsValid(false)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/verify-session?session_id=${sessionId}`)
        if (response.ok) {
          setIsValid(true)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Failed to verify session:', error)
        setIsValid(false)
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

  if (!isValid) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Invalid session</h1>
        <p className="text-lg text-zinc-50">Please try again</p>
        <Button asChild className="bg-violet-600 hover:bg-violet-700 text-zinc-50 px-4 py-2 rounded-lg w-fit">
          <Link href="/store">Go back</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Compra realizada com sucesso!</h1>
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