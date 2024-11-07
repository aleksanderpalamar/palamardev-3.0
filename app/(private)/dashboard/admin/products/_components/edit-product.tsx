"use client";

import { editProductAction } from "@/app/actions/editProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader, Pencil, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export interface ProductProps {
  id: string
  title: string
  description: string
  imageUrl: string
  price: number
}

interface EditProductButtonProps {
  product: ProductProps
}

export default function EditProductButton({ product }: EditProductButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleEdit = async () => {
    setIsEditing(true)
    try {
      const result = await editProductAction(
        editedProduct.id,
        editedProduct.title,
        editedProduct.description,
        editedProduct.imageUrl,
        editedProduct.price
      )
      if (result.success) {
        alert('Product edited successfully.')
        router.refresh()
      } else {
        alert('Failed to edit product. Please try again.')
      }
    } catch (error) {
      console.error('Error editing product:', error)
      alert('An error occurred while editing the product.')
    } finally {
      setIsEditing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="font-medium text-violet-600 hover:text-violet-500 disabled:opacity-50">
          <div className="flex justify-center bg-rose-100/10 hover:bg-rose-100/20 cursor-pointer rounded-md px-2 py-1">
            <Pencil className="w-6 h-6" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-w-6xl max-w-[425px] bg-zinc-900 border-none">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={editedProduct.title}
              onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="col-span-3 resize-none h-32 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="imageUrl" className="text-right">
              Image URL
            </label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={editedProduct.imageUrl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="price" className="text-right">
              Price
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
              className="col-span-3 border-zinc-800 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>
          <Button
            onClick={handleEdit}
            className="w-min mt-4 bg-violet-600 hover:bg-violet-500 rounded-md"
            disabled={isEditing}
          >
            {isEditing ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}