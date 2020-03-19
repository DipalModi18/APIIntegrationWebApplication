let countries = {
    'us': {
        'name': 'USA',
        'capital': 'Washington, D.C.',
        "lon": -77.036369,
        "lat": 38.895111
    },
    'ca': {
        'name': 'Canada',
        'capital': 'Ottawa',
        "lon": -75.69812,
        "lat": 45.411171
    },
    'in': {
        'name': 'India',
        'capital': 'New Delhi',
        "lon": 77.23114,
        "lat": 28.61282
    },
    'au': {
        'name': 'Australia',
        'capital': 'Canberra',
        "lon": 149.128067,
        "lat": -35.283459
    },
    'ph': {
        'name': 'Philippines',
        'capital': 'Manila',
        "lon": 120.982201,
        "lat": 14.6042
    }
}

let module_name = "script.js";

function get_api_results() {
    console.log(log_message('info', "Fetching API Results..."))
    document.getElementById('news_data').innerHTML = "";
    document.getElementById('weather_data').innerHTML = "";
    let country = document.getElementById('country_selection').value;
    call_google_news_api(country);
    call_open_weather_api(countries[country]);
}

function call_google_news_api(country) {
    let req = new XMLHttpRequest();
    console.log(log_message('info', "Fetching News for country: " + country));
    req.open("GET", " http://newsapi.org/v2/top-headlines?apiKey=06ef9d950a03436b82d9e7845d250c5c&country=" + country);
    req.send();
    req.onload = () => {
        
        if(req.status === 200)
        {
            let articles = JSON.parse(req.response)['articles'];
            var container = document.getElementById('news_data');
            let innerHTML = '<div class="w3-col l7 s12">'
            // let innerHTML = "";
            for (let i=0; i<articles.length; i++) {
                article =articles[i];
                
                // innerHTML += '<p>' + article['title'] + '</p>';
                innerHTML += '<div class="w3-card-4 w3-margin w3-white">' + 
                                '<img src=' + article['urlToImage'] + ' alt="Nature" style="width:100%">' + 
                                '<div class="w3-container"> ' +
                                    '<h3><b>' + article["title"] + '</b></h3>' +
                                    '<h5>' + article['description'] + '<span class="w3-opacity">' + article['publishedAt'] + '</span></h5>' +
                                '</div>' +   
                                '<div class="w3-container">' +  
                                    '<p>' + article['content'] + '</p> ' +
                                    '<div class="w3-row"> ' +
                                        '<div class="w3-col m8 s12"> ' +
                                            '<p><a href=' + article['url'] + 'class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></a></p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                    // Reference: https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_blog&stacked=h
                    console.log(log_message('debug', 'Article[' + i + ']: ' + article['title']));
            }
            innerHTML += '</div>';
            container.innerHTML = innerHTML;
            console.log(log_message('info', 'Received '+ articles.length + ' articles'));
        }
        else
        {
            console.log(log_message('error', 'error ${req.status} ${req.statusText}'));
        }
    }
}

function call_open_weather_api(country) {
    let req = new XMLHttpRequest();
    console.log(log_message('info', 'Calling Weather API for lat: ' + country['lat'] + ' & lon: ' + country['lon']));
    let api = "https://api.openweathermap.org/data/2.5/weather?lat=" + country['lat'] + "&lon=" + country['lon'] + "&appid=03993e20a50405fbc75f12d193719f09";
    req.open("GET", api);
    req.send();
    req.onload = () => {
        
        if(req.status === 200)
        {
            let api_response = JSON.parse(req.response);
            var container = document.getElementById('weather_data');
            container.innerHTML =
                    '<div class="weather">' +
                        '<div class="current">' +
                            '<div class="info">' +
                                '<div>&nbsp;</div>' +
                                '<div class="city"><small><small>CITY:</small></small>' + api_response['name']+'</div>' +
                                '<div class="temp">'+api_response['main']['temp']+ '<small>K</small></div>' +
                                '<div class="wind"><small><small>WIND:</small></small>' +api_response['wind']['speed']+'metres/sec</div>' +
                                
                                '<div>&nbsp;</div>' +
                            '</div>' +
                            '<div class="icon">' +
                                '<span class="wi-day-sunny"></span>' +
                            '</div>' +
                        '</div>' +
                       
                    '</div>';
            console.log(log_message('info', 'Received Weather data: ' + api_response['name'] + ' Temperature: ' + api_response['main']['temp']));
        }
        else
        {
            console.log(log_message('error', 'error ${req.status} ${req.statusText}'));
        }
    }
}

function generate_dropdown() {
    let select = document.getElementById("country_selection");
    for(var key in countries) {
        var element = document.createElement("option");
        element.value = key;
        element.textContent = countries[key]['name'];
        element.className = "w3-dropdown-content w3-bar-block w3-border";
        select.appendChild(element);
    }
}

function log_message(log_level, message) {
    return new Date() + " : " + module_name + " : " + log_level.toUpperCase() + " : " + message;
}