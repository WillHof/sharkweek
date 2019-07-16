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
        $.post("/api/getAccountInfo", email, function (data) {
            localStorage.setItem("user", JSON.stringify(data))
        }).then(getHistory());
    }
    function getHistory() {
        let user = JSON.parse(localStorage.getItem("user"))
        let sharedCode = user[0].sharedCode
        console.log(sharedCode)
        let obj = {
            "sharedCode": sharedCode
        }
        console.log(obj)
        $.post("/api/getMainUserData", obj, function (data) {
            console.log(data)
            localStorage.setItem("MainUser", JSON.stringify(data))
        })
    }
    function writeMainData() {

    }
    function logincheck() {
        if (!localStorage.getItem("email")) {
            // !!!!Uncomment this out when we go live, are putting in TEST ACCOUNT INFO
            alert("You Are Not Logged In");
            window.location.href = "./"
        }
    }
})