


let num = 1


function drawCard(beersData) {

    beersData.forEach((beer) => {
        const containerCard = document.querySelector("#containerFinalCard")

        const beerDiv = document.createElement("div")
        beerDiv.className = "card"

        beerDiv.innerHTML = `
            <div>
                <img src="${beer.image_url ? beer.image_url : "./assets/empty-beer-2.jpg"}" alt="${beer.name}">
            </div>
            <div class="descriptionBeer">
                <div class="name">${beer.name}</div>
                <div>abv: ${beer.abv}%</div>
                <div><p>${beer.description}
                </p></div>
                <div> <a href="oneBeer.html?id=${beer.id}" target="_blank">++</a></div>
            `
        containerCard.append(beerDiv);
    });


}
// const beerUrl = "https://api.punkapi.com/v2/beers"

let paginationUrl = `https://api.punkapi.com/v2/beers?page=${num}&per_page=25`


function getBeers() {
    return fetch(paginationUrl)
        .then((res) => res.json())
        .then((beersData) => {
            const formattedBeers = beersData.map((beer) => {

                return {
                    id: beer.id,
                    name: beer.name,
                    abv: 4.5,
                    description: beer.description,
                    image_url: beer.image_url,
                }

            });
            return formattedBeers
        });
}
getBeers()
    .then(beersData => {
        console.log(beersData)
        drawCard(beersData)
    })
// function disabledButton(){

//     document.getElementById("load").disabled = true;
// }

    function handleNextPage() {

        //  beersData.length ? num = num + 1 : disabledButton();
        num=num+1;

        console.log("numero=>", num)
        paginationUrl = `https://api.punkapi.com/v2/beers?page=${num}&per_page=25`
    
        console.log("pagination=>", paginationUrl)
    
        getBeers()
        .then(beersData => {
            console.log(beersData)
            drawCard(beersData)
        })
           
          
    }






const load = document.querySelector("#load")

load.addEventListener("click", handleNextPage)