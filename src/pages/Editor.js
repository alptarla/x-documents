import React from 'react'
import { useParams } from 'react-router-dom'

function Editor() {
  const { id: documentId } = useParams()

  return <div>Editor {documentId}</div>
}

export default Editor
