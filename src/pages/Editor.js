import 'quill/dist/quill.snow.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useEditor from '../hooks/useEditor'
import { fetchDocumentById, updateDocument } from '../store/documentSlice'

const SAVE_INTERVAL_MS = 2000

function Editor() {
  const { editorRef, quill } = useEditor()
  const { id: documentId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDocumentById({ id: documentId }))
      .unwrap()
      .then(({ data }) => {
        quill?.enable()
        quill?.setText('')
        quill?.updateContents(data)
      })
  }, [documentId, dispatch, quill])

  useEffect(() => {
    let oldContent = null

    const handler = () => {
      const content = quill.getContents()

      const diff = JSON.stringify(content) === JSON.stringify(oldContent)
      if (diff) return

      oldContent = content
      dispatch(
        updateDocument({
          id: documentId,
          fields: { data: { ...content }, text: quill.getText() },
        })
      )
    }

    const timerId = setInterval(handler, SAVE_INTERVAL_MS)

    return () => clearInterval(timerId)
  }, [quill, dispatch, documentId])

  return <main className="editor" ref={editorRef}></main>
}

export default Editor
