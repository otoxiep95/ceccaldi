let templateTattoo = document.querySelector("#tattoo_temp").content;
let templateFlash = document.querySelector("#flash_temp").content;
let templateArtwork = document.querySelector("#artwork_temp").content;
let tattoo_gallery_list = document.querySelector(".tattoo_gallery");
let flash_gallery_list = document.querySelector(".flash_gallery");
let artwork_gallery_list = document.querySelector(".artwork_gallery");
let tattoo_link = document.querySelector("#tattoo_link");
let flash_link = document.querySelector("#flash_link");
let artwork_link = document.querySelector("#artwork_link");

let modal = document.querySelector(".modal_background");
let modalExit = document.querySelector(".modal_exit");



modalExit.addEventListener("click", () => modal.classList.add("hidden"));

tattoo_link.addEventListener('click', displayTattoos);
flash_link.addEventListener('click', displayFlash);
artwork_link.addEventListener('click', displayArtwork);

let video = document.querySelector("video");

//video.play();


////////////////// FETCHING TATTOOS ///////////////////////

function fetchTattoos() {

    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/tattoos?_embed&per_page=50";

    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showTattoos);
}

function showTattoos(data) {
    console.log(data)
    data.forEach(showSingleTattoo);
}


function showSingleTattoo(aTattoo) {
    let cloneTat = templateTattoo.cloneNode(true);

    if (aTattoo._embedded["wp:featuredmedia"]) { //img is there
        cloneTat.querySelector(".tattoo_img").setAttribute("src", aTattoo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        cloneTat.querySelector(".tattoo_img").remove()
    }


    ///// CATEGORIES ////
    if (aTattoo.categories.includes(2)) {
        console.log("has black and white?")
        cloneTat.querySelector(".tattoo_container").classList.add("blackWhiteCat");
    };
    if (aTattoo.categories.includes(5)) {
        console.log("COLLABORATION cat");
        cloneTat.querySelector(".tattoo_container").classList.add("collaborationCat");
    }
    if (aTattoo.categories.includes(3)) {
        console.log("color cat");
        cloneTat.querySelector(".tattoo_container").classList.add("colorCat");
    }
    if (aTattoo.categories.includes(4)) {
        console.log("free Hand cat");
        cloneTat.querySelector(".tattoo_container").classList.add("freeHandCat");
    }

    /////// FETCHING MODAL ////////
    cloneTat.querySelector(".tattoo_container").addEventListener("click", () => {
        fetch("http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/tattoos/" + aTattoo.id + "?_embed&").then(res => res.json()).then(product => showModal(product));
    });

    tattoo_gallery_list.appendChild(cloneTat);
}
////////////////// FETCHING FLASH ///////////////////////
function fetchFlash() {

    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/flash?_embed&per_page=50"

    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showFlash);
}

function showFlash(data) {
    console.log(data)
    data.forEach(showSingleFlash);
}

function showSingleFlash(aFlash) {
    let cloneFlash = templateFlash.cloneNode(true);

    if (aFlash._embedded["wp:featuredmedia"]) { //img is there
        cloneFlash.querySelector(".flash_img").setAttribute("src", aFlash._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        cloneFlash.querySelector(".flash_img").remove()
    }
    /////// FETCHING MODAL ////////
    cloneFlash.querySelector(".flash_container").addEventListener("click", () => {
        fetch("http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/flash/" + aFlash.id + "?_embed&").then(res => res.json()).then(product => showModal(product));
    });
    ///////CATEGORIES///////
    if (aFlash.categories.includes(2)) {
        console.log("has black and white?")
        cloneFlash.querySelector(".flash_container").classList.add("blackWhiteCat");
    };
    if (aFlash.categories.includes(5)) {
        console.log("COLLABORATION cat");
        cloneFlash.querySelector(".flash_container").classList.add("collaborationCat");
    }
    if (aFlash.categories.includes(3)) {
        console.log("color cat");
        cloneFlash.querySelector(".flash_container").classList.add("colorCat");
    }
    if (aFlash.categories.includes(4)) {
        console.log("free Hand cat");
        cloneFlash.querySelector(".flash_container").classList.add("freeHandCat");
    }
    flash_gallery_list.appendChild(cloneFlash);
}

////////////// FETCHING ARTWORK //////////////////////////////7

function fetchArtwork() {


    let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/artwork?_embed&per_page=50"

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

function showSingleArtwork(anArtwork) {
    let cloneArtwork = templateArtwork.cloneNode(true);


        if (anArtwork._embedded["wp:featuredmedia"]) { //img is there
            cloneArtwork.querySelector(".artwork_img").setAttribute("src", anArtwork._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        } else { // no img
            cloneArtwork.querySelector(".artwork_img").remove()
        }
    /////// FETCHING MODAL ////////
        cloneArtwork.querySelector(".artwork_container").addEventListener("click", () => {
            fetch("http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/artwork/" + anArtwork.id + "?_embed&").then(res => res.json()).then(product => showModal(product));
        });

    artwork_gallery_list.appendChild(cloneArtwork);
}

/////// DISPLAY SECTIONS FUNCS ///////
function displayTattoos() {
    tattoo_gallery_list.classList.remove("hidden");
    flash_gallery_list.classList.add("hidden");
    artwork_gallery_list.classList.add("hidden");
    showAll();
    tattoo_link.style.borderBottom="5px solid yellow";
    artwork_link.style.borderBottom="none";
    flash_link.style.borderBottom="none";


}

function displayFlash() {
    tattoo_gallery_list.classList.add("hidden");
    flash_gallery_list.classList.remove("hidden");
    artwork_gallery_list.classList.add("hidden");
    showAll();
    flash_link.style.borderBottom="5px solid #03f7e4";
    artwork_link.style.borderBottom="none";
    tattoo_link.style.borderBottom="none";

}

function displayArtwork() {

    tattoo_gallery_list.classList.add("hidden");
    flash_gallery_list.classList.add("hidden");
    artwork_gallery_list.classList.remove("hidden");
      artwork_link.style.borderBottom="5px solid #fd99fc";
      flash_link.style.borderBottom="none";
      tattoo_link.style.borderBottom="none";
}

 /////// FILTER RESET FUNC ////////
function showAll(){
  let articlesTattoo = document.querySelectorAll(".tattoo_container");
    let articlesFlash = document.querySelectorAll(".flash_container");
    articlesTattoo.forEach(article => {
      article.style.display="block"
    });
    articlesFlash.forEach(article => {
      article.style.display="block"
    });
}

fetchTattoos();
fetchFlash();
fetchArtwork();

/////////////// MODAL ///////////////

function showModal(aModal) {

    console.log(aModal);
    console.log(aModal.id);
    console.log(aModal.type);
    if(aModal.type==="tattoos"){
      modal.querySelector(".modal_content").style.backgroundColor="yellow";
      modal.querySelector(".modal_img").style.border="5px solid yellow";
    }
    else if (aModal.type==="flash") {
      modal.querySelector(".modal_content").style.backgroundColor="#03f7e4";
      modal.querySelector(".modal_img").style.border="5px solid #03f7e4";
    }
    else {
      modal.querySelector(".modal_content").style.backgroundColor=" #fd99fc";
      modal.querySelector(".modal_img").style.border="5px solid #fd99fc";

    }

    modal.querySelector(".modal_name").textContent = aModal.title.rendered;
    if (aModal.acf.small_description) {
        modal.querySelector(".modal_description").textContent = aModal.acf.small_description;
    }

    if (aModal._embedded["wp:featuredmedia"]) { //img is there
        modal.querySelector(".modal_img").setAttribute("src", aModal._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        modal.querySelector(".modal_img").remove()
    }


    modal.classList.remove("hidden");



}
