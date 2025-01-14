import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  )
}
