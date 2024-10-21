import { ContactForm } from "@/components/contact-form";

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="text-lg text-zinc-50">Tem alguma ideia para o projeto, sinta-se a vontade para me contatar.</p>
      </div>
      <ContactForm />
    </div>
  )
}