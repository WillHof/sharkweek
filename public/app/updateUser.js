$(document).ready(function () {
    logincheck()
    getHistory()


    function getHistory() {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        $.post("/api/getUserData", email, function (data) {
            let lastItem = (data.length - 1)
            $("#cLength").text(`${data[lastItem].currentAverage} days`)
            localStorage.setItem("user", JSON.stringify(data))

        })
    }

    function logincheck() {
        if (!localStorage.getItem("email")) {
            localStorage.setItem("email", "test@test.com")
            // !!!!Uncomment this out when we go live, are putting in TEST ACCOUNT INFO
            // alert("You Are Not Logged In");
            // window.location.href="./"
        }
    }
    function updateCurrentUser(data) {
        $.post("/api/updateAccountData", data).then(function (response) {
            console.log(response)
        })
    }

    //this gets the code for making api calls with the user token recieved from google, sets it in local storage
    $("#google").on("click", function (event) {
        event.preventDefault();
        $.get("/url", function (data) {
            window.location.replace(data);
            let index = data.indexOf("code=");
            const code = data.substring(index, (data.indexOf("&scope")))
            localStorage.setitem("code", code)
            getToken(code)
        })
    })
    //gets the access token from google using the code 
    function getToken(code) {
        $.post("/token", code, function (data) {
            console.log(data)
        })
    }
    $("#submitUpdate").on("click", function (event) {
        event.preventDefault();
        let json = JSON.parse(localStorage.getItem("user"))
        let q1OnP = $("#q1").val();
        let q2PStart = $("#q2").val()
        let email = localStorage.getItem("email")
        let length = json.length - 1
        let timeframe = json[length].timeframe + 1
    })
})
