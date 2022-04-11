// Setting Todays and Weekly Days //
$("#thedate").text(moment().format("M/DD/YYYY"));
$("#day-forecast").text(moment().add(1, 'day').format("M/DD/YYYY"));
$("#day-forecast2").text(moment().add(2, 'day').format("M/DD/YYYY"));
$("#day-forecast3").text(moment().add(3, 'day').format("M/DD/YYYY"));
$("#day-forecast4").text(moment().add(4, 'day').format("M/DD/YYYY"));
$("#day-forecast5").text(moment().add(5, 'day').format("M/DD/YYYY"));


$(document).ready(function(){
$('#submitWeather').click(function(){
    var city = $('#button-city').val();
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
                var widget = show(data);
                $('.card-properties').html(widget);
                $('#button-city').val('');

                
            }
        });

        } else{
            alert('Please enter a City');
        }
    });
});

function show(data){
    return  $('.city-name').text(data.name)+
            "<p style='text-transform: uppercase;'>"+data.weather[0].description+"<img src=http://openweathermap.org/img/wn/"+data.weather[0].icon+".png></img> </p>" +
            "<p> Temperature : "+data.main.temp+" °F </p>" +
            "<p> Humidity : "+data.main.humidity+" % </p>" +
            "<p> Windspeed : "+data.wind.speed+ " mph </p>";
};


// return "<p><strong>Weather</strong>: "+data.weather[0].main+"</p>" ;//