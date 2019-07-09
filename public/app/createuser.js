$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body

    function upsertUser(userData) {
        $.post("/api/createAccount", userData)
    }
    function upsertUserData(userUpdate) {
        $.post("/api/createAccountData", userUpdate).then(window.location.href = "./home")
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var firstNameInput = $("#firstName").val().trim();
        var lastNameInput = $("#lastName").val().trim();
        var email = $("#email").val().trim();
        localStorage.setItem("email", email);
        var q1userType = $("#q1").val().trim();
        var q2knowAvg = $("#q2").val().trim();
        var q3initAvgCycle = $("#q3").val().trim();
        var q4initCycleDay = $("#q4").val().trim();
        var q5initOnPeriod = $("#q5").val().trim();
        var q6initDaysSinceP = $("#q6").val().trim();

        let nextDay1
        //Don't do anything if the name fields hasn't been filled out
        if (!firstNameInput) {
            return;
        }
        if (q5initOnPeriod = "Yes") {
            q3initAvgCycle = q6initDaysSinceP + 1
        }
        else if (q2knowAvg === "No" && q5initOnPeriod === "No") {
            q3initAvgCycle = 28
            q4initCycleDay = 14
        }
        nextDay1 = moment().add(1 + q3initAvgCycle - q4initCycleDay, 'days').calendar();
        console.log(q1userType)
        console.log(q2knowAvg);
        console.log(q3initAvgCycle)
        console.log(q4initCycleDay)
        console.log(q5initOnPeriod);
        console.log(q6initDaysSinceP);

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
            nextPredictedDateOne: nextDay1
        });
    })
})
