import * as Carousel from "./Carousel.js";


const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.    
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const body = document.querySelector("body");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_bCsOnkjIulOENp6PudZAoyJUVaTO6pTLlZBUmVcjRmxMx3d5ZmiAlNXDoSZgDtPz";
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

async function initialLoad() {
    let response = await fetch("https://api.thecatapi.com/v1/breeds?limit=200&page=0")
    let breeds = await response.json()


    for (let breed of breeds) {
        let option = document.createElement("option")
        option.setAttribute("value", breed.id)
        option.innerText = breed.name + " : " + breed.origin
        breedSelect.appendChild(option)
        // console.log(breed)
    }
}
initialLoad()

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */


breedSelect.addEventListener("change", async (e) => {
    Carousel.clear();
    console.log("hello :", e.target.value)
    let url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${e.target.value}&api_key=${API_KEY}`

//     let response = await fetch(url)
//   let data = await response.json()

// 4. Change all of your fetch() functions to axios!

    let response = await axios.get(url);
    let data =  await response.data;

    for (let item of data) {
        let src = item.url
        let alt = item.breeds[0].name
        let id = item.id
        let carouselItem = Carousel.createCarouselItem(src, alt, id)
        Carousel.appendCarousel(carouselItem)

    }
    let description = data[0].breeds[0].description
    // console.log(description)
    infoDump.innerText = description
}
);


// 5 Add Axios interceptors to log the time between request and response to the console.
// Hint: you already have access to code that does this!
// Add a console.log statement to indicate when requests begin.
// As an added challenge, try to do this on your own without referencing the lesson material.

// axios request interceptor
axios.interceptors.request.use(
  (request) => {
    //Request Time
    console.log("Request sent at :" + new Date());

    // 6. Create a progress bar to indicate the request is in progress.
    // The progressBar element has already been created for you.
    // You need only to modify its width style property to align with the request progress.
  

    progressBar.style.width = "50%"

    //In your request interceptor, set the body element's cursor style to "progress."
    body.style.cursor = "progress";

    return request;  
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


// // axios response interceptor
axios.interceptors.response.use (
  (response) => {
    // Response Time 
    console.log('response received at :  ',  new Date());

    // In your response interceptor, set the width of the progressBar element to 0%.
     progressBar.style.width = "0%"

    //In your response interceptor, set the body element's cursor style to "default."
     body.style.cursor = "default";
    return response;
  },
  (error) => {
    // Failure: anything outside of status 2XX
    console.log('Unsuccessful response...');
    throw error;
  }
);
 

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

export async function favourite(imgId) {
  console.log("Your favourite pet is ", imgId)
}
