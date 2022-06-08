
import { useState, useEffect } from 'react';
import './App.css';
import ShotsGrid from './Components/ShotsGrid.jsx';
import TeamNameInputs from './Components/TeamNameInputs.jsx'
import ShotsGridControls from './Components/ShotsGridControls.jsx';
import ShootoutGrid from './Components/ShootoutGrid';


function App() {

  const [shotsObject, setShotsObject] = useState(initilizeShotsObject());
  const [currentPeriod, setCurrentPeriod] = useState('firstPeriod');
  const [teamNames, setTeamNames] = useState({Home: 'Home', Guest: 'Guest'});
  const [teamNameInputsInFocus, setTeamNameInputsInFocus] = useState(false);
  const [shootout, setShootout] = useState(false);
  const [shootoutGrid, setShootoutGrid] = useState(initilizeShootoutGrid);
  const [winner, setWinner] = useState({home: false, guest: false});

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPresses)
    return () => {
      document.removeEventListener('keyup', handleKeyPresses)
    }
  });

  function initilizeShotsObject() {
    var shots = {
      firstPeriod: {home: 0, guest: 0, period: 'First Period'},
      secondPeriod: {home: 0, guest: 0, period: 'Second Period'},
      thirdPeriod: {home: 0, guest: 0, period: 'Third Period'},
      overTime: {home: 0, guest: 0, period: 'Over Time'},
    };

    return shots;
  }

  function initilizeShootoutGrid() {
    let obj = [
      {round: 1, home: 'awaiting', guest: 'awaiting', homeShooter: 0, guestShooter: 0, index: 0},
      {round: 2, home: 'awaiting', guest: 'awaiting', homeShooter: 0, guestShooter: 0, index: 1},
      {round: 3, home: 'awaiting', guest: 'awaiting', homeShooter: 0, guestShooter: 0, index: 2},
    ];
    return obj;
  }

  function addRoundToShootoutGrid() {
    let gridDupe = duplicateObjectsInArrayOrObject(shootoutGrid);

    let gridLength = gridDupe.length;

    let obj = {round: gridLength + 1, home: 'awaiting', guest: 'awaiting', homeShooter: 0, guestShooter: 0, index: gridLength}

    gridDupe.push(obj);

    setShootoutGrid(gridDupe);
  }

  function resetShotsObjectAndCurrentPeriod() {
    setShotsObject(initilizeShotsObject());
    setCurrentPeriod('firstPeriod');
  }

  function handleKeyPresses(e) {
    var value = e.key.toLowerCase();

    handleValueFromInput(value);
  }

  function handleValueFromInput(value) {

    if(teamNameInputsInFocus) return;

    let shotsClone = duplicateObjectsInArrayOrObject(shotsObject);

    switch (value) {
      case 'h':
        shotsClone[currentPeriod].home += 1;
        setShotsObject(shotsClone);
        break;
      case 'g':
        shotsClone[currentPeriod].guest += 1;
        setShotsObject(shotsClone);
        break;
      case '1':
        if(currentPeriod !== 'firstPeriod') {
          setCurrentPeriod('firstPeriod');
        }
        break;
      case '2':
        if(currentPeriod !== 'secondPeriod') {
          setCurrentPeriod('secondPeriod');
        }
        break;
      case '3':
        if(currentPeriod !== 'thirdPeriod') {
          setCurrentPeriod('thirdPeriod');
        }
        break;
      case '4':
        if(currentPeriod !== 'overTime') {
          setCurrentPeriod('overTime');
        }
        break;
      case 'b':
        if(shotsClone[currentPeriod].guest !== 0) {
          shotsClone[currentPeriod].guest -= 1;
        }
        setShotsObject(shotsClone);
        break;
      case 'n':
        if(shotsClone[currentPeriod].home !== 0) {
          shotsClone[currentPeriod].home -= 1;
        }
        setShotsObject(shotsClone);
        break;
      case 's':
        if(shootout) {
          setShootout(false);
        } else {
          setShootout(true);
        }
        break;
      case 'x':
        addRoundToShootoutGrid();
        break;
      default:
        break;
    }
  }

  function duplicateObjectsInArrayOrObject(thingThatNeedsToBeDupped) {
    var thingCopy, thingClone;
  
    if(Array.isArray(thingThatNeedsToBeDupped)) {
      thingCopy = thingThatNeedsToBeDupped.slice();
      thingClone = [];
      for(let i = 0; i < thingCopy.length; i++) {
        let objClone = {...thingCopy[i]}
    
        thingClone.push(objClone);
      }
    } else {
      thingCopy = {...thingThatNeedsToBeDupped};
      thingClone = {};
      for(let i = 0; i < Object.keys(thingCopy).length; i++) {
        let objClone = {...thingCopy[Object.keys(thingCopy)[i]]}
    
        thingClone[Object.keys(thingCopy)[i]] = objClone;
      }
    }
  
    return thingClone;
  }

  return (
    <div className="App flex">
      <TeamNameInputs 
        teamNames={teamNames} 
        setTeamNames={(obj) => setTeamNames(obj)} 
        setTeamNameInputsInFocus={(bool) => setTeamNameInputsInFocus(bool)}
      />
      <ShotsGrid 
        shotsObject={shotsObject} 
        setShotsObject={(obj) => {setShotsObject(obj)}} 
        currentPeriod={currentPeriod}
        teamNames={teamNames}
      />

      {
        shootout &&
        <ShootoutGrid
          shootoutGrid={shootoutGrid}
          setShootoutGrid={setShootoutGrid}
          duplicateObjectsInArrayOrObject={duplicateObjectsInArrayOrObject}
          teamNames={teamNames}
          winner={winner}
          setWinner={setWinner}
          setTeamNameInputsInFocus={setTeamNameInputsInFocus}
        />
      }


      <ShotsGridControls 
        handleValueFromInput={(value) => handleValueFromInput(value)} 
        shootout={shootout}
        setShootout={setShootout}
        addRoundToShootoutGrid={addRoundToShootoutGrid}
      />

      <button
        className='reset-btn'
        onClick={() => resetShotsObjectAndCurrentPeriod()}
      >RESET</button>

    </div>
  );
}

export default App;
