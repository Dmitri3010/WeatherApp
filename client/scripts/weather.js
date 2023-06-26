// API Key methods
const apiKey = '0626a793defb2ad8f414d9f545e1a792';
Weather.setApiKey( apiKey );
const oneWeekDay = new Date();
oneWeekDay.setDate(oneWeekDay.getDate() + 7);
Weather.Forecast.startAt = new Date();
Weather.Forecast.endAt = oneWeekDay;
const tempApiKey = Weather.getApiKey();
let currentData;
const dateUtils = new DateUtils();

const degrees = new Intl.NumberFormat('en-US', {
	style: 'unit',
	unit: 'celsius',
});

Weather.getForecastForDays = function (city, callback) {
	const url = "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&cnt=7";

	if (Weather.APIKEY) {
		url = url + "&APPID=" + Weather.APIKEY;
	} else {
		console.log('WARNING: You must set an apiKey for openweathermap');
	}

	return this._getJSON(url, function (data) {
		callback(new Weather.Forecast(data));
	} );
};

Weather.getForecastForDays("Krakow", function(current) {
	const nowWeather = document.getElementById('weatherNowLabel');
	const nowWeatherClouds = document.getElementById('cloudsLabel');
	const todaysWeatherImage = document.getElementById('todaysImage');

	currentData = current.data;
	const tempNow =  Weather.kelvinToCelsius(currentData.list[0].main.temp);
	const cloudsNow = currentData.list[0].weather[0].description;
	nowWeather.textContent = degrees.format(Math.round(tempNow));
	nowWeatherClouds.textContent = cloudsNow;

	todaysWeatherImage.src = `https://openweathermap.org/img/wn/${currentData.list[0].weather[0].icon}@2x.png`
	fillData();
	});

function fillData(){
	const dateTimeLabel = document.getElementById('currentDateTime');
	const currentDateTime = dateUtils.getTodayDateWithTime();
	dateTimeLabel.textContent = currentDateTime;

	fillDaysOfTheWeek();
	fillHighligthsPanel();
}

function fillDaysOfTheWeek() {
	const daysArray = dateUtils.getArrayOfDaysOfWeek();
	let dayNumber = 0;
	daysArray.forEach(day => {
		const weekCaroosel = document.getElementById('weekCarousele');
		const weeatherBox = document.createElement('div');
		weeatherBox.classList = 'oneDayWeatherBox';

		const dayOfWeekSpan = document.createElement('span');
		dayOfWeekSpan.classList = 'dayOfWeekLabel';
		dayOfWeekSpan.textContent = day;

		const dayOfWeekImg = document.createElement('img');
		dayOfWeekImg.classList = 'dayOfWeekImage';
		dayOfWeekImg.src = `https://openweathermap.org/img/wn/${currentData.list[dayNumber].weather[0].icon}@2x.png`;

		const dayOfWeekWeather = document.createElement('span');
		dayOfWeekWeather.classList = 'dayOfWeekTempLabel';
		const tempNow =  Weather.kelvinToCelsius(currentData.list[dayNumber].main.temp);
		dayOfWeekWeather.textContent =  degrees.format(Math.round(tempNow));

		weeatherBox.appendChild(dayOfWeekSpan);
		weeatherBox.appendChild(dayOfWeekImg);
		weeatherBox.appendChild(dayOfWeekWeather);
		weekCaroosel.appendChild(weeatherBox);

		dayNumber++;
	});
}

function fillHighligthsPanel()
{
	const todaysWeather = currentData.list[0].main;

	const feelsLikeSpan = document.getElementById('feelsLikeSpan');
	feelsLikeSpan.textContent = `Feels like : ${degrees.format(Math.round(Weather.kelvinToCelsius(todaysWeather.feels_like)))}`;

	const humiditySpan = document.getElementById('humiditySpan');
	humiditySpan.textContent = `Humidity : ${todaysWeather.humidity} %`;

	const pressureSpan = document.getElementById('pressureSpan');
	pressureSpan.textContent = `Pressure : ${todaysWeather.pressure} Pa`;
	
	const maxTemp = document.getElementById('maxTempSpan');
	maxTemp.textContent = `Max temperature today : ${degrees.format(Math.round(Weather.kelvinToCelsius(todaysWeather.temp_max)))}`;

	const minTemp = document.getElementById('minTempSpan');
	minTemp.textContent = `Min temperature today : ${degrees.format(Math.round(Weather.kelvinToCelsius(todaysWeather.temp_min)))}`;

	const windSpeedSpan = document.getElementById('windSpeedSpan');
	windSpeedSpan.textContent = `Wind speed : ${currentData.list[0].wind.speed}`;
}