import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { studentId, answers, violations, totalTimeSpent, correctAnswers, examType } = body

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID gerekli' }, { status: 400 })
    }

    // Get user agent and IP
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'

    const now = new Date().toISOString()
    const startTime = new Date(Date.now() - totalTimeSpent * 1000).toISOString()

    // Calculate score
    const totalQuestions = 20
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    // Save exam result
    const { data: examResult, error: resultError } = await supabaseAdmin
      .from('ExamResult')
      .insert({
        studentId,
        score,
        totalQuestions,
        correctAnswers,
        startTime,
        endTime: now,
        timeSpent: totalTimeSpent,
        violations,
        answers,
        ipAddress,
        userAgent,
        
      })
      .select()
      .single()

    if (resultError) {
      console.error('Save exam result error:', resultError)
      return NextResponse.json({ error: 'Sonuç kaydedilemedi' }, { status: 500 })
    }

    // Mark student as completed
    const { error: updateError } = await supabaseAdmin
      .from('Student')
      .update({ hasCompleted: true })
      .eq('id', studentId)

    if (updateError) {
      console.error('Update student error:', updateError)
    }

    return NextResponse.json({
      examResultId: examResult.id,
      score,
      correctAnswers,
      totalQuestions,
      violations: violations.length
    })
  } catch (error) {
    console.error('Submit exam error:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
}
