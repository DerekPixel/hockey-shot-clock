import React from 'react'
// import useWindowDimensions from '../Hooks/useWindowDimensions';

function ShotsGrid({shotsObject, setShotsObject, currentPeriod, teamNames}) {

  // const {height, width} = useWindowDimensions();
  const TSCol = 'hsl(300, 100%, 69%)';

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
        className='period'
      >
        <h4
          className='period-title'
          style={{
            // color: periodKeyname === currentPeriod ? 'red' : 'black'
            textShadow: periodKeyname === currentPeriod && `-1px 0 ${TSCol}, 0 1px ${TSCol}, 1px 0 ${TSCol}, 0 -1px ${TSCol}`
          }}
        >{shotsObject[periodKeyname].period.toUpperCase()}</h4>

        <div
          className='period-shots'
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
      className='shots-grid'
    >
      <div
        className='teams'
      >
        <h4
          className='period-title'
        >Teams</h4>
        <div
          className='home-guest'
        >
          <div className="home-name">{teamNames.Home}</div>
          <div className="guest-name">{teamNames.Guest}</div>
        </div>
      </div>
      {shotsObjectMapped}
      <div
        className='shot-totals'
      >
        <h4
          className='period-title'
        >
          Total
        </h4>
        <div
          className='period-shots'
        >
          <div>{returnShotTotal('home')}</div>
          <div>{returnShotTotal('guest')}</div>
        </div>
      </div>
    </div>
  )
}

export default ShotsGrid
