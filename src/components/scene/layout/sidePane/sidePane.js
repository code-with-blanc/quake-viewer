import { useRef, useState } from 'react';
import './sidePane.scss'

export default function SidePaneLayout({ mainContent, sidePaneContent }) {
    const MIN_WIDTH = 280;

    const [width, setWidth] = useState(300);
    const [active, setActive] = useState(false);

    const handleRef = useRef()

    const handleMouseMove = (e) => {
        console.log(active)
        if(active) {
            const rect = handleRef?.current?.getBoundingClientRect()
            const x = rect.x + rect.width/2
            const mouseX = e.clientX

            const w = width - (x - mouseX)
            setWidth(w < MIN_WIDTH ? MIN_WIDTH : w)
        }
    }

    return (
        <div className={'layout-side-pane' + (active ? ' layout-side-pane-active' : '')}
            onMouseMove={handleMouseMove}
            onMouseUp={() => {console.log('On Mouse Up'); setActive(false)}}
        >
            <div
                className='side-pane-content'
                style={{ width }}
            >
                {sidePaneContent}
            </div>
            <div className='side-pane-handle'
                ref={handleRef}
                onMouseDown={() => {console.log('On Mouse Down'); setActive(true) }}
            />
            <div className='side-pane-main-content'>
                {mainContent}
            </div>
        </div>
    )
}
