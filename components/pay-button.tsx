"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import createCheckoutSession from "@/app/actions/create-checkout-session"

interface PayButtonProps {
  price: number
}

export const PayButton = ({ price }: PayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    setIsLoading(true)
    try {
      const checkoutUrl = await createCheckoutSession()
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Failed to create checkout session:', error)
      alert('Failed to create checkout session')      
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-32 h-10 bg-violet-600 hover:bg-violet-700"
    >
      {isLoading ? 'Loading...' : 'Buy $' + price}
    </Button>
  )
}