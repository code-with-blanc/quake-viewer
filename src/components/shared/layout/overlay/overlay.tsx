import './overlay.scss'

export default function OverLayLayout({ baseContent, overlayContent }) {
    return (
        <div className="layout-overlay">
            <div className="layout-overlay-bottom">
                {baseContent}
            </div>
            <div className="layout-overlay-top">
                {overlayContent}
            </div>
        </div>
    )
}