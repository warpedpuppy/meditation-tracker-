import { useEffect, useState } from 'react';
import './App.css';
import MeditationChart from './components/MediationChart';
import Modal from './components/Modal';
import TokenService from './services/TokenService';
function App() {
 
  const [ showModal, setShowModal ] = useState(true)
  
  useEffect(() => {

	if (TokenService.checkForToken()) {
		setShowModal(false);
	}

  }, [])
  function start () {
	setShowModal(false)
  }
  return (
    <div className="App">
		<MeditationChart />
		{ showModal && <Modal start={start} /> }
    </div>
  );
}

export default App;
