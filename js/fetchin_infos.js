let infosTemp = document.querySelector("#infos_temp").content;
let infoSection = document.querySelector("#infos_section");




function fetchInfos() {

   let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/infos?_embed&"

    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showInfos);

}

function showInfos(data) {
    console.log(data)

    data.forEach(showSingleInfo);
}

function showSingleInfo(anInfo){
    let cloneInfo = infosTemp.cloneNode(true);

    cloneInfo.querySelector("#infospage_title").textContent= anInfo.title.rendered;
    cloneInfo.querySelector("#infos_text").innerHTML=anInfo.content.rendered;
    if (anInfo._embedded["wp:featuredmedia"]) { //img is there
     cloneInfo.querySelector("#infos_img").setAttribute("src", anInfo._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        cloneInfo.querySelector("#infos_img").remove()
    }



    infoSection.appendChild(cloneInfo);
}

fetchInfos();
