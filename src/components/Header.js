import TokenService from "../services/TokenService";
import "./Header.css";

import DateService from "../services/DateService";
function Header(props) {	

	let tokenCheck = TokenService.checkForToken();
	if (!tokenCheck) return <header></header>;
	let token = TokenService.getToken();
	const date = new Date(token.createdAt)


	return ( 
		<header>
			<h1>meditation tracker</h1>
			<div>
				<div>date started: {`${DateService.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</div>
				<button onClick={() => {props.setShowModal(true); TokenService.clearToken()}}>clear data</button>
			</div>
		</header>
	 );
}

export default Header;