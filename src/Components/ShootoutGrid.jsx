import React, {useState} from 'react'

function ShootoutGrid({shootoutGrid, setShootoutGrid, duplicateObjectsInArrayOrObject, teamNames}) {

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
        className='period flex'
      >
        <h4
          className='period-title'
        >
          {`ROUND ${roundNumber}`}
        </h4>

        <div
          className='period-shots'
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
      className='shots-grid flex'
    >
      <div
        className='teams flex'
      >
        <h4
          className='period-title'
        >Teams</h4>
        <div
          className='home-guest flex'
        >
          <div className="home-name">{teamNames.Home}</div>
          <div className="guest-name">{teamNames.Guest}</div>
        </div>
      </div>
      {shootoutGridMapped}
    </div>
  )
}

export default ShootoutGrid