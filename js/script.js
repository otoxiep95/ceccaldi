let templateTattoo = document.querySelector("#tattoo_temp").content;
let templateFlash = document.querySelector("#flash_temp").content;
let templateArtwork = document.querySelector("#artwork_temp").content;
let tattoo_gallery_list = document.querySelector(".tattoo_gallery");
let flash_gallery_list = document.querySelector(".flash_gallery");
let artwork_gallery_list = document.querySelector(".artwork_gallery");
let tattoo_link = document.querySelector("#tattoo_link");
let flash_link = document.querySelector("#flash_link");
let artwork_link = document.querySelector("#artwork_link");

tattoo_link.addEventListener('click', displayTattoos);
flash_link.addEventListener('click', displayFlash);
artwork_link.addEventListener('click', displayArtwork);

////////////////// FETCHING TATTOOS ///////////////////////



function fetchTattoos() {

    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    console.log(catid);
    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/tattoos?_embed&"
    if (catid) { // DRY
        endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/tattoos?_embed&categories=" + catid
    }
    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showTattoos);
}

function showTattoos(data) {
    console.log(data)

    data.forEach(showSingleTattoo);
}


function showSingleTattoo(aTattoo){
    let cloneTat = templateTattoo.cloneNode(true);

    if (aTattoo._embedded["wp:featuredmedia"]) { //img is there
     cloneTat.querySelector(".tattoo_img").setAttribute("src", aTattoo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        cloneTat.querySelector(".tattoo_img").remove()
    }



    tattoo_gallery_list.appendChild(cloneTat);
}
////////////////// FETCHING FLASH ///////////////////////
function fetchFlash() {
    lookingForData = true;

    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    console.log(catid);
    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/flash?_embed&"
    if (catid) { // DRY
        endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/flash?_embed&per_page=2&page=" + page + "&categories=" + catid
    }
    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showFlash);
}
function showFlash(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleFlash);
}
function showSingleFlash(aFlash){
    let cloneFlash = templateFlash.cloneNode(true);

    if (aFlash._embedded["wp:featuredmedia"]) { //img is there
        cloneFlash.querySelector(".flash_img").setAttribute("src", aFlash._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        cloneFlash.querySelector(".flash_img").remove()
    }


    flash_gallery_list.appendChild(cloneFlash);
}

////////////// FETCHING ARTWORK //////////////////////////////7

function fetchArtwork() {

    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    console.log(catid);
    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/artwork?_embed&"
    if (catid) { // DRY
        endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/artwork?_embed&per_page=2&page=" + page + "&categories=" + catid
    }
    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showArtwork);
}
function showArtwork(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleArtwork);
}
function showSingleArtwork(anArtwork){
    let cloneArtwork = templateArtwork.cloneNode(true);

 cloneArtwork.querySelector(".artwork_content").innerHTML = anArtwork.content.rendered;

    artwork_gallery_list.appendChild(cloneArtwork);
}

function displayTattoos(){
  tattoo_gallery_list.classList.remove("hidden");
  flash_gallery_list.classList.add("hidden");
  artwork_gallery_list.classList.add("hidden")
}
function displayFlash(){
  tattoo_gallery_list.classList.add("hidden");
  flash_gallery_list.classList.remove("hidden");
  artwork_gallery_list.classList.add("hidden")
}
function displayArtwork(){

  tattoo_gallery_list.classList.add("hidden");
  flash_gallery_list.classList.add("hidden");
  artwork_gallery_list.classList.remove("hidden")
}

fetchTattoos();
fetchFlash();
fetchArtwork();

// BOTTOM LOADING //

// setInterval(function () {
//
//     if (bottomVisible() && lookingForData === false) {
//         page++;
//         fetchData();
//     }
// }, 100) // 0.1sec
//
// // && = and - we want both things true
// // || = or
//
// function bottomVisible() {
//     const scrollY = window.scrollY;
//     const visible = document.documentElement.clientHeight;
//     const pageHeight = document.documentElement.scrollHeight;
//     const bottomOfPage = visible + scrollY >= pageHeight;
//     return bottomOfPage || pageHeight < visible;
// }
