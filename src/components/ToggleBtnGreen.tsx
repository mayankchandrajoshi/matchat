import React from 'react'
import { Toggle } from '@/components/ui/toggle'
import Link from 'next/link'

const ToggleBtnGreen = ({text,isActive}:{text:string,isActive?:boolean}) => {
  
  return (
    <Link href={`/chats${isActive?'':"?show="+text}`} replace>
      <Toggle pressed={isActive} className="h-8 rounded-full font-normal text-slate-400 bg-slate-800 data-[state=on]:bg-green-700 data-[state=on]:text-green-200  data-[state=on]:hover:bg-green-600 data-[state=on]:hover:text-green-100 data-[state=off]:bg-slate-800 data-[state=off]:text-slate-400  data-[state=off]:hover:bg-slate-700 data-[state=off]:hover:text-slate-300
    " >
        <p className={`px-1`}>{text}</p>
      </Toggle>
    </Link>
  )
}

export default ToggleBtnGreen