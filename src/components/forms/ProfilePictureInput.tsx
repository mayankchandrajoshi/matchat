"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"  
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { FaCamera,FaRegFolderOpen,FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiCamera } from "react-icons/fi";

import UserProfilePictureModal from '../modals/UserProfilePictureModal';
import TakePhotoModal from '../modals/TakePhotoModal'


const ProfilePictureInput = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isViewImage, setIsViewImage] = useState(false);
    const [isTakingPhoto,setIsTakingPhoto] = useState(false);

    const handlePopoverChange = (open: boolean) => {
        setIsPopoverOpen(open);
    };

    const saveImageCaptured = (imgSrc:string) =>{
        setIsTakingPhoto(false);
    }

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Popover onOpenChange={handlePopoverChange}>
            <div className="h-full flex items-center justify-center">
                <PopoverTrigger className="relative group w-1/2 aspect-square cursor-pointer">
                    <Avatar className="w-full h-full">
                        <AvatarImage src={image?image:"/images/placeholders/profilePic.jpg"}/>
                        <AvatarFallback>Profile picture</AvatarFallback>
                    </Avatar>
                    <div className={`${isPopoverOpen?"flex":"hidden"} group-hover:flex items-center justify-center flex-col gap-2.5 w-full h-full rounded-full bg-[rgba(30,42,49,0.8)] absolute top-0 left-0 pt-2`}>
                        <FaCamera className="text-2xl text-neutral-200"/>
                        <p className="max-w-[100px] uppercase text-[13px] text-neutral-300 leading-4">Change profile photo</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 py-2 bg-slate-800 rounded-sm shadow-lg max-w-fit">
                    <div className="flex flex-row items-center gap-2 p-2 mb-0.5 pr-6 cursor-pointer bg-slate-800 hover:bg-slate-900">
                        <MdOutlineRemoveRedEye className='text-2xl text-neutral-300'/>
                        <span className='text-base text-neutral-300' onClick={()=>setIsViewImage(true)}>View photo</span>
                        <UserProfilePictureModal isOpen={isViewImage} onClose={() => setIsViewImage(false)} username="John Doe" userImage="/images/placeholders/profilePic.jpg"/>
                    </div>
                    <div className="flex flex-row items-center gap-2 p-2 mb-0.5 pr-6 cursor-pointer bg-slate-800 hover:bg-slate-900">
                        <FiCamera className='text-xl text-neutral-300'/>
                        <span className='text-base text-neutral-300' onClick={()=>setIsTakingPhoto(true)}>Take photo</span>
                        <TakePhotoModal isOpen={isTakingPhoto} onClose={() => setIsTakingPhoto(false)} saveImageCaptured={saveImageCaptured}/>
                    </div>
                    <div className="mb-0.5 cursor-pointer bg-slate-800 hover:bg-slate-900">
                        <label
                            htmlFor="profile-pic-input"
                            className="p-2 cursor-pointer rounded-md flex flex-row gap-2 pr-6"
                        >
                            <FaRegFolderOpen className='text-xl text-neutral-300'/>
                            <span className='text-base text-neutral-300'>Upload photo</span>
                        </label>
                        <input
                            id="profile-pic-input"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-2 p-2 mb-0.5 pr-6 cursor-pointer bg-slate-800 hover:bg-slate-900">
                        <FaRegTrashAlt className='text-xl text-neutral-300'/>
                        <AlertDialog>
                            <AlertDialogTrigger className='text-base text-neutral-300'>
                                Remove photo
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-sm font-normal text-slate-300'>
                                        Remove your profile photo?
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter className='mt-5 gap-4'>
                                    <AlertDialogCancel className='border-0 bg-transparent hover:bg-transparent text-green-500 hover:text-green-400'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='px-6 bg-green-500 hover:bg-green-400 rounded-full'>Remove</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </PopoverContent>
            </div>
        </Popover>
    )
}

export default ProfilePictureInput