import React from 'react'

const Navbar = ({ activeComponent, showForms }) => {
    return (
        <header>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                        <h1 className="uppercase text-white font-semibold">Photographer Mission</h1>
                    </div>
                    </div>
                    <div className="flex gap-4">
                        <button className={`text-white hover:text-gray-300 border border-white px-4 py-2 rounded-xl hover:bg-slate-600 ${activeComponent === 'AlbumUsersForm' ? 'bg-green-400' : ''}`} onClick={() => showForms('AlbumUsersForm')}
                        >Create Album & User</button>
                        <button className={`text-white hover:text-gray-300 border border-white px-4 py-2 rounded-xl hover:bg-slate-600 ${activeComponent === 'AddUserToAlbum' ? 'bg-green-400' : ''}`} onClick={() => showForms('AddUserToAlbum')}
                        >Add User to Album</button>
                        <button className={`text-white hover:text-gray-300 border border-white px-4 py-2 rounded-xl hover:bg-slate-600 ${activeComponent === 'AddCapturesForm' ? 'bg-green-400' : ''}`} onClick={() => showForms('AddCapturesForm')}
                        >Create Captures</button>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar