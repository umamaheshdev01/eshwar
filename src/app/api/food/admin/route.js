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
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json({ error: 'Type parameter is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('Item')
      .select('*')
      .eq('category', type)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No items found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
  })
}
