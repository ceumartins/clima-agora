document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e48974314b742c35fe0b9bd45dc6b41d&units=metric&lang=pt_br`;
        
        let result = await fetch(url);
        let json = await result.json();

        console.log(json);

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,                
                tempIcon: json.weather[0].icon,
                temp_max: json.main.temp_max,
                temp_min: json.main.temp_min,
                windSpeed: json.wind.speed,
                pressure: json.main.pressure,
                humidity: json.main.humidity,
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset
            });            
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.tempmaxInfo').innerHTML = `${json.temp_max} <sup>ºC</sup>`;
    document.querySelector('.tempminInfo').innerHTML = `${json.temp_min} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.pressaoInfo').innerHTML = `${json.pressure} <span>atm</span>`;
    document.querySelector('.umidadeInfo').innerHTML = `${json.humidity} <span>%</span>`;
    document.querySelector('.amanhecerInfo').innerHTML = `${json.sunrise} <span>timestamp</span>`;
    document.querySelector('.pordosolInfo').innerHTML = `${json.sunset} <span>timestamp</span>`;

    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png)`);

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}