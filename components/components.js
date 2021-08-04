import { Card } from "./Card.js";

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
        console.log(error);
    }
}

var information = await requestCovid19();
information = information["Countries"];
var country, code, cases, new_cases, deaths, recovered;
const QUANTITY = information.length;
var card;
const covid_19 = document.getElementById("covid-19");
for (var i = 0; i < QUANTITY; i++) {
    country = information[i]["Country"];
    code = information[i]["CountryCode"];
    cases = information[i]["TotalConfirmed"];
    new_cases = information[i]["NewConfirmed"];
    deaths = information[i]["TotalDeaths"];
    recovered = information[i]["TotalRecovered"];
    card = new Card(country, code, cases, new_cases, deaths, recovered);
    covid_19.appendChild(card);
}