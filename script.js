$(function () {
    $("#myForm").submit(function (e) {
        e.preventDefault()

        var city = $("#city").val()

        getWeather(city)
    })
});

function getWeather(city) {

    $('.weather-temperature').openWeather({
        key: '82b9e3a40dda5bace93f565573d71d16',
        city: city,
        descriptionTarget: '.weather-description',
        windSpeedTarget: '.weather-wind-speed',
        minTemperatureTarget: '.weather-min-temperature',
        maxTemperatureTarget: '.weather-max-temperature',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        sunsetTarget: '.weather-sunset',
        placeTarget: '.weather-place',
        iconTarget: '.weather-icon',
        customIcons: '/open-weather-master/src/img/icons/weather/',
        success: function (data) {
            // show weather
            $('.weather-wrapper').show();
            console.log(data);
        },
        error: function (data) {
            console.log(data.error);
            $('.weather-wrapper').remove();
        }
    });
}




function openNav() {
    document.getElementById("mobile__menu").style.width = "100%"
}

function closeNav() {
    document.getElementById("mobile__menu").style.width = "0"
}

const locations = ("city");

const city = document.getElementById("city");

const search = document.getElementById("search");

search.onclick = function(){
     const value = city.value;

     const key = locations.value

     console.log(value);

     console.log(key);

     if (value) {
         localStorage.setItem(key, value);
         location.reload
     }


};



