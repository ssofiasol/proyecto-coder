function cargarClima() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://community-open-weather-map.p.rapidapi.com/weather?q=Buenos%20Aires%2Carg&lat=0&lon=0&id=2172797&lang=sp&units=metric&mode=json",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "14e392cb6cmsh02725c342c40955p15fbaajsnc26a90543471"
        }
    };
    
    $.ajax(settings).done(function (response) {
        const humedad = response.main.humidity;
        const temperatura = response.main.temp;
        const descripcion = response.weather[0].description; 
        $('#clima').text(`Clima en Buenos Aires: ${descripcion} / ${temperatura}°C / Humedad: ${humedad}%` );
    });
}

$( document ).ready(function() {
    cargarClima()
    setInterval(cargarClima, 120000)
  });