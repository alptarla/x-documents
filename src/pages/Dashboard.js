import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'
import Header from '../components/Header'
import DocumentService from '../services/DocumentService'
import classes from './Dashboard.module.css'

function Dashboard() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    DocumentService.fetchDocuments().then((res) => {
      setDocuments(res)
    })
  }, [])

  return (
    <div>
      <Header />
      <main className="container">
        <div className={classes.dashboardMain}>
          {documents.map((document) => (
            <Link to={`/document/${document.id}`} key={document.id}>
              <DocumentCard document={document} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
