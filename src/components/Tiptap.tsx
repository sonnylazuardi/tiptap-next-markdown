'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
    ],
    content: `
# Hello world

This is an example of a paragraph

## Heading 2

> Nice Quote here

### Heading 3
`,
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap