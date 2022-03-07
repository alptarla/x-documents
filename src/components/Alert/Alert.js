import React from 'react'
import classes from './Alert.module.css'

function Alert({ message, type = 'warning' }) {
  const classNames = `${classes.alert} ${classes[type]}`
  return <div className={classNames}>{message}</div>
}

export default Alert
