pageType = document.querySelector(".title").innerHTML;
favRest = [
  {
    image: `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80`,
    name: "example restaurant",
    address: "123 example dr fresno ca 12345",
    rating: "5.0",
    reviews: "45"
  }
]; // list of objects of favorite restaurants

removed = [];

if (pageType === "chef.it") {
  console.log("home page");
} else if (pageType === "favorites") {
  console.log("favorites");
  cardContainer = document.querySelector(".favRestCards");
  favRest.forEach((rest) => {
    let str = `<div class="col-6">
            <div class="card">
              <div class="row no-gutters">
                <div class="col-sm-5">
                <img class="card-img cardImage" id="${rest.name}Image"
                  src="${rest.image}">
              </div>
              <div class="col-sm-7">
                <div class="card-body cardContent">
                  <h5 id="${rest.name}" class="card-title">${rest.name}</h5>
                  <div>
                    <span class="material-symbols-outlined">pin_drop</span>
                    <span id="${rest.address}">${rest.address}</span>
                    <br>
                  </div>
                  <div>
                  <span id="${rest.rating}">Rating: ${rest.rating}
                  </span>
                  <span class="${rest.reviews}">Number of Ratings:${rest.reviews}</span>
                  <span> 
                  <p class="card-text"> </p>
                </div>
                <div class="heartWrapper">
                  <span class="heart heartFilled" id="${rest.name}" height="20px" width="25px">♥</span>
                </div>
              </div>
            </div>
          </div>
        </div>`
    cardContainer.innerHTML += str;
  })

  hearts = document.querySelectorAll(".heart");
  hearts.forEach((heart) => {
    heart.addEventListener("click", e => {
      if (heart.classList.contains("heartFilled")) {
        heart.classList.remove("heartFilled");
        heart.classList.add("heartUnfilled");
        let name = heart.id;
        for (let i = 0; i < favRest.length; i++) {
          if (favRest[i].name === name) {
            removed.push(favRest[i]);
            favRest.splice(i, 1);
            break;
          }
        }
      } else {
        heart.classList.remove("heartUnfilled");
        heart.classList.add("heartFilled");
        for (let i = 0; i < removed.length; i++) {
          if (removed[i].name === name) {
            removed.splice(i, 1);
            favRest.push();
          }
        }
      }
    })
  })
}


