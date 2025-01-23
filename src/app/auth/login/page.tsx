import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

const Login = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 p-10 flex flex-col justify-center items-center">
      <div className='w-full max-w-[360px]'>
        <h1 className={`w-min mx-auto font-extrabold text-8xl p-6 px-8 bg-green-500 text-slate-900 rounded-full`}>M</h1>
        <div className='mt-10'>
          <h3 className={`font-bold text-3xl text-center`}>
            Sign in to MatChat
          </h3>
          <h4 className={` mt-2 text-center text-neutral-400`}>
            Please Enter your email address
          </h4>
        </div>
        <LoginForm/>
      </div>
    </div>
  )
}

export default Login