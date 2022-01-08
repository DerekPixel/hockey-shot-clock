import React from 'react'
import { useState, useRef, useEffect } from 'react'

function TeamNameInputs({teamNames, setTeamNames, setTeamNameInputsInFocus}) {

  const [homeName, setHomeName] = useState('Home');
  const [guestName, setGuestName] = useState('Guest');

  const inputContainer = useRef(null);
  const submitButton = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  })

  function makeTeamNameObjectAndSetNames(homeName, guestName, e) {
    var obj = {Home: homeName, Guest: guestName};
    setTeamNames(obj);

    e.target.blur();
    setTeamNameInputsInFocus(false);
  } 

  function handleDocumentClick(e) {
    if(submitButton.current === e.target) return

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
    <div className='input-container flex' ref={inputContainer}>
      <h4
        className='team-name-title'
      >Team Names</h4>

      <input type="text" defaultValue={homeName} onChange={(e) => setHomeName(e.target.value)}/>
      <input type="text" defaultValue={guestName} onChange={(e) => setGuestName(e.target.value)}/>
      <input 
        className='team-names-submit-btn'
        ref={submitButton}
        type="button" 
        onKeyUp={(e) => handleKeyUP(e)} 
        value="Enter" 
        onClick={(e) => makeTeamNameObjectAndSetNames(homeName, guestName, e)}
      />
    </div>
  )
}

export default TeamNameInputs
