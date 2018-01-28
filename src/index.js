const key = "f123ec11eb36daac9c3f5ef9a26c5ab6";
function findWeather(zipcode) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + zipcode + "&APPID=" + key + "ee6596241130f193adf1ba90e625cc10",function(json){
        document.getElementById("test").innerHTML = JSON.stringify(json);
    });
}
findWeather("66503");