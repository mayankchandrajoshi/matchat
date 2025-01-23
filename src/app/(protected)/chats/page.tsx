import IconWithToolTip from "@/components/IconWithToolTip";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiChatsBold } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import ToggleBtnGreen from "@/components/ToggleBtnGreen";
import ChatOverviewCard from "@/components/chat/ChatOverviewCard";
import RightSectionPlaceholder from "@/components/placeholders/RightSectionPlaceholder";

interface ChatsPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}  

export default function Chats({ searchParams }:ChatsPageProps) {
    return (
        <div className="w-full h-full bg-inherit flex flex-row">
            <div className='w-[450px] h-full bg-inherit flex flex-col py-3'>
                <div className="flex-grow-0">
                    <div className="flex flex-row items-center justify-between px-6 pb-3">
                        <h1 className='font-bold text-[22px]'>Chats</h1>
                        <div className="flex flex-row gap-7">
                            <IconWithToolTip tooltipText="New chat" position="bottom" children={<PiChatsBold size={24} className="text-neutral-300"/>}/>
                            <IconWithToolTip tooltipText="More" position="bottom" children={<BsThreeDotsVertical size={20} className="text-neutral-300"/>}/>
                        </div>
                    </div>
                    <div className="px-3 mt-2 relative">
                        <div className="flex flex-row items-center bg-slate-800 rounded-lg gap-5 px-4">
                            <IoSearchSharp className="text-neutral-300" size={20}/>
                            <input
                                placeholder="Search"
                                className={`font-thin text-neutral-200 !text-sm placeholder:text-sm border-2 bg-slate-800 h-9 focus:outline-none`}
                            />
                        </div>
                    </div>
                    <div className="px-4 flex flex-row gap-2 mt-3">
                        <ToggleBtnGreen text="All" isActive={!searchParams.show || searchParams.show=="All"}/>
                        <ToggleBtnGreen text="Unread" isActive={searchParams.show=="Unread"}/>
                        <ToggleBtnGreen text="Favourites" isActive={searchParams.show=="Favourites"}/>
                        <ToggleBtnGreen text="Groups" isActive={searchParams.show=="Groups"}/>
                    </div>
                </div>
                <div className="scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 min-h-0 flex-1 flex flex-col mt-3 overflow-y-scroll">
                    <ChatOverviewCard isActive/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                    <ChatOverviewCard/>
                </div>
            </div>
            <div className='flex-1 h-full bg-slate-800'>
                <RightSectionPlaceholder/>
            </div>
        </div>
    )
  }