import React, {useEffect, useState} from 'react';
import LineGraph from './components/LineGraph/LineGraph';
import Log from './components/Log/Log';
import Modal from "./components/Modal/Modal";
import { fetchCPULoad } from './utils/os';
import './App.css';
import { checkForRecovery, checkForHighLoad } from './utils/alert-logic';

function App() {
  const [loadAverage, setLoadAverage] = useState(0);
  const [loadSummary, setLoadSummary] = useState([]);
  const [highLoad, setHighLoad] = useState(false);
  const [highLoads, setHighLoads] = useState([]);
  const [recoveries, setRecoveries] = useState([]);
  const [modalVisible, showModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    fetchCPULoad()
      .then(res => {
        let date = new Date();
        setLoadAverage(res.load_average);
        let load = [{
          date: date,
          value: res.load_average,
        }];
        //backfill data with empty values
        //10 min * 6 = 60
        for(let i = 1; i < 60; i++) {
          load = [{ 
            date: new Date(Date.now() - 10000 * i),
            value: null,
          }, ...load];
        };
        setLoadSummary(load);
      })
      .catch(e => {
        console.error(e);
      });
    const timer = setInterval(() => {
      fetchCPULoad()
        .then(res => {
          let date = new Date();
          setLoadAverage(res.load_average);
          setLoadSummary(loadSummary => {
            return addNewLoadData(loadSummary, {
              date: date,
              value: res.load_average
            });
          });
        })
        .catch(e => {
          console.error(e);
        });
    }, 10000)
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if(!highLoad && checkForHighLoad(loadSummary)) {
       let time = loadSummary[loadSummary.length - 1].date.toLocaleTimeString();
       setHighLoad(true);
       setModalContent(`CPU is under heavy load as of ${time}`)
       setHighLoads(highLoads => {
         return [time, ...highLoads];
       });
    } else if(highLoad && checkForRecovery(loadSummary)) {
      let time = loadSummary[loadSummary.length - 1].date.toLocaleTimeString();
      setHighLoad(false);
      setModalContent(`CPU has recovered from heavy load as of ${time}`)
      setRecoveries(recoveries => {
        return [time, ...recoveries];
      }); 
    }
  }, [loadSummary]);

  useEffect(() => {
    showModal(true)
  }, [modalContent])

  const addNewLoadData = (loadSummary, newData) => {
     let loadSummaryCopy = [...loadSummary];
     loadSummaryCopy.shift();
     return [...loadSummaryCopy, newData]
  }

  return (
    <div className="App">
      <h1 className='header'>CPU Load Monitor</h1>
      <div className='content'>
      {loadSummary.length > 0 && (
        <LineGraph
          data={loadSummary}
          highLoad={loadAverage >= 1.0}
          height={350}
          width={700}
        />
      )}
      <div className="logs">
        <div className='data' >Current Average Load: 
          <span className='number' style={{color: loadAverage > 1.0 ? 'rgb(244, 85, 49)' : '#21ce99'}}>
            {loadAverage.toFixed(7)}
          </span>
        </div>
        <Log title={"High CPU Loads"} data={highLoads} color={'rgb(244, 85, 49)'}/>
        <Log title={"Recoveries"} data={recoveries} color={'#21ce99'}/>
      </div>
      
      {modalVisible && modalContent && (
        <Modal content={modalContent} closeModal={showModal} />
      )}
      </div>
     
    </div>
  );
}

export default App;
