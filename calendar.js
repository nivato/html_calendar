var DATE_CELLS = [];
var MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
	'November', 'December'];
var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var NOW_YEAR, NOW_MONTH, NOW_DATE;

function clearDateCells(){
	for (var i = 0; i < DATE_CELLS.length; i++){
		var cell = DATE_CELLS[i];
		cell.setAttribute('class', 'date-empty');
		cell.innerHTML = '';
	}
}

function createDaysCells(){
	var daysWrapper = document.getElementById('weekdays');
	for (var i = 0; i < DAY_NAMES.length; i++){
		var cell = document.createElement('div');
		cell.setAttribute('class', 'day');
		cell.innerHTML = DAY_NAMES[i];
		daysWrapper.appendChild(cell);
	}
}

function createDatesCells(){
	var calendar = document.getElementById('calendar');
	for (var i = 0; i < 7*6; i++){
		var cell = document.createElement('div');
		cell.setAttribute('class', 'date');
		DATE_CELLS.push(cell);
		calendar.appendChild(cell);
	}
}

function getDaysInMonth(year, month){
	return new Date(year, month + 1, 0).getDate();
}

function getDayOfWeek(year, month, day){
	return new Date(year, month, day).getDay();
}

function fillInCalendar(year, month){
	clearDateCells();
	var yearCell = document.getElementById('year');
	var monthCell = document.getElementById('month');
	yearCell.innerHTML = year;
	monthCell.innerHTML = MONTH_NAMES[month];
	var numOfDays = getDaysInMonth(year, month);
	var firstDayInWeek = getDayOfWeek(year, month, 1);
	for (var i = 1; i <= numOfDays; i++){
		var cell = DATE_CELLS[firstDayInWeek + i - 1];
		if (isItToday(year, month, i)){
			cell.setAttribute('class', 'date-today');
		} else {
			cell.setAttribute('class', 'date');
		}
		cell.innerHTML = i;
	}
}

function isItToday(year, month, day){
	return (year == NOW_YEAR) && (month == NOW_MONTH) && (day == NOW_DATE);
}

function nextMonth(){
	var yearCell = document.getElementById('year');
	var monthCell = document.getElementById('month');
	var year = parseInt(yearCell.innerHTML);
	var month = MONTH_NAMES.indexOf(monthCell.innerHTML);
	if (month == 11) {
		fillInCalendar(year + 1, 0);
	} else {
		fillInCalendar(year, month + 1);
	}
}

function previousMonth(){
	var yearCell = document.getElementById('year');
	var monthCell = document.getElementById('month');
	var year = parseInt(yearCell.innerHTML);
	var month = MONTH_NAMES.indexOf(monthCell.innerHTML);
	if (month == 0) {
		fillInCalendar(year - 1, 11);
	} else {
		fillInCalendar(year, month - 1);
	}
}

function nextYear(){
	var yearCell = document.getElementById('year');
	var monthCell = document.getElementById('month');
	var year = parseInt(yearCell.innerHTML);
	var month = MONTH_NAMES.indexOf(monthCell.innerHTML);
	fillInCalendar(year + 1, month);
}

function previousYear(){
	var yearCell = document.getElementById('year');
	var monthCell = document.getElementById('month');
	var year = parseInt(yearCell.innerHTML);
	var month = MONTH_NAMES.indexOf(monthCell.innerHTML);
	fillInCalendar(year - 1, month);
}

function start(){
	createDatesCells();
	createDaysCells();
	var date = new Date();
	NOW_YEAR = date.getFullYear();
	NOW_MONTH = date.getMonth();
	NOW_DATE = date.getDate();
	fillInCalendar(NOW_YEAR, NOW_MONTH);
	var nextMonthButton = document.getElementById('month_forward');
	nextMonthButton.onclick = nextMonth;
	var previousMonthButton = document.getElementById('month_back');
	previousMonthButton.onclick = previousMonth;
	var nextYearButton = document.getElementById('year_forward');
	nextYearButton.onclick = nextYear;
	var previousYearButton = document.getElementById('year_back');
	previousYearButton.onclick = previousYear;
}

window.onload = start;