import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const DocumentService = {
  async fetchDocuments() {
    const { docs } = await getDocs(collection(db, 'documents'))
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
  async createDocument(document) {
    await setDoc(doc(db, 'documents', document.id), document)
  },
}

export default DocumentService
