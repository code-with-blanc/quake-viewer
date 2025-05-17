import { Children, isValidElement, ReactElement, useCallback, useEffect, useRef, useState } from "react"

import './sidebar.scss'
import { SidebarHandle } from "./internal/sidebarHandle"
import { SidebarContent } from "./internal/sidebarContent"

interface SidebarProps {
    initialWidth?: string,
    minWidthPx?: number,
    maxWidthPx?: number,
    children?: React.ReactNode
}

interface SidebarParts {
    Content: typeof SidebarContent
}

const SIDEBAR_HANDLE_W_PX = 20

const Sidebar: (React.FC<SidebarProps> & SidebarParts) = ({
    initialWidth,
    minWidthPx = 0,
    maxWidthPx = window.innerWidth,
    children
}) => {
    const content = Children.toArray(children).filter(c => isContent(c))

    const sidebarRef = useRef<HTMLDivElement>(null)

    const [width, setWidth] = useState<string | number>(initialWidth ?? minWidthPx+'px');
    const [resizing, setResizing] = useState(false);
    const [open, setOpen] = useState(true);

    const onMouseUp = useCallback(() => {
        setResizing(false)
    }, [])

    const onMouseMove = useCallback((ev: MouseEvent) => {
        const sidebarRect = sidebarRef?.current?.getBoundingClientRect()
        if(sidebarRect === undefined) return
        
        let targetW = (ev.clientX - sidebarRect.left) + SIDEBAR_HANDLE_W_PX/2

        if (targetW < minWidthPx) { targetW = minWidthPx }
        if (targetW > maxWidthPx) { targetW = maxWidthPx }

        setWidth(targetW)
    }, [sidebarRef, setWidth, minWidthPx, maxWidthPx])

    useEffect(() => {
        if (resizing) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
          }
      
          return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
          };
    }, [onMouseMove, onMouseUp, resizing])

    return (
        <div
            className='sidebar'
            style={{
                width: open ? width : 0,
            }}
            ref={sidebarRef}
        >
            <div 
                className="sidebar__content"
                style={open ? {} : { display: 'none' }}
            >
                {content}
            </div>
            <SidebarHandle
                width={SIDEBAR_HANDLE_W_PX+'px'}
                style={{ cursor: open ? 'w-resize' : 'pointer' }}
                open={open}
                onButtonClick={() => {
                    setResizing(false)
                    setOpen(open => !open)
                }}
                onMouseDown={() => {
                    setResizing(true)
                }}
                onClick={() => {
                    if(!open) { setOpen(true) }
                }}
            />
        </div>
    )
}

// utility
const isContent = (
    child: React.ReactNode
): child is ReactElement<unknown, typeof SidebarContent> => {
    return isValidElement(child) && child.type === SidebarContent;
};

// export
Sidebar.Content = SidebarContent
export { Sidebar }