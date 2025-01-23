"use client"

import React, { useState } from 'react'
import TextInput from '../inputs/TextInput'

const UserProfileForm = () => {

    const [ name,setName ] = useState("Mayank");
    const [ about,setAbout ] = useState("I am mayank");
    
    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
                <h3 className='text-sm text-green-500'>Your name</h3>
                <TextInput text={name} saveInput={setName}/>
                <p className="text-sm text-neutral-400">
                    This is not you username of PIN.This name will be visible to your MatsApp friends.
                </p>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className='text-sm text-green-500'>About</h3>
                <TextInput text={about} saveInput={setAbout}/>
            </div>
        </form>
    )
}

export default UserProfileForm