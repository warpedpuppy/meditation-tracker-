import { useState, useEffect } from 'react';
import './MeditationChart.css';
import TokenService from '../services/TokenService';
function MeditationChart() {

	const [ dateStarted, setDateStarted ] = useState('')
	const [ token, setToken ] = useState(TokenService.getToken())

	useEffect(() => {
		if (token) setDateStarted(token.createdAt)
	}, [token])

	function clickHandler(num) {
		TokenService.update(num, new Date());
	}
	function addPastDays(q) {
		TokenService.addPastDays(q);
	}
	return ( 
		<section>
			{dateStarted && (<p>date created: {dateStarted} </p>)}
			<fieldset><legend>add past consecutive days</legend>
				<form onSubmit={e => addPastDays(e.target.number.value)}>
					<input type="number" name="number" min="0"/>
					<input type="submit" />
				</form>
			</fieldset>
			<table id="meditation-chart">
				<thead>
					<tr>
						<th>am</th>
						<th>pm</th>
						<th>x/90</th>
					</tr>
				</thead>
				<tbody>
					{
						token && token.dates.slice(1).map( (item, index) => {
							return (
								<tr key={index}>
									<td>{item.sessions[0] ? 'yes' : 'no'}</td>
									<td>{item.sessions[1] ? 'yes' : 'no'}</td>
									<td>{item.date}</td>
								</tr>
							)
						})
					}
					<tr id="entry">
						<td onClick={() => clickHandler(0)}>&nbsp;</td>
						<td onClick={() => clickHandler(1)}>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</section>
	 );
}

export default MeditationChart;