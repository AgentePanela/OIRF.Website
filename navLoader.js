// carrega a navbar
$(document).ready(function(){
    $("#navbar-repo").load("/navbar.html");
    console.log("nav loaded");

    // cowntdown
    const countdownDiv = `
        <div class="main countdownDiv" style="width: 100%;">
            <div class="countdownLabel">
                <h2>OIRF Public Playtest in:</h2>
            </div>
            <p id="countdown" class="countdown">00:00:00</p>
        </div>
        <script src="/countdown.js"></script>
    `;
    
    $("#navbar-repo").after(countdownDiv);
});