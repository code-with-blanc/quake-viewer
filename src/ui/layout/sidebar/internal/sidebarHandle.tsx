import { HTMLAttributes } from "react";

import { ChevronLeft, ChevronRight } from 'lucide-react';

import './sidebarHandle.scss'


type SidebarHandleProps = {
    open: boolean,
    width: string;
    onButtonClick?: () => void,
} & HTMLAttributes<HTMLDivElement>


export const SidebarHandle: React.FC<SidebarHandleProps> = ({
    open, onButtonClick, width, style, ...rest
}) => (
    <div
        className='sidebar-handle'
        style={{
            '--w-handle': width,
            ...style
        } as object}
        {...rest}
    >
        <div className='sidebar-handle__btn'>
            <div onClick={() => onButtonClick?.()}>
                { open ? <ChevronLeft /> : <ChevronRight /> }
            </div>
        </div>
    </div>
)
