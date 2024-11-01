import { PayButton } from "@/components/pay-button"
import { getProductById } from "@/Functions/get-products"
import Image from "next/image"


export default async function Product({ params }: { params: { slug: string } }) {
  const product = await getProductById(params.slug)

  if (!product) {
    return <div className="text-zinc-50 flex items-center justify-center">Product not found</div>
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold">{product.title}</h1>
      {product.imageUrl && (
        <Image
          width={1000}
          height={1000}
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full overflow-hidden object-cover rounded-xl border border-zinc-900 shadow-2xl shadow-zinc-800"
          quality={100}
        />
      )}
      <p className="text-zinc-50 text-lg text-wrap overflow-hidden">{product.description}</p>
      <div className="flex items-center justify-between">
        <PayButton price={product.price} />
      </div>
    </div>
  )
}