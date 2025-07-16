import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Salvar lead no Supabase
    const leadData = {
      email: email.toLowerCase().trim(),
      name: name?.trim() || null
    }

    const { data, error } = await supabase
      .from('ebook_leads')
      .insert([leadData])
      .select()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { 
            message: 'Email já cadastrado',
            existing: true 
          },
          { status: 200 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { 
        message: 'Lead cadastrado com sucesso',
        data: data[0],
        existing: false
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro ao salvar lead:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('ebook_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Erro ao buscar leads:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 