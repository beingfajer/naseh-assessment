import { NextResponse } from 'next/server'
import { messageRepository } from '@/repositories/messageRepository'
import { policyRepository } from '@/repositories/policyRepository'
import { assessmentRepository } from '@/repositories/assessmentRepository'

export async function POST(req) {
    try {
        const { assessmentId, content } = await req.json()

        if (!assessmentId || !content) {
            return NextResponse.json({ error: 'assessmentId and content are required' }, { status: 400 })
        }

        // Get company context
        const assessment = await assessmentRepository.findById(assessmentId)
        if (!assessment) {
            return NextResponse.json({ error: 'Assessment not found' }, { status: 404 })
        }

        // Get chat history for context
        const history = await messageRepository.findByAssessment(assessmentId)

        // Save user message
        await messageRepository.create({ assessmentId, role: 'user', content })

        // Build system prompt with company context
        const systemPrompt = `You are a helpful business assistant for ${assessment.companyName}.

Company Information:
- Name: ${assessment.companyName}
- Email: ${assessment.companyEmail}
- Location: ${assessment.companyLocation}
- Primary Activity: ${assessment.primaryActivity}
- Shareholders: ${assessment.shareholders.map(s => `${s.name} (${s.percentage}%)`).join(', ')}

You help answer questions about this company and generate company policies when asked.
When generating a policy, always format it in clear Markdown with a title and sections.`

        // Call Groq
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                max_tokens: 1000,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...history.map(m => ({ role: m.role, content: m.content })),
                    { role: 'user', content }
                ]
            })
        })

        const data = await groqResponse.json()

        if (!groqResponse.ok) {
            console.error('OpenAI error:', data)
            return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
        }

        const aiContent = data.choices[0].message.content

        // Save AI reply
        const aiMessage = await messageRepository.create({
            assessmentId,
            role: 'assistant',
            content: aiContent
        })

        // If user asked for a policy, save it to policy table too
        const isPolicyRequest = content.toLowerCase().includes('policy') ||
            content.toLowerCase().includes('generate') ||
            content.toLowerCase().includes('create a policy')

        if (isPolicyRequest) {
            await policyRepository.create({
                assessmentId,
                title: `Policy — ${new Date().toLocaleDateString()}`,
                content: aiContent
            })
        }

        return NextResponse.json(aiMessage)

    } catch (error) {
        console.error('Chat route error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}