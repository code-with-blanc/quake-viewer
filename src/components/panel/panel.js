import React from 'react';

import './panel.scss';

export default function Panel({radius, setRadius, circles, setCircles}) {
    console.log(radius)
    return (
    <div className='panel-container'>
        <div className='panel-item'>
            <div className='panel-item-label'>
                Num. Circles
            </div>
            <div className='panel-item-ctl'>
                <input 
                    type='number'
                    value={circles}
                    onChange={e => setCircles(e.target.value)}
                />
            </div>
        </div>
        <div className='panel-item'>
            <div className='panel-item-label'>
                Radius
            </div>
            <div className='panel-item-ctl'>
                <input 
                    type='number'
                    value={radius}
                    onChange={e => setRadius(e.target.value)}
                />
            </div>
        </div>
    </div>
  )
}
