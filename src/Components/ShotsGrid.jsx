import React from 'react'

function ShotsGrid({shotsObject, setShotsObject}) {

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
        style={{
          textAlign: 'center',
          
        }}
      >
        <h4
          style={{
            backgroundColor: 'rgb(0, 160, 0)',
            color: 'white',
            padding: '2px 10px 2px 10px',
            marginBottom: '10px',
        }}
        >{periodKeyname.toUpperCase()}</h4>
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
    )
  })

  return (
    <div
      style={{
        display: 'flex',
        margin: 'auto',
        width: 'max-content',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
        }}
      >
        <div>Home</div>
        <div>Guest</div>
      </div>
      {shotsObjectMapped}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
        }}
      >
        <div>{returnShotTotal('home')}</div>
        <div>{returnShotTotal('guest')}</div>
      </div>
    </div>
  )
}

export default ShotsGrid
