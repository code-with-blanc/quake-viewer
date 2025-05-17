import { useRef, useState } from 'react';
import './sidePane.scss'
import * as Feather from 'react-feather';

export default function SidePaneLayout({ mainContent, sidePaneContent }) {
    const MIN_WIDTH = 280;
    const MAX_WIDTH = 800;

    const [width, setWidth] = useState(300);
    const [resizing, setResizing] = useState(false);
    const [open, setOpen] = useState(true);

    const handleRef = useRef<HTMLDivElement>(null)
    const paneRef = useRef<HTMLDivElement>(null)


    const onMouseMove = (ev: React.MouseEvent) => {
        if(resizing) {
            const rect = handleRef?.current?.getBoundingClientRect()
            const paneRect = paneRef?.current?.getBoundingClientRect()

            if(rect === undefined) {
                console.log('no bounding rect')
                return
            }

            if(paneRect === undefined) {
                console.log('no pane bounding rect')
                return
            }
            
            const targetW = ev.clientX - paneRect.left

            const handleCenterX = rect.x + rect.width/2
            const mouseX = ev.clientX

            let w = width - (handleCenterX - mouseX)
            if(w < MIN_WIDTH) w = MIN_WIDTH;
            if(w > MAX_WIDTH) w = MAX_WIDTH;

            console.log('set maxW: ', targetW)
            setWidth(targetW)
        }
    }

    return (
        <div 
            className={
                'layout-side-pane' +
                (resizing ? ' layout-side-pane--resizing' : '')}
            onMouseMove={onMouseMove}
            onMouseUp={() => {setResizing(false)}}
        >
            <div className='side-pane-container'
            ref={paneRef}
            >
                <div 
                    className='side-pane-content'
                    style={{
                        width: width,
                        // maxWidth: open ? '50vw' : '0'
                    }}
                >
                    {sidePaneContent}
                </div>
                <div
                    ref={handleRef}
                    className='side-pane-handle'
                    style={{
                        margin: open ? '0' : '0 0 0 6px',
                        cursor: open ? 'w-resize' : 'pointer'
                    }}
                    onMouseDown={() => {
                        setOpen(true)
                        setResizing(true)
                    }}
                />
                <div className='side-pane-btn'>
                    <div onClick={() => {
                        setResizing(false)
                        setOpen(open => !open)
                    }}>
                        { open ? (
                            <Feather.ChevronLeft />
                        ) : (
                            <Feather.ChevronRight />
                        )}
                    </div>
                </div>
            </div>            
            <div className='side-pane-main-content'>
                {mainContent}
            </div>
        </div>
    )
}
