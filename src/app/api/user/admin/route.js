import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Create Supabase client with direct credentials
const supabase = createClient(
  'https://kfiqzasqsvusxjyfodoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXF6YXNxc3Z1c3hqeWZvZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTczMjcsImV4cCI6MjA1MzgzMzMyN30.52jMu6inxCcDRM6Y5HYADYwzZkgyDpeh-yXSYRFJido'
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { admin_id, password } = body

    if (!admin_id || !password) {
      return NextResponse.json(
        { error: 'Admin ID and password are required' },
        { status: 400 }
      )
    }

    // Query the admin table
    const { data, error } = await supabase
      .from('Admin')
      .select('*')
      .eq('admin_id', admin_id)
      .eq('password', password)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      )
    }

    // If we get here, credentials are valid
    return NextResponse.json({
      message: 'Admin login successful',
      admin: data
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request) {
    return new Response(null, {
        status: 200,
    })
}
