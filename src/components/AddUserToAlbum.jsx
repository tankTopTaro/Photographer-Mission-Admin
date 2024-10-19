import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axiosClient from '../api/axiosClient'
import CryptoJS from 'crypto-js'

const AddUserToAlbum = ({setAlertMsg}) => {
    const { albumOwners, fetchAdmin } = useContext(AdminContext)
    const [submitting, setSubmitting] = useState(false)

    const generateToken = (albumId) => {
        const salt = 'SALT123'
        const randomNum = Math.floor(Math.random() * 10000)
        const tokenString = salt + albumId + randomNum

        const hashedToken = CryptoJS.SHA256(tokenString).toString()
        return hashedToken
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (submitting) return
        setSubmitting(true)

        const formData = new FormData(event.target)
        const albumId = formData.get('album_id')

        const token = generateToken(albumId)

        formData.append('token', token)

        // Generate a token with SALT123 + albumId + random number range to 10000

        try {
            const response = await axiosClient.post('/photographer-invite', formData)
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
            <h1 className="text-2xl font-bold text-center mb-8">Add User to Album</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label htmlFor="userSelector" className="block text-sm font-medium text-gray-700 mt-2">Select User</label>
                <select 
                id="userSelector" 
                name="album_id" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                <option value="">Select User</option>
                {albumOwners.map((user) => (
                    <option key={user.id} value={user.album_id}>{user.name}</option>
                ))}
                </select>

                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-2">Name</label>
                <input 
                type="text" 
                name="name" 
                id="name" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                />

                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-2">Email</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                />

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

export default AddUserToAlbum