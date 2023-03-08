import TokenService from "../services/TokenService";
import './AddPastDays.css';
function AddPastDays({setToken}) {
	function addPastDays(q) {
		TokenService.addPastDays(q);
		setToken(TokenService.getToken())
	}
	return ( 
		<fieldset id="add-past-days"><legend>add past consecutive days</legend>
			<form onSubmit={e => { e.preventDefault(); addPastDays(e.target.number.value)}}>
				<input type="number" name="number" min="0"/>
				<input type="submit" />
			</form>
		</fieldset>
	 );
}

export default AddPastDays;