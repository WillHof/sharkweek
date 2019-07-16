$(document).ready(function () {
    logincheck();
    getmyData();

    //adds mainUser's data to family member's page
    $("#addCodeButton").on("click", function () {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        let sharedCode = {
            "sharedCode": $("#addCode").val()
        }
        let obj = { object: [email, sharedCode] }
        console.log(obj)
        $.post("/api/addCode", obj, data =>
            console.log(data))
    })
    function getmyData() {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        //get my account info
        $.post("/api/getAccountInfo", email, function (data) {
            localStorage.setItem("user", JSON.stringify(data))
        }).then(
            //get my info from another table - joins weren't working due to foreign keys not functioning as expected
            $.post("/api/getUserData", email, function (userData) {
                localStorage.setItem("userData", JSON.stringify(userData))
            })
                //get main user history
                .then(getHistory())
        )

    }
    function getHistory() {
        let user = JSON.parse(localStorage.getItem("userData"))
        let sharedCode = user[0].sharedCode
        let obj = {
            "sharedCode": sharedCode
        }
        $.post("/api/getMainUserData", obj, function (data) {
            localStorage.setItem("MainUser", JSON.stringify(data))
            let nextDay = new Date(`${data[0].nextPredictedDateOne}`).toLocaleDateString('en-US')
            $("#mainName").text(data[0].email)
            $("#mainCycle").text(data[0].currentAverage)
            $("#nextP").text(nextDay)
        })
    }
    function logincheck() {
        if (!localStorage.getItem("email")) {
            alert("You Are Not Logged In");
            window.location.href = "./"
        }
    }
    $("#logout").on("click", event => {
        localStorage.removeItem("email");
        window.location.href = "./"
    })
})