import { Children, isValidElement, memo, ReactElement, useCallback, useEffect, useRef, useState } from "react"

import './sidebar.scss'
import { SidebarHandle } from "./internal/sidebarHandle"
import { SidebarContent } from "./internal/sidebarContent"
import { cn } from "@/utils/classnames";

interface SidebarProps {
    initialWidthPx?: number,
    minWidthPx?: number,
    maxWidthPx?: number,
    children?: React.ReactNode,
    className?: string;
    onResize?: (width: number) => void
}

interface SidebarParts {
    Content: typeof SidebarContent
}

export const SIDEBAR_HANDLE_W_PX = 20

const SidebarComponent = memo<SidebarProps>(({
    initialWidthPx,
    minWidthPx = 0,
    maxWidthPx = window.innerWidth,
    children,
    className,
    onResize
}) => {
    const content = Children.toArray(children).filter(c => isContent(c))
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(onResize && initialWidthPx) {
            onResize(initialWidthPx)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [width, _setWidth] = useState<number>(initialWidthPx ?? minWidthPx);
    const setWidth = useCallback((w: number) => {
        onResize?.(w)
        _setWidth?.(w)
    }, [onResize, _setWidth])

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
        }
    }, [onMouseMove, onMouseUp, resizing])

    return (
        <div
            className={cn('sidebar', className)}
            style={{
                width: open ? width : 0,
            }}
            ref={sidebarRef}
        >
            <div 
                className="sidebar__content"
                style={open ? {} : {
                    display: 'none'
                }}
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
                    onResize?.(SIDEBAR_HANDLE_W_PX)
                }}
                onMouseDown={() => {
                    if(open) { setResizing(true) }
                }}
                onClick={() => {
                    if(!open) { 
                        setOpen(true)
                        onResize?.(width)
                    }
                }}
            />
        </div>
    )
})

// utility
const isContent = (
    child: React.ReactNode
): child is ReactElement<unknown, typeof SidebarContent> => {
    return isValidElement(child) && child.type === SidebarContent;
};

// export
export type Sidebar = typeof SidebarComponent & SidebarParts
const Sidebar: Sidebar = Object.assign(
    SidebarComponent,
    {
        Content: SidebarContent
    }
)

export { Sidebar }