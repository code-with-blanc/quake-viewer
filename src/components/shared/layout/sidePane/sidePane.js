import React, { useRef, useState } from 'react';
import './sidePane.scss'
import FeatherIcon from 'feather-icons-react';

export default function SidePaneLayout({ mainContent, sidePaneContent }) {
    const MIN_WIDTH = 280;
    const MAX_WIDTH = 800;

    const [width, setWidth] = useState(300);
    const [resizing, setResizing] = useState(false);
    const [open, setOpen] = useState(true);

    const handleRef = useRef()

    const onMouseMove = (e) => {
        console.log(resizing)
        if(resizing) {
            const rect = handleRef?.current?.getBoundingClientRect()
            const x = rect.x + rect.width/2
            const mouseX = e.clientX

            let w = width - (x - mouseX)
            if(w < MIN_WIDTH) w = MIN_WIDTH;
            if(w > MAX_WIDTH) w = MAX_WIDTH;

            setWidth(w)
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
            <div
                className='side-pane-container'
            >
                <div 
                    className='side-pane-content'
                    style={{
                        width: width,
                        maxWidth: open ? '50vw' : '0'
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
                        <FeatherIcon icon={open ? 'chevron-left' : 'chevron-right'} />
                    </div>
                </div>
            </div>            
            <div className='side-pane-main-content'>
                {mainContent}
            </div>
        </div>
    )
}
