import React, { useState } from 'react'

import "./infoBar.scss"

const InfoBar = () => {
    const [open, setOpen] = useState(true)



    return (
        <div className={
            `info-bar-container
            ${open ? '' : 'info-bar-container-closed'}`
        }>
            <div>
                <div className="info-bar-text-warning">
                    This site uses the USGS catalogue (only M ≥ 4.0). For a real time view of all magnitudes, check {vafriLink} by Hreinn Beck.
                </div>
                <div className="info-bar-text-warning">
                    For the latest information regarding Grindavik consult {IMOLink}. Respect recommendations and exclusion zones.
                </div>
                <div className="info-bar-text-contact">
                    Suggestions? Criticisms? Want to hire me? You can find me on {LinkedinLink}.
                </div>
            </div>
            <div className="info-bar-close" onClick={() => { setOpen(false) }}>
                <div>X</div>
            </div>
        </div>
    )
}

const IMOLink = (
    <a href="https://en.vedur.is/about-imo/news/volcanic-unrest-grindavik"
    target="_blank" rel="noreferrer">
        local authorities
    </a>
)
const LinkedinLink = (
    <a href="https://www.linkedin.com/in/pedroblanc"
    target="_blank" rel="noreferrer">
        LinkedIn
    </a>
)
const vafriLink = (
    <a href="https://www.vafri.is"
    target="_blank" rel="noreferrer">
        vafri.is
    </a>
)

export default InfoBar
