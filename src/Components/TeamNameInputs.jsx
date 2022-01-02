import React from 'react'
import { useState, useRef, useEffect } from 'react/cjs/react.development'

function TeamNameInputs({teamNames, setTeamNames, setTeamNameInputsInFocus}) {

  const [homeName, setHomeName] = useState('Home');
  const [guestName, setGuestName] = useState('Guest');

  const inputContainer = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  })

  function makeTeamNameObjectAndSetNames(homeName, guestName) {
    var obj = {Home: homeName, Guest: guestName};

    setTeamNames(obj);
  } 

  function handleDocumentClick(e) {
    if(inputContainer.current && !inputContainer.current.contains(e.target)) {
      setTeamNameInputsInFocus(false);
    } else {
      setTeamNameInputsInFocus(true);
    }
  }

  function handleKeyUP(e) {
    if(e.key === 'Enter') {
      // e.preventDefault();
      e.target.blur();
      setTeamNameInputsInFocus(false);
    }
  }

  return (
    <div className='input-container' ref={inputContainer}>
      <input type="text" defaultValue={homeName} onChange={(e) => setHomeName(e.target.value)}/>
      <input type="text" defaultValue={guestName} onChange={(e) => setGuestName(e.target.value)}/>
      <input type="button" onKeyUp={(e) => handleKeyUP(e)} value="Enter" onClick={() => makeTeamNameObjectAndSetNames(homeName
        , guestName)}/>
    </div>
  )
}

export default TeamNameInputs
