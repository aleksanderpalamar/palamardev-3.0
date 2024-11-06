import { getProducts } from "@/Functions/get-products"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 0

export default async function Store() {
  const products = await getProducts()
  return (
    <div className="max-w-6xl mx-auto md:space-y-8 space-y-6">
      <h1 className="text-4xl font-bold">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white overflow-hidden shadow-lg rounded-xl border border-zinc-800">
            {product.imageUrl && (
              <Image 
                width={400}
                height={200}
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4 overflow-hidden truncate">{product.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-emerald-600 font-semibold">
                  <span className="mr-2">
                    R$
                  </span>
                  <span className="text-2xl font-bold">{product.price}</span>
                  <span className="text-sm font-normal">,00</span>
                </p>
                <Link
                  href={`/store/${product.id}`}
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800 font-semibold"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}        
      </div>
    </div>
  )
}