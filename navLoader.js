// carrega a navbar
$(document).ready(function(){
    valideStorage();
    $("#navbar-repo").load("/navbar.html");
    console.log("nav loaded");

    if (localStorage.getItem("oldStyle") == "true") {
        const css = document.querySelector('link[rel="stylesheet"]')
        css.href = "/../media/oldStyle.css";
    }

    // cowntdown
    if (localStorage.getItem("countdown") == 'true') {
        const countdownDiv = `
            <div class="main countdownDiv" style="width: 100%;">
                <div class="countdownLabel">
                    <h2>OIRF Public Playtest in:</h2>
                </div>
                <p id="countdown" class="countdown">00:00:00</p>
            </div>
            <script src="/countdown.js"></script>
            <script src="/mainModule.js"></script>
        `;
        
        $("#navbar-repo").after(countdownDiv);
    }
});

function valideStorage() {
    if (!localStorage.getItem("oldStyle"))
        localStorage.setItem("oldStyle", "false");

    if (!localStorage.getItem("countdown"))
        localStorage.setItem("countdown", "true");

    if (!localStorage.getItem("sprites"))
        localStorage.setItem("sprites", "true")
}