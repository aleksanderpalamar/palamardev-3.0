"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Enviando...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        const { whatsappUrl } = await response.json()
        window.open(whatsappUrl, '_blank')
        setStatus('Mensagem enviada com sucesso!')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        const data = await response.json()
        setStatus(`Erro: ${data.error}`)
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      setStatus('Erro ao enviar a mensagem. Por favor, tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-50">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-50">
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
        />        
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-50">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 
            shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 
            focus:ring-opacity-50 resize-none"
        ></Textarea>
      </div>
      <Button
        type="submit"
        className="bg-violet-500 hover:bg-violet-600 text-zinc-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send Message
      </Button>
      {status && <div className="text-sm text-zinc-50">{status}</div>}
    </form>
  )
}