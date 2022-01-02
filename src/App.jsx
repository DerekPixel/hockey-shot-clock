
import { useState, useEffect } from 'react';
import './App.css';
import ShotsGrid from './Components/ShotsGrid.jsx';
import TeamNameInputs from './Components/TeamNameInputs.jsx'

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

  // function useKey(key) {
  //   // Keep track of key state
  //   const [pressed, setPressed] = useState(false)

  //   // Does an event match the key we're watching?
  //   const match = event => key.toLowerCase() === event.key.toLowerCase()

  //   // Event handlers
  //   const onDown = event => {
  //     if (match(event)) setPressed(true)
  //   }

  //   const onUp = event => {
  //     if (match(event)) setPressed(false)
  //   }

  //   // Bind and unbind events
  //   useEffect(() => {
  //     window.addEventListener("keydown", onDown)
  //     window.addEventListener("keyup", onUp)
  //     return () => {
  //       window.removeEventListener("keydown", onDown)
  //       window.removeEventListener("keyup", onUp)
  //     }
  //   }, [key])

  //   return pressed
  // }

  // if(useKey('k')) console.log('hello');

  function handleKeyPresses(e) {

    if(teamNameInputsInFocus) return;

    let shotsClone = duplicateObjectsInArrayOrObject(shotsObject);

    switch (e.key) {
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
      case ',':
        if(shotsClone[currentPeriod].guest !== 0) {
          shotsClone[currentPeriod].guest -= 1;
        }
        setShotsObject(shotsClone);
        break;
      case '.':
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
    <div className="App">
      <ShotsGrid 
        shotsObject={shotsObject} 
        setShotsObject={(obj) => {setShotsObject(obj)}} 
        teamNames={teamNames}
      />

      <TeamNameInputs 
        teamNames={teamNames} 
        setTeamNames={(obj) => setTeamNames(obj)} 
        setTeamNameInputsInFocus={(bool) => setTeamNameInputsInFocus(bool)}
      />
    </div>
  );
}

export default App;
