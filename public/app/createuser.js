$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body

    $("#Q2").hide();
    $("#Q3").hide();
    $("#Q4").hide();
    $("#submit").hide();



    $("#mainUser").on("click", function (event) {
        event.preventDefault();
        console.log("clicked main")
        var q1userType = "mainUser"
        console.log(q1userType)
        $("#Q2").show();
    });

    $("#soFam").on("click", function (event) {
        event.preventDefault();
        console.log("clicked fam")
        var q1userType = "soFam"
        console.log(q1userType)
        $("#submit").show();
    });

    // Q2
    $("#yes").on("click", function (event) {
        event.preventDefault();
        console.log("clicked yes")
        $("#Q3").show();
    });

    $("#no").on("click", function (event) {
        event.preventDefault();
        console.log("clicked no")
        $("#submit").show();
    });

    // Q3 avg
    $(".day").on("click", function (event) {
        event.preventDefault();
        console.log("meow")
        var q1userType =
            $("#Q4").show();
    });

    // Q4 cycleday
    $(".cycleday").on("click", function (event) {
        event.preventDefault();
        console.log("cycle")
        $("#submit").show();
    });

});
function upsertUser(userData) {
    $.post("/api/createAccount", userData)
}
function upsertUserData(userUpdate) {
    $.post("/api/createAccountData", userUpdate).then(window.location.href = "./home")
}

$("#submit").on("click", function (event) {
    event.preventDefault();

    var firstNameInput = $("#firstName").val().trim();
    console.log(firstNameInput)
    var lastNameInput = $("#lastName").val().trim();
    console.log(lastNameInput)
    var email = $("#email").val().trim();
    console.log(email)
    localStorage.setItem("email", email);




    //are you a main user?
    var q1userType = $("#q2").val().trim();
    console.log(q1userType)
    //do you know your average?
    var q2knowAvg = $("#q2").val().trim();
    //what is your average cycle length?
    var q3initAvgCycle = $("#q3").val().trim();
    //what day on your cycle are you?
    var q4initCycleDay = $("#q4").val().trim();
    // var q5initOnPeriod = $("#q5").val().trim();
    // var q6initDaysSinceP = $("#q6").val().trim();
    const today = moment();
    let nextDay1
    let actualDay1
    //Don't do anything if the name fields hasn't been filled out
    if (!firstNameInput) {
        return;
    }
    if (q2knowAvg === "No") {
        q3initAvgCycle = 28
        q4initCycleDay = 14
    }
    //can't use the today constant! it actually changes the moment object itself when we do moment.subtract/moment.add!
    actualDay1 = moment().subtract(q4initCycleDay, "days").format()

    nextDay1 = moment().add((1 + (q3initAvgCycle - q4initCycleDay)), "days").format()
    // Calling the upsertUser function and passing in the value of the name input
    upsertUser({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: email,
        userType: q1userType,
    }
    );
    upsertUserData({
        email: email,
        timeframe: 0,
        currentAverage: q3initAvgCycle,
        currentDay: q4initCycleDay,
        nextPredictedDateOne: nextDay1,
        actualDateOne: actualDay1
    });
})
