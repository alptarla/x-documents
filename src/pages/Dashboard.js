import { nanoid } from 'nanoid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert/Alert'
import DocumentList from '../components/DocumentList/DocumentList'
import Header from '../components/Header/Header'
import PageLoader from '../components/PageLoader/PageLoader'
import { createDocument, fetchDocuments } from '../store/documentSlice'

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

  const renderContent = () => {
    if (isLoading) return <PageLoader />
    if (error) return <Alert message={error} type="error" />
    if (!documents.length)
      return <Alert message="No documents yet, create one!" type="warning" />
    return <DocumentList documents={documents} />
  }

  return (
    <div>
      <Header onNewDocument={handleNewDocument} />
      <main className="container">{renderContent()}</main>
    </div>
  )
}

export default Dashboard
