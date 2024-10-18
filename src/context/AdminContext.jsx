import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import axiosClient from '../api/axiosClient';

export const AdminContext = createContext();

/**
 * AdminProvider fetches the admin data from the server and stores it in state,
 * passing it down to its children via the AdminContext.
 *
 * @param {React.ReactNode} children
 * @returns {React.ReactElement} The context provider with the admin data
 */

export const AdminProvider = ({ children}) => {
    const [Venues, setVenues] = useState([])
    const [Remotes, setRemotes] = useState([])
    const [Photobooths, setPhotobooths] = useState([])
    const [Albums, setAlbums] = useState([])
    const [Users, setUsers] = useState([])
    const [Captures, setCaptures] = useState([])

    const [availableRemotes, setAvailableRemotes] = useState([])
    const [liveUsers, setLiveUsers] = useState([])
    const [albumOwners, setAlbumOwners] = useState([])

    const noData = Albums.length === 0 && Users.length === 0 && Captures.length === 0

    const fetchAdmin = async () => {
        try {
            const response = await axiosClient.get(`/admin`)
            setVenues(response.data.venues)
            setRemotes(response.data.remotes)
            setPhotobooths(response.data.photobooths)
            setAlbums(response.data.albums)
            setUsers(response.data.users)
            setCaptures(response.data.captures)
            setAvailableRemotes(response.data.availableRemotes)
            setLiveUsers(response.data.liveUsers)
            setAlbumOwners(response.data.albumOwners)
        } catch (error) {
            console.error('Error fetching Admin', error)
        }
    }

    useEffect(() => {
        fetchAdmin()
    }, [])

    return (
        <AdminContext.Provider value={{
            fetchAdmin,
            Venues, 
            Remotes, 
            Photobooths, 
            Albums, 
            Users, 
            Captures, 
            availableRemotes, 
            liveUsers, 
            albumOwners, 
            noData
        }}>
            {children}
        </AdminContext.Provider>
    )
}