const randomButton = document.querySelector("#randomRollButton");
let wrapper = document.querySelector("#restCards");

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '6925d47d9amshbc12770d620f549p155182jsn4a93fdb284be',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

function eachOne(restaurants) {
  let str = `<div class="col-3">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${restaurants.photo.images.small.url}">
                <div class="card-body">
                  <h5 class="card-title"> ${restaurants.name}</h5>
                  <p>
                    <span class="material-symbols-outlined">pin_drop</span>
                    ${restaurants.address}
                  </p>
                  <p><span class="material-symbols-outlined">grade</span>Rating: ${restaurants.raw_ranking.slice(0, 4)}</p>
                  <p><span class="material-symbols-outlined">grade</span>Number of Ratings: ${restaurants.num_reviews}</p>
                  <p><span class="material-symbols-outlined">payments</span>Price Level: ${restaurants.price_level}</p>
                  <p><a href="${restaurants.web_url}" target="_blank">Visit Website</a></p>
                  <p><a href="${restaurants.write_review}" target="_blank">Write a Review</a></p>
                </div>
              </div>
            </div>`

  wrapper.innerHTML += str;
}

randomButton.addEventListener("click", async (e) => {
  wrapper.innerHTML = "";
  loading.classList.remove("hidden");
  let start = 0;
  let rest = [];
  loc = [187147, 298184, 32655, 187791, 186338, 294212, 255060, 187497, 28970, 303506, 150807, 294197, 293916, 304551, 155004]
  index = Math.floor(Math.random() * loc.length)
  randomLoc = loc[index]
  const site = await fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${randomLoc}&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=30&open_now=false&lang=en_US`, options)
  const myAPI = await site.json();
  console.log(myAPI);
  myAPI.data.forEach(async (r) => {
    if (parseInt(r.rating) >= 4 && rest.length < 4) {
      rest = rest.concat(r);
    }
  })

  //update generated restaurants
  wrapper.innerHTML = "";
  loading.classList.add("hidden");
  rest.forEach((restaurant) => {
    eachOne(restaurant)
  })
})

