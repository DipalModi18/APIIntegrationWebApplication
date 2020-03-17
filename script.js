let countries = {
    'us': {
        'name': 'USA',
        'capital': ''
    },
    'ca': {
        'name': 'Canada',
        'capital': '',
    },
    'in': {
        'name': 'India',
        'capital': '',
    }
}

function get_api_results() {
    document.getElementById('news').innerHTML = "";
    document.getElementById('weather').innerHTML = "";
    let country = document.getElementById('country_selection').value;
    call_google_news_api(country);
    call_open_weather_api(countries[country]);
}

function call_google_news_api(country) {
    let req = new XMLHttpRequest();
    req.open("GET", " http://newsapi.org/v2/top-headlines?apiKey=06ef9d950a03436b82d9e7845d250c5c&country=" + country);
    req.send();
    req.onload = () => {
        
        if(req.status === 200)
        {
            let articles = JSON.parse(req.response)['articles'];
            var container = document.getElementById('news');
            container.innerHTML = '<div class="w3-col l8 s12">'
            for (let i=0; i<articles.length; i++) {
                article =articles[i];
                
                container.innerHTML += '<div id=' + i +' class="news_item">' + article["title"] + '</div>';
                // container.innerHTML += '<div id="weather"' + i + ' class="w3-card-4 w3-margin w3-white">' 
                        //  '<img src=' + article['urlToImage'] + ' alt="Nature" style="width:100%">' + 
                        // '<div class="w3-container"> ' +
                        //     '<h3><b>' + article["title"] + '</b></h3>' + 
                        //     '<h5>' + article['description'] + '<span class="w3-opacity">' + article['publishedAt'] + '</span></h5>' + 
                        // '</div>' + 
                        // '<div class="w3-container">' + 
                        // '<p>' + article['content'] + '</p> ' +                         
                        //     '<div class="w3-row"> ' + 
                        //         '<div class="w3-col m8 s12"> ' +
                        //             '<p><a href=' + article['url'] + 'class="w3-button w3-padding-large w3-white w3-border"><b>READ MORE »</b></a></p>' + 
                        //         '</div>' +
                        //     '</div>' +
                        // '</div>' + 
                    // '</div>';
                    // Reference: https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_blog&stacked=h
                console.log("Article: " + article['title']);
            }
            container.innerHTML += '</div>';
        }
        else
        {
            console.log('error ${req.status} ${req.statusText}');
        }
    }
}

function call_open_weather_api(country) {
    let req = new XMLHttpRequest();
    req.open("GET", " https://samples.openweathermap.org/data/2.5/weather?appid=03993e20a50405fbc75f12d193719f09&q=" + country['capital']);
    req.send();
    req.onload = () => {
        
        if(req.status === 200)
        {
            let api_response = JSON.parse(req.response);
            var container = document.getElementById('weather');
            container.innerHTML = "Weather Report in Capital " + api_response['name'] + ' of Country ' + country['name'] + ' <br />' +  
                'Overview: ' + api_response['weather'][0]['description'] + ' <br />' +
                'Temperature: ' + api_response['main']['temp'] + '<br />' + 
                'Min Temperature: ' + api_response['main']['temp_min'] + '<br />' + 
                'Max Temperature: ' + api_response['main']['temp_max'] + '<br />' + 
                'Pressure: ' + api_response['main']['pressure'] + '<br />' +
                'Humidity: ' + api_response['main']['humidity'] + '<br />';
        }
        else
        {
            console.log('error ${req.status} ${req.statusText}');
        }
    }
}

function generate_dropdown() {
    let select = document.getElementById("country_selection");
    for(var key in countries) {
        var element = document.createElement("option");
        element.value = key;
        element.textContent = countries[key]['name'];
        select.appendChild(element);
    }
}

