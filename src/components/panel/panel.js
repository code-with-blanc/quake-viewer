import React from 'react';
import ControlPanel, {
  Range, Button
} from 'react-control-panel';

import './panel.scss';

const Panel = ({
  numQuakes, setNumQuakes,
}) => (
    <ControlPanel
      theme='dark'
      className='panel-div'
    >
      <Range
        label='Num. Quakes' min={0} max={1000} step={1}
        value={numQuakes}
        onChange={(value) => setNumQuakes(value)}
      />
      <Button
        label='Re-generate earthquakes DB'
        action={() => {
          const currentNumQuakes = numQuakes;
          setNumQuakes(0);
          setNumQuakes(currentNumQuakes);
        }}
      />

    </ControlPanel>
  );

export default Panel;

