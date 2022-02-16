
import { useState, useEffect } from 'react';
import './App.css';
import ShotsGrid from './Components/ShotsGrid.jsx';
import TeamNameInputs from './Components/TeamNameInputs.jsx'
import ShotsGridControls from './Components/ShotsGridControls.jsx';


function App() {

  const [shotsObject, setShotsObject] = useState(initilizeShotsObject());
  const [currentPeriod, setCurrentPeriod] = useState('firstPeriod');
  const [teamNames, setTeamNames] = useState({Home: 'Home', Guest: 'Guest'});
  const [teamNameInputsInFocus, setTeamNameInputsInFocus] = useState(false);

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

      <ShotsGridControls handleValueFromInput={(value) => handleValueFromInput(value)} />

      <button
        className='reset-btn'
        onClick={() => resetShotsObjectAndCurrentPeriod()}
      >RESET</button>

    </div>
  );
}

export default App;
