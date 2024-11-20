'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitQuote } from '@/app/actions/quote'
import type { State } from '@/app/actions/quote'
import { FaWhatsapp } from 'react-icons/fa'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const initialState: State = {
  errors: {},
  message: null,
  whatsappLink: null,
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitQuote, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await formAction(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input 
          id="name" 
          name="name" 
          required 
          className="mt-1 block w-full md:w-1/2 rounded-md bg-zinc-900 border-zinc-800 shadow-sm 
          focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
          {state.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" required className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50" />
          {state.errors?.phone && (
            <p className="text-sm text-red-500">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectType">Tipo de Projeto</Label>
          <div className="relative">
            <Select name="projectType" required aria-label="Selecione o tipo de projeto">
              <SelectTrigger className="mt-1 w-full rounded-md bg-zinc-900 border-zinc-800 focus:border-violet-500 focus:ring-opacity-50">
                <SelectValue
                  placeholder="Selecione o tipo de projeto"
                />
              </SelectTrigger>
              <SelectContent
                className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 text-zinc-50
              focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="App Mobile">App Mobile</SelectItem>
                <SelectItem value="Consultoria">Consultoria</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.errors?.projectType && (
            <p className="text-sm text-red-500">{state.errors.projectType[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Orçamento</Label>
          <div className="relative">
            <Select name="budget" required aria-label="Selecione a faixa de orçamento">
              <SelectTrigger className="mt-1 w-full rounded-md bg-zinc-900 border-zinc-800 focus:border-violet-500 focus:ring-opacity-50">
                <SelectValue
                  placeholder="Selecione a faixa de orçamento"
                />
              </SelectTrigger>
              <SelectContent
                className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 text-zinc-50
              focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50">
                <SelectItem value="< R$5k">Menos de R$5.000</SelectItem>
                <SelectItem value="R$5k - R$10k">R$5.000 - R$10.000</SelectItem>
                <SelectItem value="R$10k - R$20k">R$10.000 - R$20.000</SelectItem>
                <SelectItem value="> R$20k">Mais de R$20.000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {state.errors?.budget && (
            <p className="text-sm text-red-500">{state.errors.budget[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Projeto</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="mt-1 block w-full h-32 rounded-md bg-zinc-900 border-zinc-800 shadow-sm 
          focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50 resize-none"/>
        {state.errors?.description && (
          <p className="text-sm text-red-500">{state.errors.description[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? 'Enviando...' : 'Solicitar Orçamento'}
      </Button>

      {state.message && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-green-500">{state.message}</p>
          {state.whatsappLink && (
            <Button
              asChild
              className="w-fit bg-green-500 hover:bg-green-600"
            >
              <a
                href={state.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className='h-6 w-6 mr-2' />
                Continuar no WhatsApp
              </a>
            </Button>
          )}
        </div>
      )}
    </form>
  )
}