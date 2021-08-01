window.onload = function () {
}
function selectVersions(id) {
    var versions = document.querySelectorAll(`#${id} .version`);
    console.log(versions);

    for (let i = 0; i < versions.length; i++) {
        versions[i].onclick = function () {
            console.log('Run ' + i);
            document.querySelector(`#${id} .version.active`).classList.remove("active");
            this.classList.add("active");
        }
    }
}

