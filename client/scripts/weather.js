// API Key methods
var apiKey = '12345';
Weather.setApiKey( apiKey );
var tempApiKey = Weather.getApiKey();

// Language methods
var language = "de"; // set the language to German - libraries default language is "en" (English)
Weather.setLanguage( language );
var tempLanguage = Weather.getLanguage();

var cityId = '4393217';

Weather.getForecast("Kansas City", function(forecast) {
    console.log("forecast high: " + forecast.high());
    console.log("forecast low: " + forecast.low());
  });