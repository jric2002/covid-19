class Card extends HTMLElement {
    constructor(country, code, cases, new_cases, deaths, recovered) {
        super();
        this.country = country;
        this.code = code;
        this.cases = cases.toLocaleString("es-ES");
        this.new_cases = new_cases;
        this.deaths = deaths;
        this.recovered = recovered;
        this.attachShadow({mode: "open"});
    }
    static get styles() {
        return `
        * {
            padding: 0;
            margin: 0;
        }
        :host {
            display: block;
            font-family: "Roboto", sans-serif;
            width: 250px;
            border: 1px solid rgba(255, 255, 255, 0.75);
            background-image: radial-gradient(farthest-side, rgba(36, 144, 252, 0.15), transparent);
            border-radius: 10px;
            display: grid;
            grid-template-areas: "header"
                                 "cases"
                                 "footer";
        }
        .header {
            grid-area: header;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        .header .country {
            color: #ffffff;
            font-size: 16px;
            padding: 0.25rem;
            margin: 0.25rem;
        }
        .header div {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.25rem;
            margin: 0.25rem;
        }
        .header div .code {
            color: rgba(255, 255, 255, 0.75);
            font-size: 14px;
            margin: 0 0 0 0.25rem;
        }
        .header div .flag {
            width: 20px;
            margin: 0 0 0 0.25rem;
        }
        .infected {
            grid-area: cases;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .infected h1 {
            color: #ffffff;
            cursor: pointer;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.25rem;
            margin: 0.25rem;
        }
        .infected h1::after {
            content: "Infectados";
            font-size: 12px;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.75);
            text-align: center;
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.75);
            position: absolute;
            transform: scale(0, 0);
            padding: 0.25rem;
            transition: transform 0.25s linear;
        }
        .infected h1:hover::after {
            transform: scale(1, 1);
        }
        .footer {
            grid-area: footer;    
        }
        .footer ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        .footer ul li {
            color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            padding: 0.25rem;
            margin: 0.25rem;
        }
        .footer ul .new-cases::after {
            content: "Nuevos infectados";
        }
        .footer ul .deaths::after {
            content: "Total de fallecidos";
        }
        .footer ul .recovered::after {
            content: "Total de recuperados";
        }
        .footer ul li::after {
            font-size: 12px;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.75);
            text-align: center;
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.75);
            position: absolute;
            top: 25px;
            left: 0;
            transform: scale(0, 0);
            padding: 0.25rem;
            transition: transform 0.25s linear;
        }
        .footer ul li:hover::after {
            transform: scale(1, 1);
        }`;
    }
    shortNum(number) {
        const UNITS = ["", "k", "m", "b", "t"];
        var id = 0;
        while (number > 999) {
            number = number / 1000;
            id += 1;
        }
        return (String(number.toFixed(1)) + UNITS[id]);
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
        <style type="text/css">${Card.styles}</style>
        <div class="header">
            <p class="country">${this.country}</p>
            <div>
                <span class="code">${this.code}</span>
                <img src="https://www.countryflags.io/${this.code}/flat/64.png" class="flag" alt="${this.country}"/>
            </div>
        </div>
        <div class="infected">
            <h1>${this.cases}</h1>
        </div>
        <div class="footer">
            <ul>
                <li class="new-cases">☣&nbsp;${this.shortNum(this.new_cases)}</li>
                <li class="deaths">💀&nbsp;${this.shortNum(this.deaths)}&nbsp;☠</li>
                <li class="recovered">💚&nbsp;${this.shortNum(this.recovered)}</li>
            </ul>
        </div>`;
    }
}

window.customElements.define("covid-19-card", Card);
export { Card };

var j = "adf";