import { prisma } from '@/lib/prisma'

export const messageRepository = {
  async findByAssessment(assessmentId) {
    return prisma.message.findMany({ where: { assessmentId }, orderBy: { createdAt: 'asc' }})
  },

  async create({ assessmentId, role, content }) {
    return prisma.message.create({ data: { assessmentId, role, content } })
  }
}