import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog" 
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    username: string;
    userImage: string;
}

const UserProfilePictureModal: React.FC<ModalProps> = ({isOpen, onClose, username, userImage}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className='flex flex-row gap-4 mb-5'>
                    <DialogDescription>
                        <Image src={userImage} alt={username} width={40} height={40} className='rounded-full'/>
                    </DialogDescription>
                    <DialogTitle className="text-lg font-normal">{username}</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center">
                    <Image src={userImage} alt={username} width={400} height={400}/> 
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfilePictureModal