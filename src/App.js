import { useEffect, useState } from 'react';
import './App.css';
import MeditationChart from './components/MediationChart';
import Modal from './components/Modal';
import TokenService from './services/TokenService';
import Header from './components/Header';
function App() {
 
  const [ showModal, setShowModal ] = useState(true)
  
  useEffect(() => {

	if (TokenService.checkForToken()) {
		setShowModal(false);
	}

  }, [])
  function start () {
	TokenService.createToken();
	setShowModal(false);
  }
  return (
    <div className="App">
		{ 
			!showModal && (
				<>
					<Header setShowModal={setShowModal} />
					<MeditationChart />
				</>
			)
		}
		{ showModal && <Modal start={start} /> }
    </div>
  );
}

export default App;
