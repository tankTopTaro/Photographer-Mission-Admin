import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Table from './components/Table'
import AlbumUsersForm from './components/AlbumUsersForm'
import AddUserToAlbum from './components/AddUserToAlbum'
import AddCapturesForm from './components/AddCapturesForm'
import Submenu from './components/Submenu'
import Alerts from './components/Alerts'
import { AdminContext } from './context/AdminContext'

const App = () => {
  const { Venues, Remotes, Photobooths, Albums, Users, Captures, noData, fetchAdmin } = useContext(AdminContext)

  const [alertMsg, setAlertMsg] = useState('')
  const [isTableVisible, setIsTableVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [tableTitle, setTableTitle] = useState('')

  const [activeComponent, setActiveComponent] = useState('')

  const showTable = (data, name) => {
    setTableData(data)
    setTableTitle(name)
    setIsTableVisible(true)
    setActiveComponent('')
  }

  const showForms = (form) => {
    setActiveComponent(form)
    setIsTableVisible(false)
  }

  const refreshTable = async () => {
    setTableData([])
    setTableTitle('')
    setIsTableVisible(false)
    await fetchAdmin()
    console.log('Table refreshed')
  }

  return (
    <>
    <Navbar activeComponent={activeComponent} showForms={showForms} />

    <Alerts message={alertMsg} />

    <div className="flex flex-1 gap-4 items-center justify-center">
      <Submenu showTable={showTable} Venues={Venues} Remotes={Remotes} Photobooths={Photobooths} Albums={Albums} Users={Users} Captures={Captures} noData={noData} />
    </div>

    <main>
      {isTableVisible && (
        <Table table={tableData} tableName={tableTitle} refreshTable={refreshTable} />
      )}

        { activeComponent === 'AlbumUsersForm' && <AlbumUsersForm setAlertMsg={setAlertMsg} />}
        { activeComponent === 'AddUserToAlbum' && <AddUserToAlbum setAlertMsg={setAlertMsg} />}
        { activeComponent === 'AddCapturesForm' && <AddCapturesForm setAlertMsg={setAlertMsg} />}
    </main>

    </>
  )
}

export default App