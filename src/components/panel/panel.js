import React from 'react'

import QuakeList from './quakeList'
import Controls from './controls'

import './panel.scss';

const Panel = () => {
    return (
        <div className='panel-container'>
            <Controls />
            <QuakeList />
        </div>
    );
};

export default Panel;

