import FeatherIcon from 'feather-icons-react'
import './iconButton.scss'

export default function IconButton({ icon, alt, onClick }) {
    return (
        <div className='icon-button'>
            <div
                className='icon-button-icon'
                onClick={() => onClick?.call() }
            >
                {<FeatherIcon icon={icon || 'info'} size={18} />}
            </div>
            <div className='icon-button-alt'>
                {alt}
            </div>
        </div>

    )
}
