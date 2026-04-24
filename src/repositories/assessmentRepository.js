import { prisma } from '@/lib/prisma'

export const assessmentRepository = {
    async findFirst() {
        return prisma.assessment.findFirst({
            include: { shareholders: true }
        })
    },

    async findById(id) {
        return prisma.assessment.findUnique({ where: { id }, include: { shareholders: true }})
    },

    async create({ companyName, companyEmail, companyLocation, primaryActivity, shareholders }) {
        return prisma.assessment.create({
            data: {companyName, companyEmail, companyLocation, primaryActivity,
                shareholders: {
                    create: shareholders
                }
            },
            include: { shareholders: true }
        })
    },

    async update({ id, companyName, companyEmail, companyLocation, primaryActivity, shareholders }) {
        await prisma.shareholder.deleteMany({ where: { assessmentId: id } })
        return prisma.assessment.update({
            where: { id },
            data: {
                companyName,
                companyEmail,
                companyLocation,
                primaryActivity,
                shareholders: { create: shareholders }
            },
            include: { shareholders: true }
        })
    },

    async delete(id) {
        return prisma.assessment.delete({ where: { id } })
    }
}