$(document).ready(function () {
    // Getting references to the name input and author container, as well as the table body


    function upsertUser(userData) {
        $.post("/api/createAccount", userData)
            .then(console.log(userData));
    }

    function handleUserCreate(event) {
        event.preventDefault();
        var firstNameInput = $("#firstName").val().trim();
        console.log(firstNameInput)
        var lastNameInput = $("#lastName").val().trim();
        var email = $("#email").val().trim();

        var q1userType = $("#q1").val().trim();
        // var q2knowAvg = $("#q2").val().trim();
        // var q3initAvgCycle = $("#q3").val().trim();
        // var q4initCycleDay = $("#q4").val().trim();
        // var q5initOnPeriod = $("#q5").val().trim();
        // var q6initDaysSinceP = $("#q6").val().trim();
        // Don't do anything if the name fields hasn't been filled out
        if (!firstNameInput) {
            return;
        }

        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: email,
            userType: q1userType
        });
    }

    $("#submit").on("click", function (event) {

        handleUserCreate(event)
    });

});

