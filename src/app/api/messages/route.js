import { NextResponse } from 'next/server'
import { messageRepository } from '@/repositories/messageRepository'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const assessmentId = searchParams.get('assessmentId')
        if (!assessmentId) {
            return NextResponse.json({ error: 'assessmentId is required' }, { status: 400 })
        }
        const messages = await messageRepository.findByAssessment(assessmentId)
        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}