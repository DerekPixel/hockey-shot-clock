import React, {useState, useRef, useEffect} from 'react'

function ShootoutGrid({shootoutGrid, setShootoutGrid, duplicateObjectsInArrayOrObject, teamNames, winner, setWinner, setTeamNameInputsInFocus}) {

  const shootoutGridRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  })

  function handleDocumentClick(e) {
    // if(submitButton.current === e.target) return

    if(!shootoutGridRef.current.contains(e.target)) {
      setTeamNameInputsInFocus(false);
    } else {
      setTeamNameInputsInFocus(true);
    }
  }

  function handlePlayerNumbers(e) {
    let target = e.target;

    let playerNumber = target.value;

    let targetIdArray = target.id.split('-');

    let team = targetIdArray[0];
    let round = Number(targetIdArray[1]);

    let gridDupe = duplicateObjectsInArrayOrObject(shootoutGrid);

    if(team === 'home') {
      gridDupe[round - 1].homeShooter = playerNumber;
    } else {
      gridDupe[round - 1].guestShooter = playerNumber;
    }

    setShootoutGrid(gridDupe);
  }

  function handleOutcome(e) {
    let target = e.target;

    let targetIdArray = target.id.split('-');

    let team = targetIdArray[0];
    let round = Number(targetIdArray[3]);
    let outcome = targetIdArray[1];

    let gridDupe = duplicateObjectsInArrayOrObject(shootoutGrid);

    if(team === 'home') {
      gridDupe[round - 1].home = outcome
    } else {
      gridDupe[round - 1].guest = outcome
    }

    setShootoutGrid(gridDupe);
    calculateShootoutWinner(gridDupe);
  }

  function calculateShootoutWinner(grid) {

    let homeTotals = 0; 
    let guestTotals = 0;

    let length = grid.length;

    for(let i = 0; i < length; i++) {
      if(grid[i].home === 'goal') {
        homeTotals++;
      }
      if(grid[i].guest === 'goal') {
        guestTotals++;
      }
    }

    let outcome = Math.sign(homeTotals - guestTotals);

    let winnerDupe = {...winner};

    if(outcome === 1) {
      //set home as winner
      winnerDupe.home = true;
      winnerDupe.guest = false;
    } else if(outcome === -1) {
      //set guest as winner
      winnerDupe.guest = true;
      winnerDupe.home = false;
    } else {
      //set as neutral 
      winnerDupe.guest = false;
      winnerDupe.home = false;
    }

    setWinner(winnerDupe);

  }

  let shootoutGridMapped = shootoutGrid.map((roundObj) => {

    let roundNumber = roundObj.round;
    let index = roundNumber - 1;

    let homePlayerNumberId = `home-${roundNumber}`;
    let guestPlayerNumberId = `guest-${roundNumber}`;

    let homeOutcome = shootoutGrid[index].home;
    let guestOutcome = shootoutGrid[index].guest;

    let homeRadioOutcomeName = `home-outcome-round-${roundNumber}`;
    let guestRadioOutcomeName = `guest-outcome-round-${roundNumber}`;

    let homeIdSave = `home-save-round-${roundNumber}`;
    let homeIdGoal = `home-goal-round-${roundNumber}`;
    let homeIdMiss = `home-miss-round-${roundNumber}`;

    let guestIdSave = `guest-save-round-${roundNumber}`;
    let guestIdGoal = `guest-goal-round-${roundNumber}`;
    let guestIdMiss = `guest-miss-round-${roundNumber}`;

    return (
      <div
        key={roundNumber}
        className='flexable-grid-middle-block flex f-col border-thin-blk'
      >
        <h4
          className='flexable-grid-inner-title'
        >
          {`ROUND ${roundNumber}`}
        </h4>

        <div
          className='flexable-grid-inner-block'
        >
          <div className="home-team">
            <label htmlFor={homePlayerNumberId}>#</label>
            <input 
              type="text" 
              className='shootout-shooter-number' 
              id={homePlayerNumberId} 
              onChange={handlePlayerNumbers}
              value={shootoutGrid[index].homeShooter}
            />

            <div className="shootout-radio-container" >
              <label htmlFor={homeIdSave}>S</label>
              <input 
                type="radio" 
                name={homeRadioOutcomeName} 
                id={homeIdSave} 
                checked={homeOutcome === 'save'} 
                onChange={handleOutcome}
              />
              <label htmlFor={homeIdGoal}>G</label>
              <input 
                type="radio" 
                name={homeRadioOutcomeName} 
                id={homeIdGoal} 
                checked={homeOutcome === 'goal'} 
                onChange={handleOutcome}
              />
              <label htmlFor={homeIdMiss}>M</label>
              <input 
                type="radio" 
                name={homeRadioOutcomeName} 
                id={homeIdMiss} 
                checked={homeOutcome === 'miss'} 
                onChange={handleOutcome}
              />
            </div>
          </div>

          <div className="guest-team">
            <label htmlFor={guestPlayerNumberId}>#</label>
            <input 
              type="text" 
              className='shootout-shooter-number' 
              id={guestPlayerNumberId} 
              onChange={handlePlayerNumbers}
              value={shootoutGrid[index].guestShooter}
            />

            <div className="shootout-radio-container" >
              <label htmlFor={guestIdSave}>S</label>
              <input 
                type="radio" 
                name={guestRadioOutcomeName} 
                id={guestIdSave} 
                checked={guestOutcome === 'save'} 
                onChange={handleOutcome}
              />
              <label htmlFor={guestIdGoal}>G</label>
              <input 
                type="radio" 
                name={guestRadioOutcomeName} 
                id={guestIdGoal} 
                checked={guestOutcome === 'goal'} 
                onChange={handleOutcome}
              />
              <label htmlFor={guestIdMiss}>M</label>
              <input 
                type="radio" 
                name={guestRadioOutcomeName} 
                id={guestIdMiss} 
                checked={guestOutcome === 'miss'} 
                onChange={handleOutcome}
              />
            </div>
          </div>
        </div>

      </div>
    )
  })

  return (
    <div
      className='flexable-grid flex'
      id='shootout-grid'
      ref={shootoutGridRef}
    >
      <div
        className='flexable-grid-first-block flex f-col border-thin-blk'
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
      {shootoutGridMapped}
      <div
        className='flexable-grid-last-block flex f-col border-thin-blk'
      >
        <h4
          className='flexable-grid-inner-title'
        >
          Winner
        </h4>
        <div
          className='flexable-grid-inner-block'
        >
          <div
            className='winner-tag'
            style={
              {
                background: winner.home === true ? 'hsl(120, 100%, 50%)' : 'hsl(120, 0%, 50%)'
              }
            }
          >{winner.home === true ? 'Winner' : ''}</div>
          <div
            className='winner-tag'
            style={
              {
                background: winner.guest === true ? 'hsl(120, 100%, 50%)' : 'hsl(120, 0%, 50%)'
              }
            }
          >{winner.guest === true ? 'Winner' : ''}</div>
        </div>
      </div>
    </div>
  )
}

export default ShootoutGrid