const url = "https://restcountries.com/v3.1/name/";
const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const displayResult = document.getElementById("result");
searchBtn.addEventListener("click", getInfo);
async function getInfo() {
  const countryName = countryInp.value;
  const endpoint = `${url}${countryName}`;
  console.log(endpoint);
  if (countryName.length === 0) {
    displayResult.innerHTML = "<h3>The input field cannot be empty</h3>";
    return;
  }

  try {
    const response = await fetch(endpoint, { cache: "no-cache" });
    if (response.ok) {
      const jsonResponse = await response.json();

      showResult(jsonResponse);
    } else {
      displayResult.innerHTML = "<h3>Please enter a valid country name.</h3>";
    }
  } catch (error) {
    displayResult.innerHTML =
      "<h3>An error occurred. Please try again later.</h3>";
  }
}
function showResult(data) {
  displayResult.innerHTML = `
    <img src="${data[0].flags.svg}" class="flag-img">
  <h2>${data[0].name.common}</h2>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Capital:</h4>
          <span>${data[0].capital[0]}</span>
      </div>
  </div>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Continent:</h4>
          <span>${data[0].continents[0]}</span>
      </div>
  </div>
   <div class="wrapper">
      <div class="data-wrapper">
          <h4>Population:</h4>
          <span>${data[0].population}</span>
      </div>
  </div>
  <div class="wrapper">
      <div class="data-wrapper">
          <h4>Currency:</h4>
          <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${
    Object.keys(data[0].currencies)[0]
  }</span>
        </div>
    </div>
     <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(data[0].languages)
              .toString()
              .split(",")
              .join(", ")}</span>
        </div>
    </div>
  `;
}
