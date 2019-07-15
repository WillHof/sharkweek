$(document).ready(function () {
    function getCode() {
        let email = {
            "email":
                localStorage.getItem("email")
        }
        $.post("/api/getCode", email, data =>
            $("#code").text(data)
        );
    }
    getCode()
})