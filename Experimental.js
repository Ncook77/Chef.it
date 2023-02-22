const go = document.querySelector("#generateButton");
let wrapper = document.querySelector("#restCards");
//const location = document.querySelector("#location");
const reviewStars = document.querySelectorAll(".fa-star");
const priceButtons = document.querySelectorAll(".priceOval");
const cuisineInput = document.querySelector("#cuisineType");
const searchButtons = document.querySelectorAll(".searchButton");
const cuisineButtons = document.querySelectorAll(".cuisineButton");
const resetButton = document.querySelector("#resetButton");
const resultTitle = document.querySelector("#resultTitle");
const loading = document.querySelector("#loading");

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '6925d47d9amshbc12770d620f549p155182jsn4a93fdb284be',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

//reset filters and generated restaurants section
resetButton.addEventListener("click", e => {
  var restCards = document.querySelector("#restCards");
  restCards.innerHTML = "";
  resultTitle.classList.add("hidden");
  cuisineInput.value = "";
  let locText = document.getElementById("resLocation");
  locText.value = "";
  priceButtons.forEach((p) => {
    p.classList.remove("checked");
  })
  for (let i = 1; i <= 5; i++) {
    var s = document.querySelector("#star-" + i);
    s.classList.add("unchecked");
    s.classList.remove("starChecked");
  }
  cuisineButtons.forEach((b) => {
    b.classList.remove("checked");
  })
  searchButtons.forEach((button) => {
    startIdx = button.innerHTML.indexOf(`<h6 class="text-center">`) + 24;
    endIdx = button.innerHTML.indexOf(`</h6>`);
    resultType = button.innerHTML.slice(startIdx, endIdx);
    button.classList.remove("hidden");
  })
})

//price selector
let selectedPrice = ""
priceButtons.forEach((price) => {
  price.addEventListener("click", e => {
    //get selected price range
    selectedPrice = price.innerHTML;
    //change color of buttons
    priceButtons.forEach((p) => {
      if (p === price) {
        p.classList.add("checked");
      }
      else {
        p.classList.remove("checked");
      }
    })
  })
})

//review selector
let selectedReview = 0;
reviewStars.forEach((star) => {
  star.addEventListener("click", e => {
    //get selected number of stars
    selectedReview = parseInt(star.id.slice(-1));
    // change color of stars
    for (let i = 1; i <= 5; i++) {
      var s = document.querySelector("#star-" + i);
      if (i <= selectedReview) {
        s.classList.add("starChecked");
        s.classList.remove("unchecked");
      } else {
        s.classList.add("unchecked");
        s.classList.remove("starChecked");
      }
    }
  })
})

//cuisine input text search
cuisineInput.addEventListener("input", e => {
  searchButtons.forEach((button) => {
    startIdx = button.innerHTML.indexOf(`<h6 class="text-center">`) + 24;
    endIdx = button.innerHTML.indexOf(`</h6>`);
    resultType = button.innerHTML.slice(startIdx, endIdx);
    if (resultType.includes(document.getElementById("cuisineType").value.toLowerCase())) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  })
})

let selectedCuisine = "";
//cuisine buttons
searchButtons.forEach((button) => {
  button.addEventListener("click", e => {
    startIdx = button.innerHTML.indexOf(`<h6 class="text-center">`) + 24;
    endIdx = button.innerHTML.indexOf(`</h6>`);
    resultType = button.innerHTML.slice(startIdx, endIdx);
    let btn = document.querySelector("#" + resultType + "Cuisine");
    if (btn.classList.contains("checked")) {
      btn.classList.remove("checked");
      selectedCuisine = "";
    }
    else {
      cuisineButtons.forEach((b) => {
        if (b === btn) {
          b.classList.add("checked");
          selectedCuisine = resultType;
        }
        else {
          b.classList.remove("checked");
        }
      })

    }
    console.log(selectedCuisine);
  })
})

//add html for generated restaurants
function eachOne(restaurants) {
  let str = `<div class="col-6">
            <div class="card">
              <div class="row no-gutters">
                <div class="col-sm-5">
                <img class="card-img cardImage"
                  src="${restaurants.photo.images.small.url}">
              </div>
              <div class="col-sm-7">
                <div class="card-body cardContent">
                  <h5 id="first" class="card-title">${restaurants.name}</h5>
                  <p>
                    <span class="material-symbols-outlined">pin_drop</span>
                    ${restaurants.address}
                  </p>
                  <div>
                  <p>
                  <span class="material-symbols-outlined">grade</span>
                  Rating: ${restaurants.raw_ranking.slice(0, 4)}
                  </p>
                  <p><span class="material-symbols-outlined">grade</span>Number of Ratings: ${restaurants.num_reviews}</p>
                  <p>
                  <span class="material-symbols-outlined">payments</span>
                  Price Level: ${restaurants.price_level}</p>
                  <p><a href="${restaurants.web_url}" target="_blank">Visit Website</a>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                  <a href="${restaurants.write_review}" target="_blank">Write a Review</a></p>
                  <p class="card-text"> </p>
                </div>
              </div>
            </div>
          </div>
        </div>`

  wrapper.innerHTML += str;
}

let priceDict = {
  "": ["$", "$ - $$", "$$", "$$ - $$$", "$$$", "$$$ - $$$$", "$$$$"],
  "$": ["$", "$ - $$"],
  "$$": ["$$", "$ - $$", "$$ - $$$"],
  "$$$": ["$$$", "$$ - $$$", "$$$ - $$$$"],
  "$$$$": ["$$$$", "$$$ - $$$$"]
}

go.addEventListener("click", async (e) => {
  //get restaurants from api by location
  let locText = document.querySelector(".form-control").value;
  if (locText === "") {
    alert("Please enter a location.")
  } else {
    //loading
    wrapper.innerHTML = "";
    resultTitle.classList.add("hidden");
    loading.classList.remove("hidden");
    let start = 0;
    let rest = [];
    const site1 = await fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${locText}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, options);
    const myAPI1 = await site1.json();
    console.log(myAPI1);
    const geos = await myAPI1.data.filter(obj => obj.result_type === "geos");
    console.log(await geos);
    const locationID = await geos[0].result_object.location_id;
    console.log(await locationID);
    const site = await fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list?location_id=${locationID}&restaurant_tagcategory=10591&restaurant_tagcategory_standalone=10591&currency=USD&lunit=km&limit=30&open_now=false&lang=en_US`, options)
    const myAPI = await site.json();
    console.log(await myAPI)

    //cuisine, price, rating filter
    myAPI.data.forEach(async (r) => {
      if (r.hasOwnProperty("cuisine")) {
        cuisines = [""];
        temp = r.cuisine;
        temp.forEach(async (c) => {
          cuisines.push(c.name.toLowerCase());
        })

        if (parseInt(r.rating) >= selectedReview && cuisines.includes(selectedCuisine) && priceDict[selectedPrice].includes(r.price_level)) {
          rest = rest.concat(r);
        }
      }
    })
    //update generated restaurants
    loading.classList.add("hidden");
    resultTitle.classList.remove("hidden");
    rest.forEach((restaurant) => {
      eachOne(restaurant)
    })

  }
})

// console.table(rest);