// Setting Todays Date //
$("#thedate").text(moment().format("M/DD/YYYY"));


// Calling the Main Function

$(document).ready(function(){
getHistory()
$('#submitWeather').click(function(){
    var city = $('#button-city').val();
    saveCity(city)
    if(city !== ''){

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial',
            type: "GET" ,
            statusCode: {
                    404: function() {
                    alert( "City not found" );
                    }
                },
            dataType: "json",
            success: function (data){
                console.log(data);
                show(data);

                // Lat and Lon variables setting value from the first API to use them in the second, and third API //
                var lat = data.coord.lat
                var lon = data.coord.lon

                // Call for uvIndex //
                getuvIndex(lat, lon)

                // Call for Week Forecast
                getFiveDays(lat, lon)
                
                $('#button-city').val('');

                
            }
        });

        } else{
            alert('Please enter a City');
        }
    });
});

// Save History of previous searchs //

function saveCity(value) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(value)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    getHistory()
}

// Local Storage //

function getHistory() {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        $('#cities-button').text('No History')
    } else {
        $('#cities-button').text('')
        for (var i = 0; i < storage.length; i++) {
            var historyBtn = document.createElement('button')
            console.log(storage[i]);
            historyBtn.textContent = storage[i]
            historyBtn.setAttribute('class', 'btn btn-primary')
            $('#cities-button').append(historyBtn)
        }
    }
}

// Show Cities weather parameters //
// Adding attributes from the API directly to HTML classes //
function show(data){
  
    $('.iconWeather').attr('src','') +
    $('.city-name').text(data.name)+
    $('.iconWeather').text(data.weather.icon)+
    $('.live-temperature').text(data.main.temp) +
    $('.live-humidity').text(data.main.humidity) +
    $('.live-wind').text(data.wind.speed);
    
    
}

// Show City uvIndex from second API //
function getuvIndex(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial`,
        type: "GET" ,
        statusCode: {
                404: function() {
                alert( "City not found" );
                }
            },
        dataType: "json",
        success: function (uviData){
            console.log(uviData);
            $(".live-uvi").text(uviData.current.uvi);  

        }
    });

}

// Deploy 5-Day Forecast with third API //
function getFiveDays (lat, lon){
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial`,
        type: "GET" ,
        statusCode: {
                404: function() {
                alert( "City not found" );
                }
            },
        dataType: "json",
        success: function (getFive){
            console.log(getFive);
            let forecast = getFive.list
            for (var i=5; i< getFive.length; i++){
            var getFive = forecast[i]
            
            var weatherTemp = document.createElement("p");
            weatherTemp.classList = "card-text";
            weatherTemp.textContent = getFive.list.main.temp + "F";

            $('.weatherFive').append(weatherTemp);

            var weatherHum = document.createElement('p');
                weatherHum.classList = "card-text";
                weatherHum.textContent = getFive.list.main.humidity + "%"

                $('.weatherFive').append(weatherHum);

            }
        }  
    });
}




