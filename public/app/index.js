$(document).ready(function () {

    $("#loginToAccount").on("click", function (event) {
        event.preventDefault();
        console.log("button clicked")
        // Create an object for the user"s data
        var userLoginData = {
            firstName: $("#firstName").val(),
            email: $("#email").val()
        };

        console.log(userLoginData.email)

        // localStorage.setItem("email", $("#email").val())
        // localStorage.setItem("firstName", $("#firstName").val())

        function checkLogin(userLoginData) {
            $.post("/api/checkLogin/:email", userLoginData.email)
        }

        checkLogin(userLoginData)

    });

});