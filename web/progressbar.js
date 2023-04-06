function move() {
    var elem = document.getElementById("greenBar");
    var elem2 = document.getElementById("redBar");

    var saveTransitionDuration = elem.style.transitionDuration
    var saveTransitionDuration2 = elem2.style.transitionDuration

    elem.style.transitionDuration = "0.3s"
    elem2.style.transitionDuration = "0.3s"

    setTimeout(function () {
        elem.style.width = "100%"
        elem2.style.width = "100%"
    }, 400);

    setTimeout(function () {
        elem.style.width = "0%"
        elem2.style.width = "0%"
    }, 700);

    setTimeout(function () {
        elem.style.transitionDuration = saveTransitionDuration
        elem2.style.transitionDuration = saveTransitionDuration2
    }, 1000);
}


var fetchSolar = window.setInterval(function () {
    fetch("http://yourflaskserverip:5000/solar")
        .then(res => res.json())
        .then(json => {

            power = json.Body.Data.Site.P_Grid
            power = -1 * power
            document.getElementById("currentPower").innerHTML = Math.ceil(power) + "&thinsp;W"

            // Green Bar - Production
            production = json.Body.Data.Site.P_PV

            if (production == null)
                production = 0

            console.log(production)
            var elem = document.getElementById("greenBar");
            elem.style.width = production / 100 + "%";


            // Red Bar - Consumption
            consumption = json.Body.Data.Site.P_Load
            consumption = -1 * consumption

            if (consumption == null)
                consumption = 0

            console.log(consumption)
            var elem = document.getElementById("redBar");
            elem.style.width = consumption / 100 + "%";
        });
}, 1000);


//
move();
fetchSolar();
//
