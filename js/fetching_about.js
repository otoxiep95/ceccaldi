let aboutTemp = document.querySelector("#about_temp").content;
let aboutSection = document.querySelector("#about_section");




function fetchAbout() {

   let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/about?_embed&"

    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showAbout);

}

function showAbout(data) {
    console.log(data)
    data.forEach(showSingleAbout);
}

function showSingleAbout(anAbout){
    let cloneAbout = aboutTemp.cloneNode(true);

    cloneAbout.querySelector("#about_title").textContent= anAbout.title.rendered;
    cloneAbout.querySelector("#about_text").innerHTML=anAbout.content.rendered;
    if (anAbout._embedded["wp:featuredmedia"]) { //img is there
     cloneAbout.querySelector("#about_img").setAttribute("src", anAbout._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        cloneAbout.querySelector("#about_img").remove()
    }



    aboutSection.appendChild(cloneAbout);
}

fetchAbout();
