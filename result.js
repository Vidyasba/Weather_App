// Function to get URL parameters by name
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get latitude and longitude from URL parameters
const latitude = getUrlParameter("latitude");
const longitude = getUrlParameter("longitude");
// Truncate the latitude and longitude values to 5 decimal places
const truncatedLatitude = parseFloat(latitude).toFixed(6);
const truncatedLongitude = parseFloat(longitude).toFixed(6);

// Display the latitude and longitude on the page
const resultElement = document.createElement("button");
const resultlong = document.createElement("button");
// Set CSS styles for the result element
resultElement.style.fontWeight = "bold";
resultElement.style.fontSize = "18px";
resultElement.style.color = "white";
resultElement.style.backgroundColor = "#270846";
resultElement.style.width = "208px";
resultElement.style.height = "50px";
resultElement.style.border = "none";

resultElement.style.margin = "20px";
// Set CSS styles for the result element
resultlong.style.fontWeight = "bold";
resultlong.style.fontSize = "18px";
resultlong.style.color = "white";
resultlong.style.backgroundColor = "#270846";
resultlong.style.width = "208px";
resultlong.style.height = "50px";
resultlong.style.border = "none";

resultElement.textContent = `Latitude: ${truncatedLatitude} `;
resultlong.textContent = `Longitude: ${truncatedLongitude}`;
document.body.appendChild(resultElement);
document.body.appendChild(resultlong);

fetchWeatherData(truncatedLatitude, truncatedLongitude);
// Function to fetch weather data using latitude and longitude
function fetchWeatherData(truncatedLatitude, truncatedLongitude) {
  const apiKey = "eecdd17c2a108b123dc9affad71629cc";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${truncatedLatitude}&lon=${truncatedLongitude}&appid=${apiKey}&units=metric`;


  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the weather data here
      console.log(data);
      const locationElement = document.getElementById("loc");
      const windSpeedElement = document.getElementById("windspeed");
      const humidityElement = document.getElementById("hum");
      const timeZoneElement = document.getElementById("timezone");
      const windPressureElement = document.getElementById("press");
      const widndirElement = document.getElementById("winddir");
      const UVwindElement = document.getElementById("uvind");
      const tempElement = document.getElementById("temp");
      console.log(locationElement);




      
      // Extract relevant weather information from 'data'
      const locationName = data.name; // Replace with actual location data
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
      const timeZone = data.timezone;
      const windPressure = data.main.pressure;
      const winddir = data.direction;
      const uvIndex = data.main.uvi; // UV index
      const temp = data.main.feels_like;



      console.log(uvIndex);

      // Extract time zone offset in seconds from 'data'
      const timeZoneOffsetSeconds = data.timezone;

      // Convert the time zone offset to hours and minutes
      const timeZoneOffsetHours = Math.abs(
        Math.floor(timeZoneOffsetSeconds / 3600)
      );
      const timeZoneOffsetMinutes = Math.abs(
        Math.floor((timeZoneOffsetSeconds % 3600) / 60)
      );

      // Determine the sign (plus or minus) for the time zone offset
      const timeZoneSign = timeZoneOffsetSeconds >= 0 ? "+" : "-";

      // Create a formatted string for the time zone
      const timeZoneFormatted = `GMT${timeZoneSign}${timeZoneOffsetHours}:${
        (timeZoneOffsetMinutes < 10 ? "0" : "") + timeZoneOffsetMinutes
      }`;

      // Log or display the formatted time zone information
      console.log(`Time Zone: ${timeZoneFormatted}`);













      
      // Function to convert wind direction in degrees to cardinal directions
function getWindDirection(degrees) {
    const directions = ['North', 'North-Northeast', 'Northeast', 'East-Northeast', 'East', 'East-Southeast', 'Southeast', 'South-Southeast', 'South', 'South-Southwest', 'Southwest', 'West-Southwest', 'West', 'West-Northwest', 'Northwest', 'North-Northwest'];
    const index = Math.round((degrees % 360) / 22.5);
    return directions[index % 16];
}

// Extract wind direction in degrees from 'data'
const windDirectionDegrees = data.wind.deg;

// Get the wind direction as a cardinal direction
const windDirectionCardinal = getWindDirection(windDirectionDegrees);

// Log or display the wind direction as a cardinal direction
console.log(`Wind Direction: ${windDirectionCardinal}`);

      

      locationElement.textContent = `Location: ${locationName}`;
      windSpeedElement.textContent = `Wind Speed: ${windSpeed} m/s`;
      humidityElement.textContent = `Humidity: ${humidity}`;
      timeZoneElement.textContent = `Time Zone: ${timeZoneFormatted}`;
      windPressureElement.textContent = `Wind Pressure: ${windPressure} atm`;
      widndirElement.textContent = `Wind Direction: ${windDirectionCardinal}`;
      UVwindElement.textContent = `UV Index: ${500}`;
      tempElement.textContent = `Feels Like:${temp}°`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
