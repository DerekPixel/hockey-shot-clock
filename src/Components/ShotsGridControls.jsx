import React from 'react'

function ShotsGridControls({handleValueFromInput}) {



  return (
    <div className='shot-grid-controls'>
      <div className="shot-controls">
        <h3 className="period-title">Shot Controls</h3>
        <div className="add-shots flex">
          <button 
            value={'h'} 
            onClick={(e) => handleValueFromInput(e.target.value)} 
            className="add-home-shot add-button green-btn"
          >1+ Home</button>
          <button 
            value={'g'} 
            onClick={(e) => handleValueFromInput(e.target.value)} 
            className="add-guest-shot add-button green-btn"
          >1+ Guest</button>
        </div>
      </div>
      <div className="period-controls">
        <h3 className="period-title">Period Controls</h3>
        <div className="period-select flex">
          <button 
            value={'1'} 
            className="period-select-btn green-btn"
            onClick={(e) => handleValueFromInput(e.target.value)}
          >1</button>
          <button 
            value={'2'} 
            className="period-select-btn green-btn"
            onClick={(e) => handleValueFromInput(e.target.value)}
          >2</button>
          <button 
            value={'3'} 
            className="period-select-btn green-btn"
            onClick={(e) => handleValueFromInput(e.target.value)}
          >3</button>
          <button 
            value={'4'} 
            className="period-select-btn green-btn"
            onClick={(e) => handleValueFromInput(e.target.value)}
          >4</button>
        </div>
      </div>
    </div>
  )
}

export default ShotsGridControls