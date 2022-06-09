import React from 'react'

function ShotsGrid({shotsObject, setShotsObject, currentPeriod, teamNames}) {

  function returnShotTotal(team) {
    var total = 0;
    var objectKeys = Object.keys(shotsObject);
    for(let i = 0; i < objectKeys.length; i++) {
      total += shotsObject[objectKeys[i]][team];
    }
    return total;
  }

  var shotsObjectMapped = Object.keys(shotsObject).map((periodKeyname) => {
    return (
      <div
        key={periodKeyname}
        className='flexable-grid-middle-block flex'
      >
        <h4
          className='flexable-grid-inner-title'
          style={{
            backgroundColor: periodKeyname === currentPeriod && 'hsl(120, 100%, 50%)'
          }}
        >{shotsObject[periodKeyname].period.toUpperCase()}</h4>

        <div
          className='flexable-grid-inner-block'
        >
          <div
            className='home-team-shots'
          >
            {shotsObject[periodKeyname].home}
          </div>
          <div
            className='guest-team-shots'
          >
            {shotsObject[periodKeyname].guest}
          </div>
        </div>
      </div>
    )
  })

  return (
    <div
      className='flexable-grid flex'
    >
      <div
        className='flexable-grid-first-block flex'
      >
        <h4
          className='flexable-grid-inner-title'
        >Teams</h4>
        <div
          className='flexable-grid-inner-block flex'
        >
          <div className="home-name">{teamNames.Home}</div>
          <div className="guest-name">{teamNames.Guest}</div>
        </div>
      </div>
      {shotsObjectMapped}
      <div
        className='flexable-grid-last-block flex'
      >
        <h4
          className='flexable-grid-inner-title'
        >
          Total
        </h4>
        <div
          className='flexable-grid-inner-block'
        >
          <div>{returnShotTotal('home')}</div>
          <div>{returnShotTotal('guest')}</div>
        </div>
      </div>
    </div>
  )
}

export default ShotsGrid
