import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DocumentCard from '../components/DocumentCard'
import Header from '../components/Header'
import PageLoader from '../components/PageLoader'
import { createDocument, fetchDocuments } from '../store/documentSlice'
import classes from './Dashboard.module.css'

const DEFAULT_DOCUMENT_TITLE = 'Unnamed'

function Dashboard() {
  const { documents, isLoading, error } = useSelector((state) => state.document)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchDocuments())
  }, [dispatch])

  const handleNewDocument = () => {
    const document = {
      id: nanoid(),
      title: DEFAULT_DOCUMENT_TITLE,
      data: '',
    }

    dispatch(createDocument({ document }))
      .unwrap()
      .then(() => {
        navigate(`/document/${document.id}`)
      })
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
