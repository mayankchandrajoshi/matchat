"use client"

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog" 

import { FaCamera } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";

import Webcam from "react-webcam";

interface ModalProps {
    isOpen :boolean,
    onClose: () => void,
    saveImageCaptured: (imgSrc:string)=>void
}

const TakePhotoModal:React.FC<ModalProps> = ({isOpen, onClose, saveImageCaptured}) => {

  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null); 


  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader className='flex flex-row gap-4 mb-5'>
                <DialogTitle className="text-lg font-normal">Take Photo</DialogTitle>
            </DialogHeader>

            <div className="w-full aspect-[1.4]">
              {imgSrc ? (
                <img src={imgSrc} alt="webcam" className='w-full h-full object-cover'/>
              ) : (
                <Webcam height={720} width={1280} ref={webcamRef} videoConstraints={{ facingMode: "user" }} className='w-full h-full object-cover'/>
              )}
            </div>

            {
              imgSrc ? (
                <div className="flex flex-row justify-between p-2">
                  <button onClick={() => setImgSrc(null)} className='p-2 bg-red-500 hover:bg-red-400 duration-500 transition-all rounded-full'>
                    <RxCross2 className='text-3xl text-white'/>
                  </button>
                  <button onClick={()=>saveImageCaptured(imgSrc)} className='p-2 bg-green-500 hover:bg-green-400 duration-500 transition-all rounded-full'>
                    <IoMdCheckmark className='text-3xl text-white'/>
                  </button>
                </div>
              ):(
                <button onClick={captureImage} className='mx-auto p-4 bg-green-500 hover:bg-green-400 duration-500 transition-all rounded-full'>
                  <FaCamera className='text-3xl text-white'/>
                </button>
              )
            }
        </DialogContent>
    </Dialog>
  );
};

export default TakePhotoModal;
