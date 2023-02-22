const filter = document.querySelector("#filter");
const review = document.querySelector("#review");
const price = document.querySelector("#price");
const cuisine = document.querySelector("#cuisine");
const restuarant = document.querySelector("#restuarant");
const navBar = document.querySelector("#nav");
const go = document.querySelector("#generateButton");


// location search function
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c634488e32msh30d67e07d0f4273p16b218jsn79eceae1fe4a',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

 

//let response = fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=paris&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, options)
//.then(response => response.json())
//.then(response => console.log(response))
//.catch(err => console.error(err));
//.then(let restaurantList = response.json())
//.then(restaurantList)

// Displays specific restaurant details by longitude and latitude

// fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US1`, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


// const retrieveName = response.data.result_type("restuarant").result_object.establishment_types.name;//find the proper call for name
//Discuss with frontend other criteria to include in results
// const retrieveReview = response.data.review;
// review.innerHTML += double(retrieveReview);
// const retrieveCuisine = document.response.data.result_type("restuarant").result_object.establishment_types.name;
// const retrievePrice = document.response.data.price;
// let locationx = paris
 // let resLocation = document.getElementById("resLocation").value;
// let location = "paris";
go.addEventListener("click", (e) => {
  // if(retrieveCuisine === cuisine.value && retrieveReview >= review.value && retrievePrice <= price.value){
     let response = fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=paris&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, options)
  .then(response => response.json());
     .then(response => console.log(response))
     .catch(err => console.error(err));
})    

                         
    // response.then((e) => {
    //   response.json()
    //};
  //);
  //price.innerHMTL += retrievePrice;
  // review.;
//}

  // restuarant.innerHTML = response.data.name;
  // }

// if (parseInt(r.rating) >= selectedReview && cuisines.includes(selectedCuisine) || parseInt(r.rating) == 0 || cuisines === "") {
//         rest = rest.concat(r);
//       }
}); 



 // function eachOne(restaurants){
  //   let str = ''
  //   wrapper.innerHTML = str;
  // }