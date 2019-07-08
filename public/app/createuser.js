$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body


    function upsertUser(userData, userUpdate) {
        $.post("/api/createAccount", userData)
            .then(console.log(userData));
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var firstNameInput = $("#firstName").val().trim();
        var lastNameInput = $("#lastName").val().trim();
        var email = $("#email").val().trim();

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

        if (q2knowAvg === "No" && q5initOnPeriod === "No") {
            q3initAvgCycle = 28
            q4initCycleDay = 14
        }
        nextDay1 = moment().format().add(1 + q3initAvgCycle - q4initCycleDay, 'days').calendar();


        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: email,
            userType: q1userType,
        },
            {
                email: email,
                timeframe: 0,
                currentAverage: q3initAvgCycle,
                currentDay: q4initCycleDay,
                nextPredictedDateOne: nextDay1,
            });
    }).then(function () {
        window.location.href = "./home"
    });
})