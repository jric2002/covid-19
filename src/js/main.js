import { Card } from "./../components/Card.js";

/* Http request */
const URL = "https://api.covid19api.com/summary";
async function requestCovid19() {
  try {
    const RESPONSE = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const DATA = RESPONSE.json();
    return DATA;
  }
  catch(error) {
    return error;
  }
}
requestCovid19().then(function(information) {
  const COVID_19 = document.getElementById("covid-19");
  information = information["Countries"];
  const QUANTITY_CARDS = information.length;
  var card;
  var countries = [], country, code, cases, new_cases, deaths, recovered;
  var id_country = null;
  for (var i = 0; i < QUANTITY_CARDS; i++) {
    id_country = i;
    countries[id_country] = information[id_country]["Country"];
    country = countries[id_country];
    code = information[id_country]["CountryCode"];
    cases = information[id_country]["TotalConfirmed"];
    new_cases = information[id_country]["NewConfirmed"];
    deaths = information[id_country]["TotalDeaths"];
    recovered = information[id_country]["TotalRecovered"];
    card = new Card(country, code, cases, new_cases, deaths, recovered);
    COVID_19.appendChild(card);
  }

  /* Search process */
  const BOX_SEARCH = document.getElementById("box-search");
  const BUTTON_SEARCH = document.getElementById("button-search");
  //const COVID_19_CARD = document.getElementsByTagName("covid-19-card");

  function searchCountry(text) {
    var filtered_contries = [];
    for (var i = 0; i < countries.length; i++) {
      var country = countries[i].toLowerCase();
      if (country.startsWith(text)) {
        filtered_contries.push(i);
      }
    }
    return filtered_contries;
  }
  function results() {
    /*
    for (var i = (COVID_19_CARD.length - 1); 0 < COVID_19_CARD.length; i--) {
      COVID_19.removeChild(COVID_19_CARD[i]);
    }
    */
    COVID_19.innerHTML = "";
    var text = BOX_SEARCH.value.toLowerCase();
    const FILTERED_COUNTRIES = searchCountry(text);
    const SEARCH_STATUS = (FILTERED_COUNTRIES.length > 0) ? true : false;
    if (SEARCH_STATUS) {
      for (var i = 0; i < FILTERED_COUNTRIES.length; i++) {
        id_country = FILTERED_COUNTRIES[i];
        country = information[id_country]["Country"];
        code = information[id_country]["CountryCode"];
        cases = information[id_country]["TotalConfirmed"];
        new_cases = information[id_country]["NewConfirmed"];
        deaths = information[id_country]["TotalDeaths"];
        recovered = information[id_country]["TotalRecovered"];
        card = new Card(country, code, cases, new_cases, deaths, recovered);
        COVID_19.appendChild(card);
      }
    }
    else {
      COVID_19.innerHTML = "<strong style=\"color: #ffffff; padding: 1rem;\">No hay resultados...</strong>";
    }
  }

  BOX_SEARCH.addEventListener("input", results);
  //BUTTON_SEARCH.addEventListener("click", results);
})
.catch(function(error) {
  console.log(error)
});