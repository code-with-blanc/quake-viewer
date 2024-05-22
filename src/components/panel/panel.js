import React, { useEffect } from 'react';

import { useGetQuakesQuery } from '../../store/api/quakeApi';
import QuakeList from './quakeList';

import './panel.scss';

const Panel = ({
  setRenderQuakes
}) => {
  const queryResult = useGetQuakesQuery();
  useEffect(() => {
    if(queryResult.status == 'fulfilled') {
      setRenderQuakes(queryResult.data);      
    }
  }, [queryResult]);

  return (
    <div className='panel-container'>
      <QuakeList />
    </div>
  );
};

export default Panel;

