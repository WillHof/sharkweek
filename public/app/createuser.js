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
        //are you a main user?
        var q1userType = $("#q1").val().trim();
        //do you know your average?
        var q2knowAvg = $("#q2").val().trim();
        //what is your average cycle length?
        var q3initAvgCycle = $("#q3").val().trim();
        //what day on your cycle are you?
        var q4initCycleDay = $("#q4").val().trim();

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
})
