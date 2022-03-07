import React from 'react'
import { BarLoader } from 'react-spinners'
import classes from './PageLoader.module.css'

function PageLoader() {
  return (
    <div className={classes.wrapper}>
      <BarLoader loading={true} />
    </div>
  )
}

export default PageLoader
