//window.onload = function customerToggle() {
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
customerToggle();
//window.onload = customerToggle;

