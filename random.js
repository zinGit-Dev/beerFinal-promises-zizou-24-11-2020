function drawCard(beers) {


    const containerCard = document.querySelector("#containerFinalCard")

    const beerDiv = document.createElement("div")
    beerDiv.className = "card"

    beerDiv.innerHTML = `
         
        <div>
            <img src="${beers.image_url?beers.image_url: "./assets/empty-beer-2.jpg"}" alt="${beers.name}">
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
           
        </div>
    `
    containerCard.append(beerDiv);
    console.log(beers)
}



function getRandomBeer() {

    const id = new URLSearchParams(window.location.search).get('id');


   

     const url = `https://api.punkapi.com/v2/beers/random`;

console.log(url)
    return fetch(url)
        .then(res => res.json())
        .then((apiData) => {
            console.log(apiData)
            drawCard(apiData[0])
        });


}

getRandomBeer()