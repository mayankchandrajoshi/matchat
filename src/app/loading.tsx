import React from 'react'

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 p-10 flex flex-col justify-center items-center">
      <div className='w-full max-w-[360px]'>
        <h1 className="text-white font-semibold text-2xl text-center">Loading...</h1>
      </div>
    </div>
  )
}

export default Loading