import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Roboto } from 'next/font/google';
import Link from 'next/link'
import React from 'react'

const ChatOverviewCard = ({isActive=false}) => {
    const chat = {
        name: "Chat Name",
        lastChat : {
            sendBy:"You",
            message:"You : Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae necessitatibus ipsum at alias vel omnis. Porro, incidunt a eligendi aut beatae atque fugiat, voluptatibus, facilis exercitationem et at architecto quibusdam!"
        },
        lastChatDate : "Yesterday"
    }
  return (
    <Link href={'/chats/friends/${id}'} className={`${isActive?'bg-slate-700':'hover:bg-slate-800'} transition-colors duration-100 ease-in-out cursor-pointer`}>
        <div className="flex flex-row items-center gap-4 pl-4">
            <div className='flex-0 w-12 h-12 rounded-full overflow-hidden '>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>{chat.name}</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex-1 border-b border-slate-800 py-3.5 pr-4'>
                <div className='flex flex-row justify-between items-center'>
                    <h3 className="">{chat.name}</h3>
                    <h5 className='text-xs text-slate-400'>{chat.lastChatDate}</h5>
                </div>
                <p className='line-clamp-1 text-ellipsis text-sm text-slate-300'>{chat.lastChat.message}</p>
            </div>
        </div>
        <div className=""></div>
    </Link>
  )
}

export default ChatOverviewCard