import React from 'react'
import { useState } from 'react/cjs/react.development'

function TeamNameInputs({teamNames, setTeamNames}) {

  const [homeName, setHomeName] = useState('Home');
  const [guestName, setGuestName] = useState('Guest');

  function makeTeamNameObjectAndSetNames(homeName, guestName) {
    var obj = {Home: homeName, Guest: guestName};

    setTeamNames(obj);
  } 

  return (
    <div className='input-container'>
      <input type="text" defaultValue={homeName} onChange={(e) => setHomeName(e.target.value)}/>
      <input type="text" defaultValue={guestName} onChange={(e) => setGuestName(e.target.value)}/>
      <input type="button" value="Enter" onClick={() => makeTeamNameObjectAndSetNames(homeName
        , guestName)}/>
    </div>
  )
}

export default TeamNameInputs
