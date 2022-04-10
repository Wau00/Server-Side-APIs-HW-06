// Document Variables //
var cityFormEl = document.querySelector('#cityFormEl');
var cityInputEl = document.querySelector('#button-addon2');
var weatherInfoEl = document.querySelector('#weatherInfo');
var citySearchInput = document.querySelector('#city');
var cityButtonEl = document.querySelector('#cities-button');

// Setting Todays and Weekly Days //
$("#thedate").text(moment().format("M/DD/YYYY"));
$("#day-forecast").text(moment().add(1, 'day').format("M/DD/YYYY"));
$("#day-forecast2").text(moment().add(2, 'day').format("M/DD/YYYY"));
$("#day-forecast3").text(moment().add(3, 'day').format("M/DD/YYYY"));
$("#day-forecast4").text(moment().add(4, 'day').format("M/DD/YYYY"));
$("#day-forecast5").text(moment().add(5, 'day').format("M/DD/YYYY"));

//APIs Key for https://openweathermap.org/api //


// Main function//

var formSubmit = function(event){
    event.preventDefault();
    var cities = cityInputEl.value.trim();
    if(cities){
        localWeather(cities);
        cityInputEl.value ="";
    }else{
        alert("Please select a city");
    }

}

// APIs  calls for Weather Attributes //
var localWeather = function(cities){
    var theKey = "e70a4a2e44d64a3b86dcb3ffc5b9cf15" ;
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&units=imperial&appid=${theKey}`

    console.log(queryURL);
    fetch(queryURL).then(function(response){
        response.json().then(function(data){
            displayForm(data, cities);
        });
    })
};

var displayForm = function(weather, searchCities){
weatherInfoEl.textContent="";
citySearchInput.textContent=searchCities;


}





cityFormEl.addEventListener("click", formSubmit);

console.log(weatherInfo);
console.log(city);

