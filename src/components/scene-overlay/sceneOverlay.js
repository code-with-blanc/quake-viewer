import React from 'react'

import Timeline from './timeline'


export default function SceneOverlay() {
  return (
    <div className='scene-overlay-container'>
        <div className='scene-overlay-timeline'>
            <Timeline />
        </div>
    </div>
  )
}
