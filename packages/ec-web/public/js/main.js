window.onload = function () {
    if (document.getElementById('login_container'))
        changeLoginToRegister();
    
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

function changeLoginToRegister() {

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('login_container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

}
