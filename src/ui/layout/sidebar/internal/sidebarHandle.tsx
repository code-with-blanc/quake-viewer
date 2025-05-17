import * as Feather from "react-feather"

import './sidebarHandle.scss'
import { HTMLAttributes } from "react";

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
                { open ? <Feather.ChevronLeft /> : <Feather.ChevronRight /> }
            </div>
        </div>
    </div>
)
