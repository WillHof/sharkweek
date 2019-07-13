$(document).ready(function () {

    $("#upToDate").hide();
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
        // $("#submitUpdate").show();
        $("#q1").hide();
        $("#upToDate").show();
    });

    // q2 pday
    $(".pday").on("click", function (event) {
        event.preventDefault();
        userUpdateObj.pday = this.value
        console.log(userUpdateObj)
        // $("#submitUpdate").show();
        $("#q1").hide();
        $("#q2").hide();
        $("#upToDate").show();
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
function pushEvent(auth, calEvent) {
    const calendar = google.calendar({ version: 'v3', auth });
    calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: calEvent
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        else {
            console.log('Event CreatedL %s', event.htmlLink);
        }
    });
}
$("#gCal").on("click", function (event) {
    event.preventDefault();
    let calEvent = {
        'summary': 'Estimated Period Start',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Boston',
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Boston',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            { 'email': 'thehorrorofkurtz@gmail.com' },
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
            ],
        },
    }
    pushEvent(auth, calEvent)
})