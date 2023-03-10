import DateService from "./DateService";
const TokenService = {
	tokenName: 'token',
	checkForToken: function () {
		return !!localStorage.getItem(this.tokenName)
	},
	getToken: function () {
		let token = JSON.parse(localStorage.getItem('token'));
		let dates = [...token.dates].sort( (a, b) => new Date(a.date).getTime() -new Date(b.date).getTime());
		token.dates = dates;
		return token ? token : undefined;
	},
	setToken: function (item) {
		localStorage.setItem('token', JSON.stringify(item))
	},
	createToken: function () {
		localStorage.setItem('token', JSON.stringify({createdAt: new Date(), dates: [{sessions: [0,0], date: 'start'}]}))
	},
	update: function (q, date) {
		let temp = {...this.getToken()};
		
		// check whether day exists in token
		
		let recordExists = false;
		for (let i = 0; i < temp.dates.length; i++){
			let item = temp.dates[i];
			if (item.date && DateService.sameDay(date, item.date)) {
				item.sessions[q] = 1;
				recordExists = true;
				break;
			}
		}
		if (!recordExists) {
			let sessions = [0,0];
			sessions[q] = 1;
			temp.dates.push({sessions, date})
		}
		
		
		this.setToken(temp)

	},
	addPastDays: function (q) {
		let token = this.getToken();
		let today = new Date();
		let countdown = q;
		while(countdown > 0) {
			let dayInMinutes = 24 * 60;
			let dayInSeconds = dayInMinutes * 60;
			let millisecondsInADay = 1000 * dayInSeconds;
			let previousDay = new Date(today.getTime() - (millisecondsInADay * countdown));
			let bool = token.dates.find( item => DateService.sameDay(new Date(item.date), previousDay) );
			if (!bool) {
				token.dates.push({sessions:[1,1], date: previousDay})
			}
			countdown --;
		}
		
		this.setToken(token)
	},
	deleteItem: function (date) {
		let token = this.getToken();
		let newDates = token.dates.filter( item => item.date !== date)
		token.dates = newDates;
		this.setToken(token);
	},
	clearToken: function () {
		localStorage.clear();
	}
}
export default TokenService;