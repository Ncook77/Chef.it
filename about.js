console.log("Script running");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const button1 = document.querySelector("#button1");
const imageHolderDiv = document.querySelector("#imageholder");

const button2 = document.querySelector("#button2");
const imageHolderDiv2 = document.querySelector("#imageholder2");

const button3 = document.querySelector("#button3");
const imageHolderDiv3 = document.querySelector("#imageholder3");

const myKey = "EVLvAuh2npwFNxGPlexsjNPdckjOosZa";


button1.addEventListener("click", async (e) => {
  console.log("button pressed");
  const myQuery = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=breakfast`;

  const response = await fetch(myQuery);
  const myJson = await response.json(); 
    
  const numberOfGifs = myJson.data.length; 
  const randomIndex = getRandomInt(numberOfGifs);
    
  const gifURL = myJson.data[randomIndex].images.downsized.url;
  console.log(gifURL);

  imageHolderDiv.innerHTML = `<img src = "${gifURL}"width="200"/>`;  
});

button2.addEventListener("click", async (e) => {
  console.log("button pressed");
  const myQuery = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=lunch`;

  const response = await fetch(myQuery);
  const myJson = await response.json(); 
    
  const numberOfGifs = myJson.data.length; 
  const randomIndex = getRandomInt(numberOfGifs);
    
  const gifURL = myJson.data[randomIndex].images.downsized.url;
  console.log(gifURL);

  imageHolderDiv2.innerHTML = `<img src = "${gifURL}"width="200"/>`;  
});

button3.addEventListener("click", async (e) => {
  console.log("button pressed");
  const myQuery = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=dinner`;

  const response = await fetch(myQuery);
  const myJson = await response.json(); 
    
  const numberOfGifs = myJson.data.length; 
  const randomIndex = getRandomInt(numberOfGifs);
    
  const gifURL = myJson.data[randomIndex].images.downsized.url;
  console.log(gifURL);

  imageHolderDiv3.innerHTML = `<img src = "${gifURL}"width="200"/>`;  
});
