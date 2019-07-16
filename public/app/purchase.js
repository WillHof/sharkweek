$(document).ready(function () {
    $("#aSearch").on("click", function () {
        let searchQ = $("#searchTerm").val()
        window.location.href = `https://www.amazon.com/s?k=${searchQ}`
    });
    $("#logout").on("click", event => {
        localStorage.removeItem("email");
        window.location.href = "/"
    })

})