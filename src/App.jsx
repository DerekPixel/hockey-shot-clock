
import { useState, useEffect } from 'react';
import './App.css';
import ShotsGrid from './Components/ShotsGrid.jsx';

function App() {

  const [shotsObject, setShotsObject] = useState(initilizeShotsObject());
  const [currentPeriod, setCurrentPeriod] = useState('firstPeriod');

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPresses)
    return () => {
      document.removeEventListener('keyup', handleKeyPresses)
    }
  });

  function initilizeShotsObject() {
    var shots = {
      firstPeriod: {home: 0, guest: 0},
      secondPeriod: {home: 0, guest: 0},
      thirdPeriod: {home: 0, guest: 0},
      overTime: {home: 0, guest: 0},
    };

    return shots;
  }

  function handleKeyPresses(e) {

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
      />
    </div>
  );
}

export default App;
