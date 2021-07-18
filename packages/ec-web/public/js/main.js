window.onload = function() {

    if(document.getElementsByClassName('thumbnail'))
        selectByThumbnail();

    if(document.getElementById('versions'))
        selectVersions('versions');

    if(document.getElementById('colors'))
        selectVersions('colors');
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