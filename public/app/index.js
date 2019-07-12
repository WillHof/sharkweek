$(document).ready(function () {

    $("#loginToAccount").on("click", function (event) {
        event.preventDefault();
        console.log("button clicked")
        // Create an object for the user"s data
        var userLoginData = {
            firstName: $("#firstName").val(),
            email: $("#email").val()
        };


        function checkLogin(userLoginData) {
            $.post("/api/checkLogin", userLoginData)
        }

        checkLogin({ "email": $("#email").val() })

    });

});