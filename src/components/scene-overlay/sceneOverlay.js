import React from 'react'

import InfoBar from './infoBar'
import Timeline from './timeline'


export default function SceneOverlay() {
  return (
    <div className='scene-overlay-container'>
        <div className='scene-overlay-info-bar'>
            <InfoBar />
        </div>
        <div className='scene-overlay-timeline'>
            <Timeline />
        </div>
    </div>
  )
}
