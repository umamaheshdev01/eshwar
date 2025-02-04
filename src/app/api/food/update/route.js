import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Create Supabase client with direct credentials
const supabase = createClient(
  'https://kfiqzasqsvusxjyfodoz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXF6YXNxc3Z1c3hqeWZvZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNTczMjcsImV4cCI6MjA1MzgzMzMyN30.52jMu6inxCcDRM6Y5HYADYwzZkgyDpeh-yXSYRFJido'
)

export async function PATCH(request) {
  try {
    const { searchParams } = new URL(request.url)
    const item_id = searchParams.get('item_id')
    const body = await request.json()

    if (!item_id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('Item')
      .update(body)
      .eq('id', item_id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'No item found' }, { status: 404 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'No item found' }, { status: 404 })
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
