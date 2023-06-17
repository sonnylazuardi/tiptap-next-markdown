'use client'

import { astToMarkdown } from '@/utils/markdown';
import { toMarkdown } from 'mdast-util-to-markdown'
import { tiptapToAst } from '@/utils/tiptap-to-ast';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react';
import { Markdown } from 'tiptap-markdown';

const Tiptap = () => {
  const [markdown, setMarkdown] = React.useState(`
  # Hello world
  
  This is a [link](https://tiptap-next-markdown.vercel.app/)
  
  This is an example of a paragraph
  
  ## Heading 2
  
  > Nice Quote here
  
  ### Heading 3
  `);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        linkify: true,
      }),
      Link.configure({
        openOnClick: true,
      })
    ],
    content: markdown,
  })

  React.useEffect(() => {
    editor?.on('update', ({ editor }) => {
      const ast = tiptapToAst(editor.getJSON());
      const markdown = astToMarkdown(ast);
      setMarkdown(markdown as string);
    })
  }, [editor])

  return (
    <div>
      <div>
        <EditorContent editor={editor} />
      </div>
      <pre>
        {markdown}
      </pre>
    </div>
  )
}

export default Tiptap