import React from 'react'

const Canvas = ({radius, circles}) => {
  return (
    <div className='temp-canvas-container'>
      <div className='temp-canvas-value'>
        Num. Circles: {circles}
      </div>
      <div className='temp-canvas-value'>
        Radius: {radius}
      </div>
      
    </div>
  )
}

export default Canvas
