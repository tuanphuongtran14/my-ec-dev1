window.onload = function() {
    toggleMenuAndSearch();

    var homeCarousel = new Flickity( '.gallery', {
        freeScroll: true, 
        wrapAround: true 
    });

    playSlider();

    if(document.getElementsByClassName('thumbnail'))
        selectByThumbnail();

    if(document.getElementById('versions'))
        selectVersions('versions');

    if(document.getElementById('colors'))
        selectVersions('colors');
}

function playSlider() {
    if(document.querySelector('.gallery')) {
        var carousel = new Flickity( '.gallery', {
            autoPlay: 2500
        });
        carousel.playPlayer();
    }
}

function toggleMenuAndSearch() {
    let menu = document.getElementById("menu--nav");
    let menuParent = document.getElementById("navbar-menu");

    
    let searchBar = document.getElementById("search-bar");
    let searchBtn = document.getElementById("search-btn");
    let searchIcon = document.getElementById("search-icon");
    let searchGo = document.getElementById("search-go")
    let searchAdvanced = document.getElementById("search-advanced")

    let overBodyLayer = document.getElementById("overlaybody");

    let body = document.querySelector("body");
    let root = document.getElementById("__next");

    // If window < 991, display mobile menu version
    if (innerWidth < 991)
        body.appendChild(menu);

    // If user change window width, change to suitable version
    window.onresize = function () {
        if (window.innerWidth >= 992) {
            root.style.transform = "translateX(0%)";
            if (getStyleElement(searchBar, "display") === "none") {
                overBodyLayer.style.display = "none";
                menuParent.appendChild(menu);
                menu.style.transform = "none";
                body.classList.remove('noscroll');
            }    
        } else {
            body.appendChild(menu);
            menu.style.transform = "translateX(-60vw)";
        }
    }

    // If bars button is clicked, open menu on left
    document.getElementById("bars-btn").onclick = function () {
        overBodyLayer.style.display = "block";
        menu.style.transform = "translateX(60vw)";
        root.style.transform = "translateX(60vw)";
        body.classList.add('noscroll');
    }

    // If search button is clicked, display search bar
    searchBtn.onclick = function () {
        searchBar.style.display = "flex";
        overBodyLayer.style.display = "block";
        body.classList.add('noscroll');
        searchIcon.style.display = "block";
        searchGo.style.display = "none"
        searchAdvanced.style.display = "none";
    }

    searchBar.onclick = function () {
        searchGo.style.display = "block"
        searchAdvanced.style.display = "block";
        searchIcon.style.display = "none";
    }

    // If over body layer is click, close menu or search bar
    overBodyLayer.onclick = function () {
        if(getStyleElement(searchBar, "display") === "none") {
            root.style.transform = "translateX(0%)";
            menu.style.transform = "translateX(-60vw)";
            overBodyLayer.style.display = "none";
        } else {
            searchBar.style.display = "none";
            overBodyLayer.style.display = "none";
        }
        body.classList.remove('noscroll');
    }
}

function getStyleByID(idElement,styleProp)
{
    var element = document.getElementById(idElement);
    if (element.currentStyle)
        var y = element.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProp);
    return y;
}

function getStyleElement(element,styleProp)
{
    if (element.currentStyle)
        var y = element.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProp);
    return y;
}

function selectByThumbnail() {
    var thumbnails = document.getElementsByClassName('thumbnail');

    var flkty = new Flickity('.product-images__slide');

    flkty.on( 'change', function(index) {
        document.querySelector(".thumbnail.active").classList.remove("active");
        thumbnails[index].classList.add("active");
    });

    for(let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].onclick = function() {
            document.querySelector(".thumbnail.active").classList.remove("active");
            this.classList.add("active");
            flkty.select( i, true, false )
        }
    }
}

function selectVersions(id) {
    var versions = document.querySelectorAll(`#${id} .version`);
    console.log(versions);

    for(let i = 0; i < versions.length; i++) {
        versions[i].onclick = function() {
            console.log('Run ' + i);
            document.querySelector(`#${id} .version.active`).classList.remove("active");
            this.classList.add("active");
        }
    }
}