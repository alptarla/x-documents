import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DocumentService from '../services/DocumentService'

const fetchDocuments = createAsyncThunk('document/fetchDocuments', () => {
  return DocumentService.fetchDocuments()
})
const createDocument = createAsyncThunk(
  'document/createDocument',
  ({ document }) => {
    return DocumentService.createDocument(document)
  }
)

const documentSlice = createSlice({
  name: 'documentSlice',
  initialState: {
    documents: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchDocuments.pending](state) {
      state.isLoading = true
    },
    [fetchDocuments.fulfilled](state, { payload }) {
      state.documents = payload
      state.isLoading = false
      state.error = null
    },
    [fetchDocuments.rejected](state, action) {
      state.error = action.error.message
      state.isLoading = false
    },
    [createDocument.pending](state) {
      state.isLoading = true
    },
    [createDocument.fulfilled](state, { meta }) {
      const { document } = meta.arg
      state.documents.push(document)
      state.isLoading = false
      state.error = null
    },
    [createDocument.rejected](state, action) {
      state.error = action.error.message
      state.isLoading = false
    },
  },
})

export default documentSlice.reducer
export { fetchDocuments, createDocument }
