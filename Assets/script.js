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

                getFiveDay(lat, lon)
                // $('.card-properties').html(widget);
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
    $('.city-name').text(data.name)+

            "<p style='text-transform: uppercase;'>"+data.weather[0].description+"<img src=http://openweathermap.org/img/wn/"+data.weather[0].icon+".png></img> </p>" +
            $('.live-temperature').text(data.main.temp) +
            "<p> Humidity : "+data.main.humidity+" % </p>" +
            "<p> Windspeed : "+data.wind.speed+ " mph </p>";
};

function getFiveDay(lat, lon) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e70a4a2e44d64a3b86dcb3ffc5b9cf15&units=imperial`,
        type: "GET" ,
        statusCode: {
                404: function() {
                alert( "City not found" );
                }
            },
        dataType: "json",
        success: function (fiveData){
            console.log(fiveData);
           
            
            
        }
    });

}



// return "<p><strong>Weather</strong>: "+data.weather[0].main+"</p>" ;//