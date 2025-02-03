import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Create Supabase client with direct credentials
const supabase = createClient(
  'https://kfiqzasqsvusxjyfodoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXF6YXNxc3Z1c3hqeWZvZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTczMjcsImV4cCI6MjA1MzgzMzMyN30.52jMu6inxCcDRM6Y5HYADYwzZkgyDpeh-yXSYRFJido'
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const roll_no = searchParams.get('roll_no')

    if (!roll_no) {
      return NextResponse.json({ error: 'Roll number is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('roll_no', roll_no)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'No user found' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url)
    const roll_no = searchParams.get('roll_no')
    const body = await request.json()

    if (!roll_no) {
      return NextResponse.json({ error: 'Roll number is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('User')
      .update(body)
      .eq('roll_no', roll_no)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'No user found' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const roll_no = searchParams.get('roll_no')

    if (!roll_no) {
      return NextResponse.json({ error: 'Roll number is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('User')
      .delete()
      .eq('roll_no', roll_no)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'No user found' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.roll_no) {
      return NextResponse.json({ error: 'Roll number is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('User')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
