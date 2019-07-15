

$(document).ready(function () {

    $("#upToDate").hide();
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
        $("#q1").hide();
        $("#upToDate").show();
    });

    // q2 pday
    $(".pday").on("click", function (event) {
        event.preventDefault();
        userUpdateObj.pday = this.value
        console.log(userUpdateObj)
        $("#q1").hide();
        $("#q2").hide();
        $("#upToDate").show();
    });

    // function determineUpdate(userUpdateObj) {
    //     if (userUpdateObj.onP === "yes") {
    //         console.log("yes tree")
    //         userDataObj.email = ?????,
    //             userDataObj.timeframe = +1 to previous entry in DB,
    //                 userDataObj.currentAverage = calculate average here,
    //                     userDataObj.currentDay = userUpdateObj.pday,
    //                     userDataObj.actualDayOne = "the current times day, minus currentDay, converted to a date",
    //                     userDataObj.nextPredictedDateOne = "actual day one + current average",
    //                     upsertUserData()
    //     }
    //     else {
    //         console.log("no updates necessary!")
    //     }

    // add update to Updates table

    function upsertUserData(userDataObj) {
        $.post("/api/createAccountData", userDataObj)
    };

    logincheck()
    getHistory()

    function getHistory() {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        $.post("/api/getUserData", email, function (data) {
            let lastItem = (data.length - 1)
            let nextDay = new Date(`${data[lastItem].nextPredictedDateOne}`).toLocaleDateString('en-US')
            $("#cLength").text(`${data[lastItem].currentAverage} days`);
            $("#nextPDate").text(nextDay);
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
        })
    })
    $("#shareCode").on("click", event => {
        event.preventDefault();
        $("#codeShare").toggleClass("off")
        let email = {
            "email":
                localStorage.getItem("email")
        }
        $.post("/api/getCode", email, data =>
            $("#code").text(data)
        );
    })
    $("#logout").on("click", event => {
        localStorage.removeItem("email");
        window.location.href = "./"
    })
    $("#gCal").on("click", function (event) {
        event.preventDefault();
        $.post("/api/calendar", { "email": localStorage.getItem("email") }).then(response => console.log(response))
        // pushEvent(auth, calEvent)
    })
})
