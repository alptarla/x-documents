import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useClickOutside from '../../hooks/useClickOutside'
import EditIcon from '../EditIcon'
import classes from './DocumentCard.module.css'

function DocumentCard({ document, onUpdate }) {
  const [title, setTitle] = useState(document.title)
  const [editView, setEditView] = useState(false)

  const editInputRef = useRef(null)
  useClickOutside(editInputRef, async () => {
    if (editView) {
      await onUpdate({ ...document, title })
      setEditView(false)
    }
  })

  const openEditView = () => setEditView(true)
  const handleTitleChange = (e) => setTitle(e.target.value)

  return (
    <div className={classes.card}>
      <header>
        {editView ? (
          <input
            className={classes.editInput}
            name="title"
            value={title}
            onChange={handleTitleChange}
            autoFocus
            ref={editInputRef}
          />
        ) : (
          <div className={classes.cardHeader}>
            <h1>{document.title}</h1>
            <button onClick={openEditView} className={classes.editButton}>
              <EditIcon />
            </button>
          </div>
        )}
      </header>
      <main className={classes.cardMain}>
        <Link to={`/document/${document.id}`} key={document.id}>
          <p>{document.text}</p>
        </Link>
      </main>
    </div>
  )
}

export default DocumentCard
