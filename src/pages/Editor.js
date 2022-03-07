import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TOOLBAR_OPTIONS } from '../config/editorConfig'
import { fetchDocumentById, updateDocument } from '../store/documentSlice'

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
        quill.setText('')
        quill.updateContents(document.data)
        console.log('document.data', document.data)
      })
  }, [documentId, dispatch, quill])

  useEffect(() => {
    let oldContent = null

    const timerId = setInterval(() => {
      const content = quill.getContents()
      if (JSON.stringify(content) !== JSON.stringify(oldContent)) {
        console.log(content)
        oldContent = content

        // TODO: update content from firestore
        dispatch(updateDocument({ id: documentId, data: content }))
      }
    }, 2000)

    return () => {
      clearInterval(timerId)
    }
  }, [quill, dispatch, documentId])

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
