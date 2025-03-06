import React from 'react'

import Timeline from './timeline'
import IconButton from '../shared/iconButton/iconButton'
import { GITHUB, LINKEDIN_PROFILE } from '../../env'

import './sceneOverlay.scss'

export default function SceneOverlay() {
  return (
    <div className='scene-overlay-container'>
        <div className='scene-overlay-btns'>
            <IconButton
              icon="linkedin" alt="Reach me on LinkedIn"
              onClick={() => window.open(LINKEDIN_PROFILE, '_blank')}
            />
            <IconButton 
              icon="github" alt="Source code"
              onClick={() => { window.open(GITHUB, '_blank') }}
            />
        </div>
        <div className='scene-overlay-timeline'>
            <Timeline />
        </div>
    </div>
  )
}
