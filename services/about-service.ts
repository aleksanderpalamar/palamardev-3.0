import { AboutRepository } from "@/interface/data-access";
import { About } from "@prisma/client";

export class AboutService {
  constructor(private aboutRepository: AboutRepository) {}

  async editAbout(id: string, data: Partial<About>) {
    try {
      return this.aboutRepository.updateAbout(id, data);
    } catch (error) {
      console.error('Error updating about:', error)
      return { success: false, error: 'Failed to update about' }
    }
  }

  async deleteAbout(id: string) {
    try {
      return this.aboutRepository.deleteAbout(id);
    } catch (error) {
      console.error('Error deleting about:', error)
      return { success: false, error: 'Failed to delete about' }
    }
  }
}