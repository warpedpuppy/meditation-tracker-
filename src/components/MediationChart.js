import { useState, useEffect } from 'react';
import './MeditationChart.css';
import TokenService from '../services/TokenService';
import AddPastDays from './AddPastDays';
import Emoji from './Emoji';
function MeditationChart() {

	const [ dateStarted, setDateStarted ] = useState('')
	const [ token, setToken ] = useState(TokenService.getToken())

	useEffect(() => {
		if (token) setDateStarted(token.createdAt)
	}, [token])

	function clickHandler(num) {
		TokenService.update(num, new Date());
		setToken(TokenService.getToken())
	}
	
	function deleteItem(date) {
		TokenService.deleteItem(date);
		setToken(TokenService.getToken())
	}
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	return ( 
		<section>
			{dateStarted && (<p>date created: {dateStarted} </p>)}
			<AddPastDays setToken={setToken} />
			<table id="meditation-chart">
				<thead>
					<tr>
						<th>am</th>
						<th>pm</th>
						<th>x/90</th>
						<th>delete</th>
					</tr>
				</thead>
				<tbody>
					{
						token && token.dates.slice(1).map( (item, index) => {
							let date = new Date(item.date);
							return (
								<tr key={index}>
									<td>{item.sessions[0] ? <Emoji symbol="&#9989;"/> : 'no'}</td>
									<td>{item.sessions[1] ? <Emoji symbol="&#9989;"/> : 'no'}</td>
									<td>{`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</td>
									<td><button onClick={() => deleteItem(item.date)}>delete</button></td>
								</tr>
							)
						})
					}
					<tr id="entry">
						<td onClick={() => clickHandler(0)}>&nbsp;</td>
						<td onClick={() => clickHandler(1)}>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</section>
	 );
}

export default MeditationChart;