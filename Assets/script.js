// Document Variables //
var cityFormEl = document.querySelector('#cityFormEl');
var cityButtonEl = document.querySelector('#cities-button');
var cityInputEl = document.querySelector('#button-addon2');

//APIs Key for https://openweathermap.org/api //
 var apikey = "e70a4a2e44d64a3b86dcb3ffc5b9cf15" ;
    console.log(apikey);

// APIs  calls for Weather Attributes //
var city = "" ;
https://api.openweathermap.org/data/2.5/weather?q=London&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial"



console.log(queryURL);