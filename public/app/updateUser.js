$(document).ready(function () {
    logincheck()

    function getHistory() {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        $.post("/api/getUserData", email, function (data) {
            console.log(data)
        })
    }
    getHistory()
    function logincheck() {
        if (!localStorage.getItem("email")) {
            localStorage.setItem("email", "test@test.com")
            // !!!!Uncomment this out when we go live, will put in TEST ACCOUNT INFO
            // alert("You Are Not Logged In");
            // window.location.href="./"
        }
    }

    $("#submitUpdate").on("click", function (event) {
        event.preventDefault();
        let q1OnP = $("#q1").val();
        let q2PStart = $("#q2").val()

    })
})
