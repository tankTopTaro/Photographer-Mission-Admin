import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import axiosClient from '../api/axiosClient'

const AddCapturesForm = ({ setAlertMsg }) => {
    const { albumOwners, fetchAdmin } = useContext(AdminContext)
    const [submitting, setSubmitting] = useState(false)
    const [fileNames, setFileNames] = useState('No file chosen')

    const handleFileChange = (event) => {
        const files = event.target.files
        if (files.length) {
            const names = Array.from(files).map(file => file.name).join(',')
            setFileNames(names)
        } else {
            setFileNames('No file chosen')
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (submitting) return
        setSubmitting(true)

        const formData = new FormData(event.target)
        /* for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        } */

        try {
            const response = await axiosClient.post(`/photographer-capture`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setAlertMsg(response.data.message)
            event.target.reset()
            setFileNames('No file chosen')
            await fetchAdmin()
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-center mb-8">Create Captures</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label htmlFor="userSelector" className="block text-sm font-medium text-gray-700 mt-2">Select User</label>
                <select 
                id="userSelector" 
                name="album_id" 
                x-model="selectedUser" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                <option value="">Select User</option>
                {albumOwners.map((user) => (
                    <option key={user.id} value={user.album_id}>{user.name}</option>
                ))}
                </select>

                <label htmlFor="images" className="block text-sm font-medium text-gray-700 mt-2">Upload Image</label>
                <div className="mt-1" x-data="{ fileName: 'No file chosen' }">
                <input 
                    type="file" 
                    name="images[]" 
                    id="images" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange} 
                />
                <label htmlFor="images" className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-bold rounded-md cursor-pointer hover:bg-blue-700 transition">
                    Choose File
                </label>
                <span className="mt-2 text-sm text-gray-600" x-text="fileName">{fileNames}</span>
                </div>

                <button 
                type="submit" 
                className={`mt-4 ${submitting ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`} 
                disabled={submitting}
                >
                {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default AddCapturesForm