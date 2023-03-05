import './MeditationChart.css';
function MeditationChart() {

	function clickHandler(num) {

	}
	return ( 
		<section>
			<table id="meditation-chart">
				<thead>
					<tr>
						<th>am</th>
						<th>pm</th>
						<th>x/90</th>
					</tr>
				</thead>
				<tbody>
					<tr id="entry">
						<td onClick={() => clickHandler(1)}>&nbsp;</td>
						<td onClick={() => clickHandler(2)}>&nbsp;</td>
						<td onClick={() => clickHandler(3)}>&nbsp;</td>
					</tr>
				</tbody>
			</table>
		</section>
	 );
}

export default MeditationChart;