import { useState } from 'react';
import './MeditationChart.css';
import TokenService from '../services/TokenService';
import AddPastDays from './AddPastDays';
import Emoji from './Emoji';
import CelebratoryGraphic from './CelebratoryGraphic';
import DateService from '../services/DateService';
function MeditationChart() {


	const [ token, setToken ] = useState(TokenService.getToken())
	const [ playExplosion, setPlayExplosion ] = useState(0)
	let counter = 0;
	
	function clickHandler(num) {
		TokenService.update(num, new Date());
		setToken(TokenService.getToken());
		setPlayExplosion(num + 1)
	}
	
	function deleteItem(date) {
		TokenService.deleteItem(date);
		setToken(TokenService.getToken())
	}
	
	return ( 
		<section>
			
			<AddPastDays setToken={setToken} />
			
			<table id="meditation-chart">
				<thead>
					<tr>
						<th>am</th>
						<th>pm</th>
						<th>x/90</th>
						<th>date</th>
						<th>delete</th>
					</tr>
				</thead>
				<tbody>
					{
						
						token && token.dates.map( (item, index) => {

							if (!index) return <tr key={index} ></tr>;

							// check if days are consecutive and if both sessions were completed
							let date = new Date(item.date);
							let dayBefore = index > 0 ? token.dates[index - 1] : undefined ;
							let isNextDay = DateService.nextDay(date, dayBefore.date)
							let bothCompletedPriorDay = item.sessions[0] === 1 && item.sessions[1] === 1;

							let newLine = (dayBefore && (!isNextDay || !bothCompletedPriorDay) && index !== 1) ? 'new-line' : '' ;

							if (!isNextDay || !bothCompletedPriorDay) counter = 0;

							counter ++;
							return (
								<tr key={index} className={newLine}>
									<td>{item.sessions[0] ? <Emoji symbol="&#9989;"/> : 'no'}</td>
									<td>{item.sessions[1] ? <Emoji symbol="&#9989;"/> : 'no'}</td>
									<td>{ counter } / 90</td>
									<td>{`${DateService.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</td>
									<td><button className="delete" onClick={() => deleteItem(item.date)}><Emoji symbol="&#x1f5d1;"/></button></td>
								</tr>
							)
						})
					}
					<tr id="entry">
						<td><div>{playExplosion === 1 ? <CelebratoryGraphic /> : <button onClick={() => clickHandler(0)}><Emoji symbol="&#x1F914;"/></button> }</div></td>
						<td><div>{playExplosion === 2 ? <CelebratoryGraphic /> : <button onClick={() => clickHandler(1)}><Emoji symbol="&#x1F914;"/></button> }</div></td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</section>
	 );
}

export default MeditationChart;