import React from 'react'
import classes from './DocumentCard.module.css'

function DocumentCard({ document }) {
  return (
    <div className={classes.card}>
      <h1 className={classes.cardTitle}>{document.title}</h1>
      <p className={classes.cardContent}>{document.data}</p>
    </div>
  )
}

export default DocumentCard
