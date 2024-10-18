import React from 'react'

const Submenu = ({ showTable, Venues, Remotes, Photobooths, Albums, Users, Captures, noData }) => {
    return (
        <div className="container flex flex-1 items-center justify-center gap-4 mx-4 mt-4 mb-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showTable(Venues, 'Venues')}>Show Venues</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showTable(Photobooths, 'Photobooths')}>Show Photobooths</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showTable(Remotes, 'Remotes')}>Show Remotes</button>
            <button disabled={noData} className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${noData ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} onClick={() => showTable(Albums, 'Albums')}>Show Albums</button>
            <button disabled={noData} className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${noData ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} onClick={() => showTable(Users, 'Users')}>Show Users</button>
            <button disabled={noData} className={`bg-blue-500  text-white font-bold py-2 px-4 rounded ${noData ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`} onClick={() => showTable(Captures, 'Captures')}>Show Captures</button>
        </div>
    )
}

export default Submenu