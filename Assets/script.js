// Document Variables //
var cityFormEl = document.querySelector('#cityFormEl');
var cityInputEl = document.querySelector('#button-addon2');
var cityButtonEl = document.querySelector('#cities-button');

// Setting Todays and Weekly Days //
$("#thedate").text(moment().format("M/DD/YYYY"));
$("#day-forecast").text(moment().add(1, 'day').format("M/DD/YYYY"));
$("#day-forecast2").text(moment().add(2, 'day').format("M/DD/YYYY"));
$("#day-forecast3").text(moment().add(3, 'day').format("M/DD/YYYY"));
$("#day-forecast4").text(moment().add(4, 'day').format("M/DD/YYYY"));
$("#day-forecast5").text(moment().add(5, 'day').format("M/DD/YYYY"));

//APIs Key for https://openweathermap.org/api //
 var apikey = "e70a4a2e44d64a3b86dcb3ffc5b9cf15" ;
    console.log(apikey);
// example https://api.openweathermap.org/data/2.5/weather?q=London&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial //
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}=imperial&units=imperial"
console.log(queryURL);
// Main function//

var formSubmit = function(event){
    event.preventDefault();
    var cities = cityInputEl.value.trim();
    if(cities){
        localWeather(cities);
    }else{
        alert("Please select a city");
    }
    
}

// APIs  calls for Weather Attributes //
var localWeather = function(cities){
    var apikey = "e70a4a2e44d64a3b86dcb3ffc5b9cf15" ;
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&units=imperial&appid=${apiKey}`

    fetch(queryURL).then(function(response){
        response.json().then(function(data){
            displayForm(data, cities);
        });
    })
};

