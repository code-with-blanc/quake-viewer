import React from 'react'

import Timeline from './timeline'
import IconButton from '../shared/iconButton/iconButton'

import './sceneOverlay.scss'

export default function SceneOverlay() {
  return (
    <div className='scene-overlay-container'>
        <div className='scene-overlay-btns'>
<<<<<<< HEAD
           <IconButton />
           <IconButton alt="github"/>
=======
           <IconButton></IconButton>
           <IconButton></IconButton>
>>>>>>> 85fd8082ba23ca615b05cade5fed6cfa513fac34
        </div>
        <div className='scene-overlay-timeline'>
            <Timeline />
        </div>
    </div>
  )
}
