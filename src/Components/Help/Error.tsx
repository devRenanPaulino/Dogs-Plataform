import React from 'react'

interface Props {
  error: string | null;
}

const Error = ({ error } :  Props ) => {
  if (!error) return null
  return (
    <p className='text-[#f31] my-4 mx-auto'>{error}</p>
  )
}

export default Error