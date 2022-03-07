import React from 'react'
import classes from './Header.module.css'

function Header({ onNewDocument }) {
  return (
    <header className={classes.header}>
      <div className={`container ${classes.headerContent}`}>
        <h1>X Documents</h1>
        <button onClick={onNewDocument} className={classes.headerButton}>
          New Document
        </button>
      </div>
    </header>
  )
}

export default Header
