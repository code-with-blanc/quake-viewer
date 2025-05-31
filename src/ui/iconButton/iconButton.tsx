import { Feather } from 'lucide-react'

import './iconButton.scss'

export default function IconButton({ alt, onClick }) {
    return (
        <div className='icon-button'>
            <div
                className='icon-button-icon'
                onClick={() => onClick?.call() }
            >
                {<Feather size={18} />}
            </div>
            <div className='icon-button-alt'>
                {alt}
            </div>
        </div>

    )
}
