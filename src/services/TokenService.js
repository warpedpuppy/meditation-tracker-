const TokenService = {
	tokenName: 'token',
	checkForToken: function () {
		return !!localStorage.getItem(this.tokenName)
	},
	getToken: function () {
		return JSON.parse(localStorage.getItem('token'))
	},
	createToken: function () {
		localStorage.setItem('token', JSON.stringify({createdAt: new Date(), dates: [{sessions: [0,0], date: ''}]}))
	},
	update: function (q, date) {
		let temp = {...this.getToken()};
		// check whether day exists in token
		console.log(temp)
		let recordExists = false;
		for (let i = 0; i < temp.dates.length; i++){
			let item = temp.dates[i];
			console.log(item)
			if (item.date && this.sameDay(date, item.date)) {
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
		console.log(temp)
		localStorage.setItem('token', JSON.stringify(temp))

	},
	addPastDays: function (q) {

	},
	sameDay: function (day1, day2) {
		let day2DateObject = new Date(day2);
		return (day1.getDate() === day2DateObject.getDate() && day1.getMonth() === day2DateObject.getMonth() && day1.getFullYear() === day2DateObject.getFullYear())
	}
}
export default TokenService;