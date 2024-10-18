import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'

const Alerts = ({ message }) => {
    const { noData } = useContext(AdminContext)
    const [showAlert, setShowAlert] = useState(false)
    const [messageType, setMessageType] = useState('')
  
    useEffect(() => {
      if (noData) {
        setMessageType('warning')
      } else {
        setMessageType('success')
      }

      if (message) {
        setMessageType('success')
        setShowAlert(true)

        const timer = setTimeout(() => {
          setShowAlert(false)
        }, 3000)
  
        return () => clearTimeout(timer)
      }
    }, [noData, message])

    return (
        <div>
            {showAlert && (
                <div
                className={`fixed top-0 left-0 m-4 p-4 rounded text-white ${
                    messageType === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                >
                <p>
                    {message || (
                      messageType === 'success'
                      ? 'Data is available!'
                      : 'There are no data in Albums or Users!'
                    )}
                </p>
                </div>
            )}
        </div>
    )
}

export default Alerts