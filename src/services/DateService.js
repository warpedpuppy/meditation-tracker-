const DateService = {
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	sameDay: function (day1, day2) {
		let day2DateObject = new Date(day2);
		return (day1.getDate() === day2DateObject.getDate() && day1.getMonth() === day2DateObject.getMonth() && day1.getFullYear() === day2DateObject.getFullYear())
	},
	nextDay: function (day1, day2) {

		
		  const priorDay = new Date(day2)

		  let d1 = [day1.getDate(), day1.getMonth(), day1.getFullYear() ]
		  let d2 = [priorDay.getDate(), priorDay.getMonth(), priorDay.getFullYear() ]


		  if (d1[0] === d2[0] + 1 && d1[1] === d2[1] && d1[2] === d2[2]) {
			//next day in same month
			return true;
		  }

		  if(d1[0] === 1 && d2[0] === this.finalDayOf(d2[1], d2[2]) && d1[1] === d2[1] + 1 && d1[2] === d2[2]) {
			//first day of month, prev day was last day of prev month
			return true;
		  }

		  if(d1[0] === 1 && d1[1] === 1 && d2[0] === 31 && d2[1] === 12 && d1[2] === (d2[2] + 1) ) {
			 return true;
		  }

			
		  return false;
		 
	},
	finalDayOf: function (month, checkLeap) {
		let days30 = [8,3,5,10];
		if (month === 1) {
			return this.checkLeapYear(checkLeap) ? 29 : 28 ;
		} else if (days30.includes(month)) {
			return 30;
		} else {
			return 31;
		}
	},
	checkLeapYear: function (year) {
		//three conditions to find out the leap year
		if (((0 === year % 4) && (0 !== year % 100)) || (0 === year % 400)) {
			return true;
		} 
		return false;
	}
}
export default DateService;