import { nanoid } from 'nanoid'
import React from 'react'
import { Link } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'
import Header from '../components/Header'
import classes from './Dashboard.module.css'

const sampleDocument = {
  id: nanoid(),
  title: 'my first document',
  summary:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
}

function Dashboard() {
  return (
    <div>
      <Header />
      <main className="container">
        <div className={classes.dashboardMain}>
          <Link to={`/document/${sampleDocument.id}`}>
            <DocumentCard document={sampleDocument} />
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
