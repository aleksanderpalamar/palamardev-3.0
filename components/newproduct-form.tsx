"use client";

import { Product } from "@/lib/interfaces";
import { ApiProductPostService } from "@/lib/services"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const NewProductForm = () => {
  const router = useRouter()
  const productPostService = new ApiProductPostService()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = { title, description, imageUrl, price }
    try {
      await productPostService.createProduct(product)
      router.push('/store')
    } catch (error) {
      console.error('Failed to create product:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-4xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-50">
            Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-50">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full resize-none h-32 rounded-md bg-zinc-900 border-zinc-800 shadow-sm 
            focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-50">
            Image Url
          </label>
          <Input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-zinc-50">
            Price
          </label>
          <Input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-32 rounded-md bg-zinc-900 border-zinc-800 shadow-sm focus:border-violet-500 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-zinc-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}