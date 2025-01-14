import FeatherIcon from 'feather-icons-react'
import './iconButton.scss'

export default function IconButton({ icon, alt }) {
    return (
        <div className='icon-button'>
            <div className='icon-button-icon'>
                {<FeatherIcon icon='info' />}
            </div>
            <div className='icon-button-alt'>{alt}</div>
        </div>

    )
}
