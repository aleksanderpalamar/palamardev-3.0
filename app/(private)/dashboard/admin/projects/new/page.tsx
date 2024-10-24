import { NewProjectForm } from "@/components/newproject-form";

export const revalidate = 60
export const dynamic = 'force-dynamic'

export default function NewProject() {
  return <NewProjectForm />
}