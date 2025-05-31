import { RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { Timeline } from './timeline/timeline'

import * as env from '@/env'

import './sceneOverlay.scss'
import { cn } from '@/utils/classnames'

export function SceneOverlay() {
    const [isAboutOpen, setAboutOpen] = useState(false)

    return (
        <div className="scene-overlay">
            <div className="scene-overlay__timeline">
                <Timeline />
            </div>
            <div className="scene-overlay__about-btn">
                <button
                    className={cn(
                        "about-btn",
                        isAboutOpen ? "about-btn--no-line" : ''
                    )}
                    onClick={() => { if(!isAboutOpen) setAboutOpen(true) }}
                >
                    <div className="about-btn__label">About this site</div>
                </button>
            </div>
            { isAboutOpen ? (
                <div className="scene-overlay__about-dialog">
                    <AboutDialog onClose={() => setAboutOpen(false)}/>
                </div>
            ) : null}
        </div>
    )
}

const AboutDialog = ({ onClose } : { onClose?: () => unknown }) => {
    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref as RefObject<HTMLElement>, () => {
        onClose?.()
    })

    return (
        <div ref={ref} className="about-dialog">
            <div>
                This page is a personal project that shows the location of all
                earthquakes on earth in the last 30 days
            </div>

            <div>
                Data is pulled from the 
                &nbsp;<a href="https://earthquake.usgs.gov/fdsnws/event/1/">USGS API</a>&nbsp; 
                to be shown in the 3d model and in the list view.
                The slider bar filters the quakes shown in the 3d model by time. 
            </div>

            <div className="about-dialog__socials">
                Made by Blanc
                <a href={env.LINKEDIN_PROFILE}>Reach me on Linkedin</a>
                <a href={env.GITHUB}>Source code on Github</a>
            </div>
        </div>
    )
}
