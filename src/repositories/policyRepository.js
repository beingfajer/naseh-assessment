import { prisma } from '@/lib/prisma'

export const policyRepository = {
  async findByAssessment(assessmentId) {
    return prisma.policy.findMany({ where: { assessmentId }, orderBy: { createdAt: 'desc' }})
  },

  async create({ assessmentId, title, content }) {
    return prisma.policy.create({ data: { assessmentId, title, content }})
  },

  async update({ id, title, content }) {
    return prisma.policy.update({ where: { id }, data: { title, content }})
  },

  async delete(id) {
    return prisma.policy.delete({ where: { id } })
  }
}