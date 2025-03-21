



const accessKey = "8bjO2p7B9mESnSDgoDAT9LlSV8TjozOkvlllCrMdGbA";
const count = 15;  //number of photos to fetch in one call
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

let images = [];

const loader = document.querySelector('#loader');
const imageDiv = document.querySelector("#img-container");



async function getPhotos() {
  try{
    const response = await fetch(apiUrl);
    // line no 15 & 16 both work same------------  -    --- - - -   -- -    --  - --- - -   -
    images = await response.json(); // mai direct data ko images array me store kra rha hu
    console.log(images);
    // images.push(...response.json());
    displayPhotos(images);
  } catch(error) {
    console.log(error.message);
  }
}

// function getPhotos() {
//   for (let index = 0; index < 15; index++) {
//     images.push(`http://picsum.photos/500/300.webp?${index}`);   
//   }

//   displayPhotos(images)
// }

getPhotos();

async function displayPhotos(arr) {
  const fragment = document.createDocumentFragment();
  arr.forEach((obj)=>{
    const anchor = document.createElement("a");
    const image = document.createElement("img");

    anchor.href = obj.links.html;
    image.loading = "lazy";
    image.src = obj.urls.small_s3;
    image.title = obj.alt_description;

    anchor.append(image);
    fragment.append(anchor);
  });
  loader.style.display = "none"
  imageDiv.append(fragment);
}

window.addEventListener("scroll", () => {
  window.scrollY + window.innerHeight >= document.body.offsetHeight && loader ? getPhotos() : "";
  // if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
  //   getPhotos();
  // }
});

