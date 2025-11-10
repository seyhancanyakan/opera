import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
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
        examType,
        answers,
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
    const formattedResults = (results as any[]).map((result: any) => ({
      id: result.id,
      student: {
        name: result.Student?.name || 'Unknown',
        schoolNo: result.Student?.schoolNo || 'N/A'
      },
      score: result.score,
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      endTime: result.endTime,
      timeSpent: result.timeSpent,
      examType: result.examType || 'opera',
      answers: result.answers || []
    }))

    return NextResponse.json({ results: formattedResults })
  } catch (error) {
    console.error('Admin results error:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
}
