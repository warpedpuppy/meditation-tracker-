import { useEffect, useRef } from 'react';
import * as PIXI from 'pixijs';
import './CelebratoryGraphic.css';
function CelebratoryGraphic() {
	const canvasDiv = useRef(null);
	useEffect(() => {
		const app = new PIXI.Application({ background: '#1099bb', width: '200', height: '200'});
		canvasDiv.current.appendChild(app.view);
	}, [])
	return <div className="celebratory-graphic" ref={canvasDiv}></div>;
}

export default CelebratoryGraphic;