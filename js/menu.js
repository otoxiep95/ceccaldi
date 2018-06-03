var menu_gallery = document.querySelector(".gallery_nav");
var menu_soMe = document.querySelector(".soMe_nav");
var filterBox = document.querySelector('.filterBox');



////////// BURGER MENU FUNCS //////////

function openNav() {
    document.getElementById("burger_nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("burger_nav").style.width = "0%";
}


/////////////////// MENU STICKY ////////////////////


// When the user scrolls the page, execute myFunction
window.onscroll = function () {
    StickMenu()
};



// Get the offset position of the navbar
var sticky = menu_gallery.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
if (window.innerWidth > 480) {

    function StickMenu() {
        if (window.pageYOffset >= sticky) {
            console.log("stick");
            menu_gallery.style.position = "fixed";
            menu_gallery.style.top = "0";
            menu_gallery.style.left = "0";
            menu_soMe.style.position = "fixed";
            menu_soMe.style.top = "0";
            menu_soMe.style.left = "50vw";
            filterBox.style.position = "fixed";
            filterBox.style.top = "37vh";
        } else {
            console.log("disappear");
            menu_gallery.style.top = "99vh";
            menu_gallery.style.left = "0";
            menu_soMe.style.top = "99vh";
            menu_soMe.style.left = "50vw";
            filterBox.style.top = "130vh";

        }
    }
}



///////////////////////// FILTER FUNCS ////////////////////////
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
let categories_tattoos = document.querySelector(".categories_tattoos");


previous.addEventListener('click', openFilter);
next.addEventListener('click', closeFilter);


categories_tattoos.querySelector("#blackWhite").addEventListener('click', showBlackWhite);
categories_tattoos.querySelector("#colored").addEventListener('click', showColored);
categories_tattoos.querySelector("#collaboration").addEventListener('click', showCollaboration);
categories_tattoos.querySelector("#freeHand").addEventListener('click', showFreeHand);
categories_tattoos.querySelector("#all").addEventListener('click', showAll);




function showBlackWhite() {
    let articlesTattoo = document.querySelectorAll(".tattoo_container");
    let articlesFlash = document.querySelectorAll(".flash_container");

    articlesTattoo.forEach(article => {
        if (article.classList.contains("blackWhiteCat")) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
    articlesFlash.forEach(article => {
        if (article.classList.contains("blackWhiteCat")) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

function showColored() {
    let articlesTattoo = document.querySelectorAll(".tattoo_container");
    let articlesFlash = document.querySelectorAll(".flash_container");
    articlesTattoo.forEach(article => {
        if (article.classList.contains("colorCat")) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
    articlesFlash.forEach(article => {
        if (article.classList.contains("colorCat")) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

function showCollaboration() {
    let articlesTattoo = document.querySelectorAll(".tattoo_container");
    articlesTattoo.forEach(article => {
        if (article.classList.contains("collaborationCat")) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

function showFreeHand() {
    let articlesTattoo = document.querySelectorAll(".tattoo_container");
    articlesTattoo.forEach(article => {
        if (article.classList.contains("freeHandCat")) {
            article.style.display = "block"
        } else {
            article.style.display = "none";
        }
    });
}

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

//////// FILTER BOX /////////////

function openFilter() {
    console.log(" open filter");
    filterBox.classList.add("expandFilter");
    previous.classList.add("hidden");
    next.classList.remove("hidden");
    categories_tattoos.classList.remove("hidden");
}

function closeFilter() {
    console.log(" close filter");
    filterBox.classList.remove("expandFilter");
    next.classList.add("hidden");
    previous.classList.remove("hidden");
    categories_tattoos.classList.add("hidden");
}
