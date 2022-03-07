import 'quill/dist/quill.snow.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import useEditor from '../hooks/useEditor'
import { fetchDocumentById, updateDocument } from '../store/documentSlice'

function Editor() {
  const { editorRef, quill, setQuill } = useEditor()
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

  return (
    <div>
      <main className="editor" ref={editorRef}></main>
    </div>
  )
}

export default Editor
