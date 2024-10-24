import { NewPostForm } from '@/components/newpost-form'

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default function NewPost() {  
  return <NewPostForm />
}