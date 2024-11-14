import { getAbout } from "@/Functions/get-about"
import DeleteAboutButton from "../_components/delete-button"

export const revalidate = 0

export default async function AboutList() {
  const about = await getAbout()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-50 mb-6">About List</h1>
        <ul className="divide-y divide-zinc-800 border border-zinc-800 shadow overflow-hidden sm:rounded-md">
          {about.map((a) => (
            <li key={a.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <div>
                <span className="font-medium text-violet-500 mr-2">{a.id}</span>
                <span className="text-gray-50">{a.title}</span>
              </div>
              <div className="flex space-x-2">
                <DeleteAboutButton aboutId={a.id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}