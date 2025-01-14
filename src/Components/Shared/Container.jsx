import React from 'react'

const Container = ({children}) => {
  return (
    <div className='px-4 sm:px-2 md:px-12 lg:px-20 my-12 md:my-10'>
      {children}
    </div>
  )
}
export default Container;