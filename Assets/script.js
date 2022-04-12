// Setting Todays and Weekly Days //
$("#thedate").text(moment().format("M/DD/YYYY"));
$("#day-forecast").text(moment().add(1, 'day').format("M/DD/YYYY"));
$("#day-forecast2").text(moment().add(2, 'day').format("M/DD/YYYY"));
$("#day-forecast3").text(moment().add(3, 'day').format("M/DD/YYYY"));
$("#day-forecast4").text(moment().add(4, 'day').format("M/DD/YYYY"));
$("#day-forecast5").text(moment().add(5, 'day').format("M/DD/YYYY"));




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

                var lat = data.coord.lat
                var lon = data.coord.lon

                getuvIndex(lat, lon)

                getFiveDays(lat, lon)
                
                $('#button-city').val('');

                
            }
        });

        } else{
            alert('Please enter a City');
        }
    });
});

function saveCity(value) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(value)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    getHistory()
}

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

function show(data){
  
    $('.iconWeather').attr('src','') +
    $('.city-name').text(data.name)+
    $('.iconWeather').text(data.weather.icon)+
    $('.live-temperature').text(data.main.temp) +
    $('.live-humidity').text(data.main.humidity) +
    $('.live-wind').text(data.wind.speed);
    
    
}

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




// return "<p><strong>Weather</strong>: "+data.weather[0].main+"</p>" ;//