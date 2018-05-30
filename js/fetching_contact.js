let contactTemp = document.querySelector("#contact_temp").content;
let contactSection = document.querySelector("#contact_section");




function fetchContact() {

   let endpoint = "http://ceccaldi.albertopachecommd.com/wp-json/wp/v2/contact?_embed&"

    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showContact);

}

function showContact(data) {
    console.log(data)

    data.forEach(showSingleContact);
}

function showSingleContact(aContact){
    let cloneContact = contactTemp.cloneNode(true);

    cloneContact.querySelector("#contact_title").textContent= aContact.title.rendered;
    contactSection.querySelector("form").action=aContact.acf.email;
    cloneContact.querySelector("#contact_text").innerHTML=aContact.content.rendered;
    if (aContact._embedded["wp:featuredmedia"]) { //img is there
     cloneContact.querySelector("#contact_img").setAttribute("src", aContact._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)

    } else { // no img
        cloneContact.querySelector("#contact_img").remove()
    }



    contactSection.appendChild(cloneContact);
}

fetchContact();
