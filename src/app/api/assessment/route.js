import { NextResponse } from 'next/server'
import { assessmentRepository } from '@/repositories/assessmentRepository'

export async function GET() {
  try {
    const assessment = await assessmentRepository.findFirst()
    return NextResponse.json(assessment, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assessment' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const assessment = await assessmentRepository.create(body)
    return NextResponse.json(assessment, { status: 201 })
  } catch (error) {
    console.error('POST assessment error:', error)
    return NextResponse.json({ error: 'Failed to create assessment' }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    const body = await req.json()
    const assessment = await assessmentRepository.update(body)
    return NextResponse.json(assessment, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update assessment' }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    await assessmentRepository.delete(id)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete assessment' }, { status: 500 })
  }
}