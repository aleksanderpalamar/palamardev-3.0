'use server'

import { deleteAbout } from '@/Functions/get-about'
import { revalidatePath } from 'next/cache'

export async function deleteAboutAction(id: string) {
  try {
    await deleteAbout(id)
    revalidatePath('/dashboard/admin/about/list')
    return { success: true }
  } catch (error) {
    console.error('Error deleting about:', error)
    return { success: false, error: 'Failed to delete about' }
  }
}