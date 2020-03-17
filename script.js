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
            for (let i=0; i<articles.length; i++) {
                article =articles[i];
                news_item = {
                    'title': article['title'],
                    'content': article['content']
                }
                container.innerHTML += '<div id=' + i +' class="news_item">' + article["title"] + '</div>';
                console.log("Article: " + article['title']);
            }
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
            container.innerHTML = "Weather: " + api_response['weather'][0]['description'];
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

