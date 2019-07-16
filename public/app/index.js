$(document).ready(function () {
    function checkLogin(userLoginData) {
        $.post("/checkLogin", userLoginData)
    }
    $("#loginToAccount").on("click", function (event) {
        event.preventDefault();
        console.log("button clicked")
        // Create an object for the user"s data
        let email = {
            email: $("#email").val()
        };
        $.post("/api/getAccountInfo", email, data => {
            if (data[0].userType === "mainUser") {
                window.location.href = "/home"
            }
            else if (data[0].userType === "soFam") {
                window.location.href = "/sofamhome"
            }
            else (alert("Login email not found"))
        }
        )

        localStorage.setItem("email", $("#email").val())
        //     localStorage.setItem("firstName", $("#firstName").val())

        //     checkLogin($("#email").val())
        checkLogin({ "email": $("#email").val() })

        // });

    });
})