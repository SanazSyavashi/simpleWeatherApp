const getmeridiem = () => {
    let today = new Date();
    let hour = today.getHours();
    let meridiem = (hour > 12) ? "pm" : "am";
    if (((hour > 6) && (meridiem == "pm")) || (hour < 6) && (meridiem == "am")) {
        return "darkSky";
    }

    return "lightsky";
}
const setBackGroundImg = () => {
    let body = document.querySelector("body");
    let meridiem = getmeridiem();
    if (meridiem == "darkSky") {
        body.style.backgroundImage = "url(darkSky.png)";
        body.style.color = "white";
    } else if (meridiem == "lightsky") {
        body.style.backgroundImage = "url(ligthBlueSky.png)";
    }
}
window.addEventListener("load", () => {
    let location = document.querySelector(".current-location");
    let cDegree = document.querySelector("#cantigrad");
    let fDegree = document.querySelector("#farenhite");
    setBackGroundImg();
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=201a294bef4eb907bdb896ebffb7b179`
            fetch(api)
                .then(response => response.json())
                .then(data => {

                    const temp = data.main.temp;
                    const name = data.name;
                    location.innerHTML = name;
                    let c = Math.floor(temp - 273);
                    cDegree.innerHTML = c;
                    let f = cToF(c);
                    fDegree.innerHTML = f;
                });

        });
    }
});
let cToF = c => c * 1.8 + 32