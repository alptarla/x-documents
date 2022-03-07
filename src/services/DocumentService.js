import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const DocumentService = {
  async fetchDocuments() {
    const { docs } = await getDocs(collection(db, 'documents'))
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },
  async createDocument(document) {
    await setDoc(doc(db, 'documents', document.id), document)
  },
  async fetchDocumentById(docId) {
    const res = await getDoc(doc(db, 'documents', docId))
    return {
      id: res.id,
      ...res.data(),
    }
  },
  async updateDocument(id, data) {
    await updateDoc(doc(db, 'documents', id), { data: { ...data } })
  },
}

export default DocumentService
