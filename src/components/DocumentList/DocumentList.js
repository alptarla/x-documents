import React from 'react'
import { Link } from 'react-router-dom'
import DocumentCard from '../DocumentCard/DocumentCard'
import classes from './DocumentList.module.css'

function DocumentList({ documents }) {
  return (
    <div className={classes.documents}>
      {documents.map((document) => (
        <Link to={`/document/${document.id}`} key={document.id}>
          <DocumentCard document={document} />
        </Link>
      ))}
    </div>
  )
}

export default DocumentList
