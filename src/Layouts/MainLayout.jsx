import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Shared/Footer'
import Navbar from '../Components/Shared/Navbar'

export const MainLayout = () => {
  return (
    <>
      <header className='bg-chocolate shadow-xl'>
        <Navbar></Navbar>
      </header>
      <main className='min-h-[calc(100vh-488px)]'>
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  )
}
