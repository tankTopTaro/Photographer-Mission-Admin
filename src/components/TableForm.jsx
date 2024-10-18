import axiosClient from '../api/axiosClient'
import { useState } from 'react'

const TableForm = ({item, refreshTable}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event, id) => {
        event.preventDefault()
        const status = event.target.value

        const formData = new FormData()
        formData.append('album_id', id)
        formData.append('status', status)

        setIsSubmitting(true)

        try {
            const response = await axiosClient.post(`/admin-update`, formData)
            console.log(response.data.message)
            await refreshTable()
        } catch (error) {
            console.error('Errorin TableForm handleSubmit', error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <form>
            <input type="hidden" name="album_id" value={item.id} />
            <select
                name="status"
                className="mt-1 block p-2 border border-gray-300"
                defaultValue={item.status}
                disabled={item.status === 'longterm'}
                onChange={(ev) => handleSubmit(ev, item.id)}
            >
                <option value="live">Live</option>
                <option value="longterm">Long Term</option>
            </select>
            {/* Loading indicator */}
            {isSubmitting && (
                <div className="mt-2 text-sm text-gray-600">Submitting...</div>
            )}
        </form>
    )
}

export default TableForm