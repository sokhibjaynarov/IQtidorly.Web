import React from 'react'
import Aside from "../../components/aside/Aside"
import Header from "../../components/header/Header"
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <div className='admin'>
        <Aside/>
        <Header/>
        <div className='main'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin