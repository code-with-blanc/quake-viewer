import React from 'react'

import Timeline from './timeline'
import IconButton from '../shared/iconButton/iconButton'

import './sceneOverlay.scss'

export default function SceneOverlay() {
  return (
    <div className='scene-overlay-container'>
        <div className='scene-overlay-btns'>
           <IconButton />
           <IconButton alt="github"/>
        </div>
        <div className='scene-overlay-timeline'>
            <Timeline />
        </div>
    </div>
  )
}
