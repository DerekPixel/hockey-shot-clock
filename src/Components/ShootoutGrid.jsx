import React, {useState} from 'react'

function ShootoutGrid({shootoutGrid, setShootoutGrid}) {

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

  function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
    let thingCopy, thingClone, objClone;
  
    if(returnTrueIfInputIsAnArray(thingThatNeedsToBeDupped)) {
      thingCopy = thingThatNeedsToBeDupped.slice();
      thingClone = [];
      for(let i = 0; i < thingCopy.length; i++) {
        objClone = {...thingCopy[i]}
    
        thingClone.push(objClone);
      }
    } else {
      thingCopy = {...thingThatNeedsToBeDupped};
      thingClone = {};
      for(let j = 0; j < Object.keys(thingCopy).length; j++) {
        objClone = {...thingCopy[Object.keys(thingCopy)[j]]}
    
        thingClone[Object.keys(thingCopy)[j]] = objClone;
      }
    }
  
    return thingClone;
  }

  function returnTrueIfInputIsAnArray(objectToCheck) {
    return Array.isArray(objectToCheck);
  }

  let shootoutGridMapped = shootoutGrid.map((roundObj) => {

    let roundNumber = roundObj.round;

    let homePlayerNumberId = `home-${roundNumber}`;
    let guestPlayerNumberId = `guest-${roundNumber}`;

    let homeRadioOutcome = `home-outcome-round-${roundNumber}`;
    let guestRadioOutcome = `guest-outcome-round-${roundNumber}`;

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
            <input type="text" className='shootout-shooter-number' id={homePlayerNumberId} onChange={handlePlayerNumbers}/>

            <div className="shootout-radio-container" onChange={handleOutcome}>
              <input type="radio" name={homeRadioOutcome} id={homeIdSave} />
              <label htmlFor={homeIdSave}>S</label>
              <input type="radio" name={homeRadioOutcome} id={homeIdGoal} />
              <label htmlFor={homeIdGoal}>G</label>
              <input type="radio" name={homeRadioOutcome} id={homeIdMiss} />
              <label htmlFor={homeIdMiss}>M</label>
            </div>
          </div>

          <div className="guest-team">
            <label htmlFor={guestPlayerNumberId}>#</label>
            <input type="text" className='shootout-shooter-number' id={guestPlayerNumberId} onChange={handlePlayerNumbers}/>

            <div className="shootout-radio-container" onChange={handleOutcome}>
              <input type="radio" name={guestRadioOutcome} id={guestIdSave} />
              <label htmlFor={guestIdSave}>S</label>
              <input type="radio" name={guestRadioOutcome} id={guestIdGoal} />
              <label htmlFor={guestIdGoal}>G</label>
              <input type="radio" name={guestRadioOutcome} id={guestIdMiss} />
              <label htmlFor={guestIdMiss}>M</label>
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
      {shootoutGridMapped}
    </div>
  )
}

export default ShootoutGrid