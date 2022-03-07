import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useCallback, useState } from 'react'
import { TOOLBAR_OPTIONS } from '../config/editorConfig'

function Editor() {
  const [quill, setQuill] = useState(null)

  const editorWrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ''
    const editorEl = document.createElement('div')
    wrapper.append(editorEl)

    const editor = new Quill(editorEl, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    })

    editor.disable()
    editor.setText('Loading...')

    setQuill(editor)
  }, [])

  return (
    <div>
      <main className="editor" ref={editorWrapperRef}></main>
    </div>
  )
}

export default Editor
