import React from 'react'

import QuakeList from './quakeList'

import './panel.scss';

const Panel = () => {
    return (
        <div className='panel-container'>
            <QuakeList />
        </div>
    );
};

export default Panel;

