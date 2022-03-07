import React from 'react'
import { useDispatch } from 'react-redux'
import { updateDocument } from '../../store/documentSlice'
import DocumentCard from '../DocumentCard/DocumentCard'
import classes from './DocumentList.module.css'

function DocumentList({ documents }) {
  const dispatch = useDispatch()
  const handleUpdateDocument = ({ id, ...rest }) => {
    return dispatch(updateDocument({ id, fields: { ...rest } })).unwrap()
  }

  return (
    <div className={classes.documents}>
      {documents.map((document) => (
        <DocumentCard
          document={document}
          key={document.id}
          onUpdate={handleUpdateDocument}
        />
      ))}
    </div>
  )
}

export default DocumentList
