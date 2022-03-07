import React from 'react'
import classes from './DocumentCard.module.css'

function DocumentCard({ document }) {
  const summary = document.data?.ops?.[0]?.insert?.trim('')

  return (
    <div className={classes.card}>
      <h1 className={classes.cardTitle}>{document.title}</h1>
      <p className={classes.cardContent}>{summary}</p>
    </div>
  )
}

export default DocumentCard
