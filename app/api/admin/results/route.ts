import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Fetch all exam results with student info
    const { data: results, error } = await supabaseAdmin
      .from('ExamResult')
      .select(`
        id,
        score,
        correctAnswers,
        totalQuestions,
        endTime,
        timeSpent,
        studentId,
        Student (
          name,
          schoolNo
        )
      `)
      .order('endTime', { ascending: false })

    if (error) {
      console.error('Fetch results error:', error)
      return NextResponse.json({ error: 'Sonuçlar alınamadı' }, { status: 500 })
    }

    // Transform data for frontend
    const formattedResults = results.map(result => ({
      id: result.id,
      student: {
        name: result.Student.name,
        schoolNo: result.Student.schoolNo
      },
      score: result.score,
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      endTime: result.endTime,
      timeSpent: result.timeSpent
    }))

    return NextResponse.json({ results: formattedResults })
  } catch (error) {
    console.error('Admin results error:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
}
