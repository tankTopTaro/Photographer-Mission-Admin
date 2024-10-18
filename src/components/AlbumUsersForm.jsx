import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'

const AlbumUsersForm = ({setAlertMsg}) => {
    const { availableRemotes, fetchAdmin } = useContext(AdminContext)
    const [submitting, setSubmitting] = useState(false)

    /**
     * Handles the submission of the album creation form.
     *
     * @param {Event} event The form submission event.
     *
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (submitting) return
        setSubmitting(true)

        const formData = new FormData(event.target)
        //const formDataObj = Object.fromEntries(formData.entries())

        try {
            const response = await axios.post('http://localhost:8000/api/photographer-store', formData)
            setAlertMsg(response.data.message)
            event.target.reset()
            await fetchAdmin()
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-2xl font-bold text-center mb-8">Create Album & User</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-2">Name</label>
                <input 
                required 
                type="text" 
                name="name" 
                id="name" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                />

                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">Email</label>
                <input 
                required 
                type="email" 
                name="email" 
                id="email" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                />

                <label htmlFor="remoteSelector" className="block text-sm font-medium text-gray-700 mt-2">Select Remote</label>
                <select 
                required 
                id="remoteSelector" 
                name="remote_id" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                <option value="">Select a Remote</option>
                {availableRemotes.map((remote) => (
                    <option key={remote.id} value={remote.id}>Remote {remote.id}</option>
                ))}
                </select>

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

export default AlbumUsersForm