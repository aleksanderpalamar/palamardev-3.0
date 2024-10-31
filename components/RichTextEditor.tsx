/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null)

  const [bookmark, setBookmark] = useState<any>(null)

  const saveSelection = () => {
    if (editorRef.current?.editor) {
      const bookmarkData = editorRef.current.editor.selection.getBookmark(2, true)
      setBookmark(bookmarkData)
    }
  }

  const restoreSelection = () => {
    if (editorRef.current?.editor && bookmark) {
      editorRef.current.editor.selection.moveToBookmark(bookmark)
      editorRef.current.editor.focus()
    }
  }

  useEffect(() => {
    if (editorRef.current?.editor) {
      const editor = editorRef.current.editor
      const content = editor.getContent()
      if (content !== value) {
        editor.undoManager.transact(() => {
          editor.setContent(value)
          restoreSelection()
        })
      }
    }
  }, [value, bookmark])

  const handleEditorChange = (content: string) => {
    saveSelection()
    onChange(content)
  }

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'quickbars'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | code | help',
        branding: false,
        content_style: `
          body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
          }
          @media (min-width: 840px) {
            html {
              background: #eceef4;
              min-height: 100%;
              padding: 0 .5rem;
            }
            body {
              background-color: #fff;
              box-shadow: 0 0 4px rgba(0, 0, 0, .15);
              box-sizing: border-box;
              margin: 1rem auto 0;
              max-width: 820px;
              min-height: calc(100vh - 1rem);
              padding: 4rem 6rem 6rem 6rem;
            }
          }
        `,
        setup: (editor) => {
          editor.on('BeforeAddUndo', (e) => {
            e.preventDefault()
          })
        },
      }}
      onEditorChange={handleEditorChange}
    />
  )
}