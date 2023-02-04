const youtubeBtn = document.getElementById("youtube");
const wikiBtn = document.getElementById("wiki");
const masBtn = document.getElementById("mas");
const nuevoBtn = document.getElementById("nuevo-boton");
const nombreInput = document.getElementById("nombre");
const urlInput = document.getElementById("url");
const botonesGuardados = JSON.parse(localStorage.getItem("botones")) || [];
const webContainer = document.getElementById("webContainer");


function updateInternetStatus() {
  var status = document.getElementById("internet-status");
  if (navigator.onLine) {
    status.innerHTML = "internet: Connected";
  } else {
    status.innerHTML = "internet: Disconnected";
  }
}
updateInternetStatus();
window.addEventListener("online", updateInternetStatus);
window.addEventListener("offline", updateInternetStatus);

// Obtener la hora actual
function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];var day = days[currentTime.getUTCDay()];
    var month = months[currentTime.getUTCMonth()];
    var date = currentTime.getUTCDate();
    var year = currentTime.getUTCFullYear();

    // Añadir ceros a la izquierda en caso de ser menor a 10
        hours = (hours < 10 ? "0" : "") + hours;
        minutes = (minutes < 10 ? "0" : "") + minutes;
        seconds = (seconds < 10 ? "0" : "") + seconds;

    var time = day + " " + date + " " + month + " " + year + " " + hours + ":" + minutes ;
    document.getElementById("time").innerHTML = time;
}
setInterval(displayTime, 1000);

// Obtener la ubicación del usuario
navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Utilizar la API de clima para obtener el clima de la ubicación del usuario
    var apiKey = "66df8ee03a884713ebd2210de24f14c1";
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(weatherUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var temp = Math.round(data.main.temp - 273.15);
        var humidity = data.main.humidity;
        var weather = data.weather[0].description;
        var city = data.name;

        document.getElementById("weather").innerHTML = `${city} / T:${temp}°C / H:${humidity}% / ${weather}`;
        showWeatherImage(weather);
        
    });
    
});

function showWeatherImage(description) {
  let weatherImage;
  switch (description) {
    case 'clear sky':
      weatherImage = 'sunny.png';
      break;
    case 'few clouds':
      weatherImage = 'few_clouds.png';
      break;
    case 'scattered clouds':
      weatherImage = 'few_clouds.png';
      break;
    case 'broken clouds':
      weatherImage = 'few_clouds.png';
      break;
    case 'overcast clouds':
      weatherImage = 'few_clouds.png';
      break;
    case 'shower rain':
      weatherImage = 'rain.png';
      break;
    case 'mist':
        weatherImage = 'mist.png';
        break;
    case 'rain':
      weatherImage = 'rain.png';
      break;
    case 'thunderstorm':
      weatherImage = 'thunderstorm.png';
      break;
    case 'snow':
      weatherImage = 'rain.png';
      break;
    default:
      weatherImage = 'default.png';
  }
  document.getElementById('weather-image').src = weatherImage;
}


  masBtn.addEventListener("click", function() {
    nuevoBtn.style.display = nuevoBtn.style.display === "none" ? "block" : "none";
  });
  
  nuevoBtn.querySelector("input[type='submit']").addEventListener("click", function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const url = urlInput.value;
    if (!nombre || !url) return;
    botonesGuardados.push({ nombre, url });
    localStorage.setItem("botones", JSON.stringify(botonesGuardados));
    const nuevoEnlace = document.createElement("button");
    nuevoEnlace.innerText = nombre;
    nuevoEnlace.addEventListener("click", function() {
      window.open(url, "_blank");
    });
    webContainer.appendChild(nuevoEnlace);
    nuevoBtn.style.display = "none";
    nombreInput.value = "";
    urlInput.value = "";
});
 
  botonesGuardados.forEach(boton => {
    const nuevoEnlace = document.createElement("button");
    nuevoEnlace.innerText = boton.nombre;
    nuevoEnlace.addEventListener("click", function() {
      window.open(boton.url, "_blank");
    });
    const botonEliminar = document.createElement("button");
    botonEliminar.innerText = "-";
    botonEliminar.addEventListener("click", function() {
      nuevoEnlace.remove();
      botonEliminar.remove();
      const index = botonesGuardados.indexOf(boton);
      botonesGuardados.splice(index, 1);
      localStorage.setItem("botones", JSON.stringify(botonesGuardados));
    });
    webContainer.appendChild(nuevoEnlace);
    webContainer.appendChild(botonEliminar);
  });
  
nuevoBtn.addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    const url = urlInput.value;
    if (!nombre || !url) return;
    const nuevoEnlace = document.createElement("button");
    nuevoEnlace.innerText = nombre;
    nuevoEnlace.addEventListener("click", function() {
      window.open(url, "_blank");
    });
    
    const eliminarBoton = document.createElement("span");
    eliminarBoton.innerText = "-";
    eliminarBoton.addEventListener("click", function() {
      nuevoEnlace.remove(); // elimina el botón de la página
      const index = botonesGuardados.findIndex(boton => boton.nombre === nombre);
      botonesGuardados.splice(index, 1); // elimina el botón del arreglo
      localStorage.setItem("botones", JSON.stringify(botonesGuardados));
    });
    nuevoEnlace.appendChild(eliminarBoton);
    webContainer.appendChild(nuevoEnlace);
    botonesGuardados.push({ nombre, url });
    localStorage.setItem("botones", JSON.stringify(botonesGuardados));
    nuevoBtn.style.display = "none";
    nombreInput.value = "";
    urlInput.value = "";
  });

  $(document).ready(function() {
    $('.chatgpt-cursor').on('focus', function() {
        $(this).css('caret-color', 'transparent');
    });
});


