import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TOOLBAR_OPTIONS } from '../config/editorConfig'
import { fetchDocumentById } from '../store/documentSlice'

function Editor() {
  const [quill, setQuill] = useState(null)

  const dispatch = useDispatch()
  const { id: documentId } = useParams()

  useEffect(() => {
    dispatch(fetchDocumentById({ id: documentId }))
      .unwrap()
      .then((document) => {
        if (!quill) return

        quill.enable()
        quill.setText(document.data)
      })
  }, [documentId, dispatch, quill])

  const editorWrapperRef = useCallback((wrapper) => {
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

  return (
    <div>
      <main className="editor" ref={editorWrapperRef}></main>
    </div>
  )
}

export default Editor
