$(document).ready(function () {

    $("#loginToAccount").on("click", function (event) {
        event.preventDefault();
        console.log("button clicked")
        // Create an object for the user"s data
        var userLoginData = {
            firstName: $("#firstName").val(),
            email: $("#email").val()
        };

        localStorage.setItem("email", $("#email".val()))
        function checkLogin(userLoginData) {
            $.post("/api/checkLogin", userLoginData)
        }


        localStorage.setItem("email", $("#email").val())
        //     localStorage.setItem("firstName", $("#firstName").val())

        //     checkLogin($("#email").val())
        checkLogin({ "email": $("#email").val() })

        // });

    });
})