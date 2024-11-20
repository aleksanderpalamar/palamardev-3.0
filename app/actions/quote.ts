'use server'

import { z } from 'zod'

const QuoteSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  projectType: z.enum(['Website', 'E-commerce', 'App Mobile', 'Consultoria'], {
    errorMap: () => ({ message: 'Selecione um tipo de projeto válido' }),
  }),
  budget: z.enum(['< R$5k', 'R$5k - R$10k', 'R$10k - R$20k', '> R$20k'], {
    errorMap: () => ({ message: 'Selecione uma faixa de orçamento válida' }),
  }),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
})

export type State = {
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    projectType?: string[]
    budget?: string[]
    description?: string[]
  }
  message?: string | null
  whatsappLink?: string | null
}

export async function submitQuote(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = QuoteSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    projectType: formData.get('projectType'),
    budget: formData.get('budget'),
    description: formData.get('description'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: null,
      whatsappLink: null,
    }
  }

  const { name, email, phone, projectType, budget, description } = validatedFields.data

  const message = `Nova solicitação de orçamento:
    Nome: ${name}
    Email: ${email}
    Telefone: ${phone}
    Tipo de Projeto: ${projectType}
    Orçamento: ${budget}
    Descrição: ${description}`

  const whatsappNumber = '5541987938328'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return {
    errors: {},
    message: 'Solicitação de orçamento enviada com sucesso! Clique no botão abaixo para continuar no WhatsApp.',
    whatsappLink,
  }
}