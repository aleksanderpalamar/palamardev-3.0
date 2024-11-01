import EditProductButton, { ProductProps } from "@/components/ui/edit-product"
import { getProducts } from "@/Functions/get-products"

export default async function ProductsList() {
  const products: ProductProps[] = (await getProducts()).map((product) => ({
    ...product,
    imageUrl: product.imageUrl || "",
  }));
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-50 mb-6">Products List</h1>
        <ul className="divide-y divide-zinc-800 border border-zinc-800 shadow overflow-hidden sm:rounded-md">
          {products.map((product) => (
            <li key={product.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div>
                <span className="font-medium text-violet-500 mr-2">{product.id}</span>
                <span className="text-gray-50">{product.title}</span>
              </div>
              <div className="flex space-x-2">
                <EditProductButton product={product} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}