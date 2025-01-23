"use client"

import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MdOutlineEmojiEmotions } from "react-icons/md";


interface TextInputInterface {
    text:string;
    saveInput:React.Dispatch<React.SetStateAction<string>>
}

const TextInput:React.FC<TextInputInterface> = ({text,saveInput}) => {
    
    const [isEditing,setIsEditing] = useState(false);

    return (
        <>
            {
                !isEditing ?(
                    <div className='flex flex-row justify-between gap-5'>
                        <span className='text-base text-neutral-300'>
                            {text}
                        </span>
                        <MdEdit className="text-xl text-neutral-400 cursor-pointer" onClick={()=>setIsEditing(true)}/>
                    </div>
                ):(
                    <div className={`flex flex-row justify-between gap-4 border-b-2 border-green-500`}>
                        <input type="text" value={text} onChange={(e) => saveInput(e.target.value)} className='text-[17px] text-neutral-300 w-full bg-transparent border-none outline-none'/>
                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MdOutlineEmojiEmotions className='text-xl text-neutral-400'/>
                                </PopoverTrigger>
                                <PopoverContent className='w-full p-0'>
                                    <Picker dynamicWidth={true} previewPosition="none" onEmojiSelect={(emoji:any)=>{
                                        saveInput(text=>text+emoji.native);
                                    }} />
                                </PopoverContent>
                            </Popover>
                            <FaCheck className="text-xl text-neutral-400 cursor-pointer" onClick={()=>setIsEditing(false)}/>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default TextInput