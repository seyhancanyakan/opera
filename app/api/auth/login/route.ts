import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, schoolNo } = body

    if (!name || !schoolNo) {
      return NextResponse.json(
        { error: 'Ad ve okul numarası gereklidir' },
        { status: 400 }
      )
    }

    // Check if student exists
    const { data: existingStudent, error: fetchError } = await supabaseAdmin
      .from('Student')
      .select('*')
      .eq('schoolNo', schoolNo.trim())
      .single()

    let student = existingStudent

    // If student doesn't exist, create new student
    if (!student) {
      const { data: newStudent, error: createError } = await supabaseAdmin
        .from('Student')
        .insert({
          name: name.trim(),
          schoolNo: schoolNo.trim(),
          hasCompleted: false
        })
        .select()
        .single()

      if (createError) {
        console.error('Create student error:', createError)
        return NextResponse.json({ error: 'Öğrenci oluşturulamadı' }, { status: 500 })
      }

      student = newStudent
    } else {
      // Check if student has already completed the exam
      if (student.hasCompleted) {
        return NextResponse.json(
          { error: 'Bu okul numarasıyla sınav zaten tamamlanmış. Sadece 1 deneme hakkınız var.' },
          { status: 403 }
        )
      }

      // Update student name if different
      if (student.name !== name.trim()) {
        const { data: updatedStudent } = await supabaseAdmin
          .from('Student')
          .update({ name: name.trim() })
          .eq('id', student.id)
          .select()
          .single()

        student = updatedStudent || student
      }
    }

    // Create session
    const session = {
      studentId: student.id,
      studentName: student.name,
      schoolNo: student.schoolNo,
      currentQuestionIndex: 0,
      answers: [],
      violations: [],
      startTime: new Date().toISOString(),
      isActive: true
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}
