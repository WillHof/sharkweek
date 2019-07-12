$(document).ready(function () {

    $("#submitUpdate").hide();
    $("#q2").hide();

    var userUpdateObj = {}

    // q1

    $("#yes").on("click", function (event) {
        event.preventDefault();
        userUpdateObj.onP = "yes"
        console.log(userUpdateObj)
        $("#q2").show();
        $("#q1").hide();
    });

    $("#no").on("click", function (event) {
        event.preventDefault();
        userUpdateObj.onP = "no"
        console.log(userUpdateObj)
        $("#submitUpdate").show();
        $("#q1").hide();
    });

    // q2 pday
    $(".inputGroupSelect01").on("click", function (event) {
        event.preventDefault();
        console.log("clicked")
        userUpdateObj.pDay = (".pday").value
        console.log(userUpdateObj)
        $("#submitUpdate").show();
        $("#q2").hide();
    });







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
            // !!!!Uncomment this out when we go live, will put in TEST ACCOUNT INFO
            // alert("You Are Not Logged In");
            // window.location.href="./"
        }
    }
    // function updateCurrentUser(data) {
    //     $.post("/api/updateAccountData", data).then(function (response) {
    //         console.log(response)
    //     })
    // }
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
