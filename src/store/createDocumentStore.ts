import { create } from "zustand";
import axios from "axios";

interface IDocument {
  id: string; // Unique identifier for the document
  text: {
    ru: string;
    uz: string;
    en: string;
  }; // Optional translations
  file: File | null; // Uploaded file
  status: "idle" | "uploading" | "success" | "error"; // Upload status
}

interface UploadFilesState {
  documents: IDocument[];
  addDocument: () => void; // Add a new empty document
  updateDocument: (id: string, updatedData: Partial<IDocument>) => void; // Update a document by ID
  removeDocument: (id: string) => void; // Remove a document by ID
  resetDocuments: () => void; // Clear all documents
  saveDocuments: () => Promise<void>; // Save all documents via Axios
}

export const useDocumentStore = create<UploadFilesState>((set, get) => ({
  documents: [
    {
      id: "rustam",
      text: { ru: "", uz: "", en: "" },
      file: null,
      status: "idle",
    },
  ],

  addDocument: () => {
    const newDocument: IDocument = {
      id: crypto.randomUUID(),
      text: { ru: "", uz: "", en: "" },
      file: null,
      status: "idle",
    };
    set((state) => ({ documents: [...state.documents, newDocument] }));
  },

  updateDocument: (id, updatedData) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              ...updatedData,
              text: {
                ...doc.text,
                ...(updatedData.text || {}),
              },
            }
          : doc
      ),
    }));
  },

  removeDocument: (id) => {
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    }));
  },

  resetDocuments: () => {
    set({ documents: [] });
  },

  saveDocuments: async () => {
    const { documents } = get();
    try {
      const formData = new FormData();
  
      // Add each document as a single object to FormData
      documents.forEach((doc, index) => {
        const documentData = {
          text: {
            ru: doc.text.ru || "",
            uz: doc.text.uz || "",
            en: doc.text.en || "",
          },
        };
  
        // Attach the file if it exists
        if (doc.file) {
          formData.append(`photo`, doc.file);
        }
  
        // Attach the text object as a stringified JSON
        formData.append(
          `text`,
          JSON.stringify(documentData.text)
        );
      });
  
      // Send FormData via Axios
      await axios.post("/api/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Update the status of all documents to "success"
      set((state) => ({
        documents: state.documents.map((doc) => ({
          ...doc,
          status: "success",
        })),
      }));
  
    } catch (error) {
      console.error("Error saving documents:", error);
  
      // Update the status of documents with errors
      set((state) => ({
        documents: state.documents.map((doc) => ({
          ...doc,
          status: doc.status === "uploading" ? "error" : doc.status,
        })),
      }));
    }
  },
  
}));
