window.onload = function () {
    customerToggle();
}

window.onclick = function () {
    if (document.getElementById('login_container'))
        changeLoginToRegister();
    
}

function getStyleByID(idElement, styleProp) {
    var element = document.getElementById(idElement);
    if (element.currentStyle)
        var y = element.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
    return y;
}

function getStyleElement(element, styleProp) {
    if (element.currentStyle)
        var y = element.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);
    return y;
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

function customerToggle() {
    var account = document.getElementById("show-account")
    var order = document.getElementById("show-order")
    var changePasswordShow = document.getElementById("change-password__show")
    var changePassword = document.querySelector("input[name=change-password]")


    account.style.display = "block"
    order.style.display = "none"
    changePasswordShow.style.display = "none"

    document.getElementById('account-event').addEventListener("click", function() {
        account.style.display = "block"
        order.style.display = "none"
    });
    document.getElementById('order-event').addEventListener("click", function() {
        account.style.display = "none"
        order.style.display = "block"
    });
    changePassword.addEventListener( 'change', function() {
        if(this.checked) {
            changePasswordShow.style.display = "flex"
        } else {
            changePasswordShow.style.display = "none"
        }
    });
}