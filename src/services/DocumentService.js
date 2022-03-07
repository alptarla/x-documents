import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const DocumentService = {
  async fetchDocuments() {
    const { docs } = await getDocs(collection(db, 'documents'))
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
}

export default DocumentService
