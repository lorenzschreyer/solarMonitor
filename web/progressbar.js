let currentPower = 0;
let currentProduction = 0;
let currentConsumption = 0;

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

function animateValue(start, end, duration, callback) {
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1); // 0..1
        const value = start + (end - start) * progress;
        callback(value);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}


function fetchSolar() {
    fetch("http://localhost:5000/solar")
        .then(res => res.json())
        .then(json => {
            // Power
            let newPower = -1 * json.Body.Data.Site.P_Grid;
            animateValue(currentPower, newPower, 2000, (val) => {
                document.getElementById("currentPower").innerHTML =
                    Math.ceil(val) + "&thinsp;W";
            });
            currentPower = newPower;

            // Green Bar - Production
            let newProduction = json.Body.Data.Site.P_PV || 0;
            animateValue(currentProduction, newProduction, 1000, (val) => {
                let elem = document.getElementById("greenBar");
                elem.style.width = Math.ceil(val / 100) + "%";
            });
            currentProduction = newProduction;

            // Red Bar - Consumption
            let newConsumption = -1 * (json.Body.Data.Site.P_Load || 0);
            animateValue(currentConsumption, newConsumption, 1000, (val) => {
                let elem = document.getElementById("redBar");
                elem.style.width = Math.ceil(val / 100) + "%";
            });
            currentConsumption = newConsumption;
        })
        .catch(err => {
            console.error("Error receiving:", err);
        })
        .finally(() => {
            setTimeout(fetchSolar, 2000);
        });
}


//
move();
fetchSolar();
//
