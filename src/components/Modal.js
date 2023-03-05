import { useState } from 'react';
import './Modal.css';
function Modal(props) {
	const { start } = props;
	const [ phase, setPhase ] = useState(1)
	return ( 
		<div id="modal">
			{
			phase === 1 && (
				<div>
					<p>want to track meditition over 90 days?</p>
					<div class='button-div'>
						<button onClick={() => setPhase(2)}>yes</button>
						<button onClick={() => setPhase(3)}>no</button>
					</div>
				</div>
			)
			}
			{
			phase === 2 && (
				<div>
					<p>Welcome!</p>
					<p>But now two warnings: 
						<ol>
							<li>This uses local storage, that means if you clear your browser storage, you&apos;ll clear your progress.</li>
							<li>If you share this browser with other people they&apos;ll be able to log meditations.</li>
							<li>You can toggle days on or off in case you accidentally hit one.</li>
							<li>If this site brings you anxiety or stress, please don&apos;t use it..</li>
						</ol>   
					</p>
					<div class='button-div'>
						<button onClick={() => start()}>proceed</button>
						<button onClick={() => setPhase(3)}>opt out</button>
					</div>
				</div>
			)
			}
			{
			phase === 3 && (
				<div>
					<p>cool beans.  see ya.</p>
					<div class='button-div'>
						<button onClick={() => setPhase(1)}>start again</button>
					</div>
				</div>
			)
			}
		</div>
	 );
}

export default Modal;