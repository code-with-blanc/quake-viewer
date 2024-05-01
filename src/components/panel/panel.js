import React from 'react';
import ControlPanel, {
    Button,
    Checkbox,
    Multibox,
    Select,
    Text,
    Color,
    Range,
    Interval,
    Custom,
  } from 'react-control-panel';

import './panel.scss';

const initialState = {
'range slider': 20,
'stepped slider': 0.6,
interval: [25, 50],
text: 'my setting',
checkbox: true,
'color rgb': 'rgb(100, 200, 100',
'color hex': '#30b2ba',
selection: 'option 1',
'multiple checkboxes': [true, true],
};
  
const Panel = ({
  circles, setCircles, radius, setRadius,
}) => (
    <ControlPanel
      theme='dark'
      // title='Demo Panel'
      // initialState={initialState}
      onChange={console.log}
      className='panel-div'
      // width={500}
      // style={{ marginRight: 30 }}
    >
      <Range
        label='Num. Circles' min={0} max={16} step={1}
        value={circles}
        onChange={(value) => setCircles(value)}
      />
      <Range
        label='Radius' min={0} max={200} step={1}
        value={radius}
        onChange={(value) => setRadius(value)}
      />
    </ControlPanel>
  );

export default Panel;

