import Quill from 'quill'
import { useCallback, useState } from 'react'
import { TOOLBAR_OPTIONS } from '../config/editorConfig'

function useEditor() {
  const [quill, setQuill] = useState(null)

  const editorRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ''
    const editorEl = window.document.createElement('div')
    wrapper.append(editorEl)

    const editor = new Quill(editorEl, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    })

    editor.disable()
    editor.setText('Loading...')

    setQuill(editor)
  }, [])

  return {
    editorRef,
    quill,
    setQuill,
  }
}

export default useEditor
