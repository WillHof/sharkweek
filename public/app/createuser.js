$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body

    $("#Q2").hide();
    $("#Q3").hide();
    $("#Q4").hide();
    $("#submit").hide();

    var newUserObj = {}
    var q2Obj = {}
    var userDataObj = {}

    $("#mainUser").on("click", function (event) {
        event.preventDefault();
        newUserObj.userType = "mainUser"
        $("#Q2").show();
        $("#Q0").hide();
        $("#Q1").hide();
    });

    $("#soFam").on("click", function (event) {
        event.preventDefault();
        newUserObj.userType = "soFam"
        $("#Q1").hide();
        $("#submit").show();
    });

    // Q2
    $("#yes").on("click", function (event) {
        event.preventDefault();
        q2Obj.ans = "yes"
        $("#Q3").show();
        $("#Q2").hide();
    });

    $("#no").on("click", function (event) {
        event.preventDefault();
        q2Obj.ans = "no"
        $("#submit").show();
    });

    // Q3 avg
    $(".day").on("click", function (event) {
        event.preventDefault();
        userDataObj.currentAverage = this.value
        console.log(userDataObj)
        $("#Q4").show();
        $("#Q3").hide();
    });

    // Q4 cycleday
    $(".cycleday").on("click", function (event) {
        event.preventDefault();
        userDataObj.currentDay = this.value
        console.log(userDataObj)
        $("#Q4").hide();
        $("#submit").show();
    });

    function nextPage() {
        if (newUserObj.userType === "soFam") {
            window.location.href = "./sofamhome"
        }
        else {
            window.location.href = "./home"
        }
    }

    function upsertUser(userData) {
        $.post("/api/createAccount", userData)
    }
    function upsertUserData(userUpdate) {
        $.post("/api/createAccountData", userUpdate).then(nextPage())
    }

    function createData(newUserObj1, q2Obj1, userDataObj1) {
        event.preventDefault();
        newUserObj1.firstName = $("#firstName").val().trim();
        newUserObj1.lastName = $("#lastName").val().trim();
        newUserObj1.email = $("#email").val().trim();
        localStorage.setItem("email", newUserObj1.email);
        newUserObj1.code = Math.floor(Math.random() * 10000)
        let nextDay1
        let actualDay1
        //Don't do anything if the name fields hasn't been filled out
        if (!newUserObj1.firstName) {
            return;
        }
        if (q2Obj1.ans === "No") {
            userDataObj1.currentAverage = 28
            userDataObj1.currentDay = 14
        }
        actualDay1 = moment().subtract(userDataObj1.currentDay, "days").format()
        nextDay1 = moment().add((1 + (userDataObj1.currentAverage - userDataObj1.currentDay)), "days").format()
        // Calling the upsertUser function and passing in the value of the name input
        upsertUser(newUserObj1);
        upsertUserData({
            email: newUserObj1.email,
            timeframe: 0,
            currentAverage: userDataObj1.currentAverage,
            currentDay: userDataObj1.currentDay,
            nextPredictedDateOne: nextDay1,
            actualDateOne: actualDay1
        });
    }

    $("#submit").on("click", function (event) {
        createData(newUserObj, q2Obj, userDataObj)
    });
});
