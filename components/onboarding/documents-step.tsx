"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Trash2, CheckCircle } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { addDocument, removeDocument } from "@/lib/store/slices/profileSlice"

interface DocumentsStepProps {
  onComplete: () => void
  onPrevious: () => void
  isCompleting: boolean
}

const requiredDocuments = [
  { id: "cv", name: "CV/Resume", required: true, description: "Your current resume or CV" },
  { id: "passport", name: "Passport Photo", required: true, description: "Clear passport-style photo" },
  { id: "id", name: "ID Document", required: false, description: "Passport or national ID" },
  { id: "certificates", name: "Certificates", required: false, description: "Any relevant certifications" },
]

export function DocumentsStep({ onComplete, onPrevious, isCompleting }: DocumentsStepProps) {
  const dispatch = useDispatch()
  const documents = useSelector((state: RootState) => state.profile.formData.documents)
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({})

  const handleFileUpload = async (documentType: string, file: File) => {
    setUploadingFiles({ ...uploadingFiles, [documentType]: true })

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const document = {
      id: Date.now().toString(),
      type: documentType,
      name: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file), // In real app, this would be the uploaded file URL
    }

    dispatch(addDocument(document))
    setUploadingFiles({ ...uploadingFiles, [documentType]: false })
  }

  const handleRemoveDocument = (index: number) => {
    dispatch(removeDocument(index))
  }

  const getDocumentsByType = (type: string) => {
    return documents.filter((doc: any) => doc.type === type)
  }

  const hasRequiredDocuments = requiredDocuments
    .filter((doc) => doc.required)
    .every((doc) => getDocumentsByType(doc.id).length > 0)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Documents</h3>
        <p className="text-gray-600">
          Upload the required documents to complete your profile. These will be shared with potential employers.
        </p>
      </div>

      <div className="space-y-6">
        {requiredDocuments.map((docType) => {
          const userDocs = getDocumentsByType(docType.id)
          const isUploading = uploadingFiles[docType.id]

          return (
            <Card key={docType.id} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center">
                      {docType.name}
                      {docType.required && <span className="text-red-500 ml-1">*</span>}
                      {userDocs.length > 0 && <CheckCircle className="h-4 w-4 text-emerald-600 ml-2" />}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{docType.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Existing Documents */}
                {userDocs.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {userDocs.map((doc: any, index: number) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-gray-500">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded{" "}
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDocument(documents.findIndex((d: any) => d.id === doc.id))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                      <span className="ml-2 text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                      <Label htmlFor={`file-${docType.id}`} className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                        <input
                          id={`file-${docType.id}`}
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handleFileUpload(docType.id, file)
                            }
                          }}
                        />
                      </Label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {!hasRequiredDocuments && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Please upload all required documents (marked with *) to complete your profile.
          </p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          onClick={onComplete}
          disabled={!hasRequiredDocuments || isCompleting}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {isCompleting ? "Completing Profile..." : "Complete Profile"}
        </Button>
      </div>
    </div>
  )
}
