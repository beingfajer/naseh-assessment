import { NextResponse } from 'next/server'
import { policyRepository } from '@/repositories/policyRepository'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const assessmentId = searchParams.get('assessmentId')
        if (!assessmentId) {
            return NextResponse.json({ error: 'assessmentId is required' }, { status: 400 })
        }
        const policies = await policyRepository.findByAssessment(assessmentId)
        return NextResponse.json(policies)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const policy = await policyRepository.create(body)
        return NextResponse.json(policy, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json()
        const policy = await policyRepository.update(body)
        return NextResponse.json(policy, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 })
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json()
        await policyRepository.delete(id)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 })
    }
}