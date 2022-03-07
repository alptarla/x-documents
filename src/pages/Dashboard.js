import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'
import Header from '../components/Header'
import PageLoader from '../components/PageLoader'
import { fetchDocuments } from '../store/documentSlice'
import classes from './Dashboard.module.css'

function Dashboard() {
  const { documents, isLoading, error } = useSelector((state) => state.document)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  const handleNewDocument = () => {
    // TODO: Create new document and redirect to editor page
  }

  return (
    <div>
      <Header onNewDocument={handleNewDocument} />
      <main className="container">
        <div className={classes.dashboardMain}>
          {isLoading ? (
            <PageLoader />
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            documents.map((document) => (
              <Link to={`/document/${document.id}`} key={document.id}>
                <DocumentCard document={document} />
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
