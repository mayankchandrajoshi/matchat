import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const IconWithToolTip = ({tooltipText,position,children}:{tooltipText:string,position:"right"|"left"|"bottom"|"top",children:React.ReactNode}) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={position} className="rounded-xl">
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default IconWithToolTip