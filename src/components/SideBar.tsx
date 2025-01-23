"use client"

import React from 'react'
import IconWithToolTip from "@/components/IconWithToolTip";

import { IoChatboxEllipses, IoChatboxEllipsesOutline,IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BsPeople,BsPeopleFill } from "react-icons/bs";
import { RiRecordCircleLine,RiRecordCircleFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const SideBar = () => {
    const pathname = usePathname();
    const topLevelPath = `/${pathname.split('/')[1]}`;

    return (
        <div className="w-16 h-full flex flex-col justify-between gap-5 py-5 bg-slate-800">
            <div className='flex flex-col items-center gap-4'>
                <IconWithToolTip tooltipText="Chat" position='right' children={
                    <Link href="/chats" className={`${topLevelPath==='/chats'?'bg-gray-600':''}  rounded-full p-2 transition-colors duration-300`}>
                        {topLevelPath === "/" || topLevelPath === "/chats" ? <IoChatboxEllipses size={24}/> : <IoChatboxEllipsesOutline size={24}/>}
                    </Link>
                }/>
                <IconWithToolTip tooltipText="Status" position='right' children={
                    <Link href='/status' className={`${topLevelPath==='/status'?'bg-gray-600':''} rounded-full p-1.5 transition-colors duration-300`}>
                        {topLevelPath === "/status" ? <RiRecordCircleFill size={26}/> : <RiRecordCircleLine size={26}/>}
                    </Link>
                }/>
                <IconWithToolTip tooltipText="Community" position='right' children={
                    <Link href="/communities" className={`${topLevelPath==='/communities'?'bg-gray-600':''} rounded-full p-2 transition-colors duration-300`}>
                        {topLevelPath === "/communities" ? <BsPeopleFill size={24}/> : <BsPeople size={24}/>}
                    </Link>
                }/>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <IconWithToolTip tooltipText="Settings" position='right' children={
                    <Link href="/settings" className={`${topLevelPath==='/settings'?'bg-gray-600':''} rounded-full p-2 transition-colors duration-300`}>
                        {topLevelPath === "/settings" ? <IoSettingsSharp size={24}/> : <IoSettingsOutline size={24}/>}
                    </Link>
                }/>
                <IconWithToolTip tooltipText="Profile" position='right' children={
                    <Link href="/user/profile" className={`${topLevelPath==='/user'?'bg-gray-600':''} rounded-full p-1 transition-colors duration-300`}>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Link>
                }/>
            </div>
        </div>
    )
}

export default SideBar