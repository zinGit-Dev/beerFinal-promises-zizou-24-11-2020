function drawCard(beers) {

    const containerCard = document.querySelector("#containerFinalCard")

    const beerDiv = document.createElement("div")
    beerDiv.className = "card"

    beerDiv.innerHTML = `
         
        <div>
            <img src="${beers.image_url ? beers.image_url : "./assets/empty-beer-2.jpg"}" alt="${beers.name}">
        </div>
        <div class="descriptionBeer">
            <div class="name">${beers.name}</div>
            <div><span class="bold">Abv: </span>${beers.abv}% </div>
            <div><span class="bold">Tagline: </span>${beers.tagline}</div>
            <div><span class="bold">First_brewed: </span>${beers.first_brewed}</div>
            <div><span class="bold">Description: </span><p>${beers.description}
            </p></div>
            <div><span class="bold">Brewers_tips:</span> ${beers.brewers_tips} </div>
            <div><span class="bold">Food_pairing: </span>${beers.food_pairing}
               
            <div><span class="bold">Contributed_by: </span>${beers.contributed_by}</div>
            <div id="mapid"></div>
           
        </div>
    `
    containerCard.append(beerDiv);
    console.log(beers)
}

let long = 0
let length = 0
let place_name = ""

//esta funcion pinta el mapa
function getMap() {

    // const city = ["Boston", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral",
    //     "Carrollton", "Las Vegas", "Layton",

    //     "rome", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport",
    //     "madrid", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield",
    //     "casablanca", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma",
    //     "london", "paris", "Temecula", "Tempe", "Thornton", "oslo", "Toledo", "Topeka", "Torrance", "Trenton",
    //     "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", , "Victorville", "Virginia Beach",
    //     "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City",
    //     "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

    // const random = Math.floor(Math.random() * city.length);

    // const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city[random]}.json?types=place&access_token=pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog`

    const mymap = L.map('mapid').setView([long, length], 13);
    const marker = L.marker([long, length]).addTo(mymap); //crea el marcador

    console.log("el valor de longitud antes", long)

    marker.bindPopup(` First Brewed in in ${first_brewed}  in ${place_name}`).openPopup();

    // marker.bindPopup(` First Brewed in x  in ${place_name}`).openPopup();

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog'
    }).addTo(mymap);

    // console.log("esta es la url=>", urlMap)
    // console.log("este es el random=>", random)
    // console.log("este es el valor de longitud=>", long)
    // console.log("este es el valor de latitude=>", length)
    // console.log("esta es la ciudad=>", place_name)

}


//en el fetch llamamos getMap ya con las coordenadas
function fnMap() {
    const city = ["Boston", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral",
        "Carrollton", "Las Vegas", "Layton",

        "rome", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport",
        "madrid", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield",
        "casablanca", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma",
        "london", "paris", "Temecula", "Tempe", "Thornton", "oslo", "Toledo", "Topeka", "Torrance", "Trenton",
        "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", , "Victorville", "Virginia Beach",
        "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City",
        "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];
    const random = Math.floor(Math.random() * city.length);

    const urlMap = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city[random]}.json?types=place&access_token=pk.eyJ1IjoiemluZ2l0LWRldiIsImEiOiJja2k0ZHV2NjEyZnplMnptcGMxa2JoZmp3In0.DF8-X_GwEWZC7pOUsndbog`

    

    return fetch(urlMap)
        .then((res) => res.json())
        .then((data) => {

            console.log("datos de la urlMap", data)
            long = data.features[0].geometry.coordinates[1];
            length = data.features[0].geometry.coordinates[0];
            place_name = data.features[0].place_name;

            console.log("este es el valor de longitud=>", long)
            console.log("este es el valor de latitude=>", length)
            console.log("esta es la ciudad=>", place_name)
             getMap()
        });

}

function getRandomBeer() {

    const id = new URLSearchParams(window.location.search).get('id');

    const url = `https://api.punkapi.com/v2/beers/random`;

    console.log(url)
    return fetch(url)
        .then(res => res.json())
        .then((apiData) => {
            console.log(apiData)
            first_brewed = apiData[0].first_brewed
            console.log("first_brewed es los siguiente=>", first_brewed)
            //lo siguiente es así porque esta pagina se despliega clicando desde un single beer definida desde allBeers,no?
            drawCard(apiData[0])
           
            fnMap()
        });
}

getRandomBeer()