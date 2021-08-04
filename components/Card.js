class Card extends HTMLElement {
    constructor(country, code, cases, new_cases, deaths, recovered) {
        super();
        this.country = country;
        this.code = code;
        this.cases = cases.toLocaleString("es-ES");
        this.new_cases = new_cases.toLocaleString("es-ES");
        this.deaths = deaths.toLocaleString("es-ES");
        this.recovered = recovered.toLocaleString("es-ES");
        this.attachShadow({mode: "open"});
    }
    static get styles() {
        return `
        * {
            padding: 0;
            margin: 0;
        }
        :host {
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
            margin: 0.5rem;
        }
        .header .code {
            color: rgba(255, 255, 255, 0.75);
            font-size: 14px;
            padding: 0.25rem;
            margin: 0.5rem;
        }
        .cases {
            grid-area: cases;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cases h1 {
            color: #ffffff;
            padding: 0.25rem;
            margin: 0.5rem;
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
        .footer ul .new-cases:hover::after {
            content: "Nuevos infectados";
        }
        .footer ul .deaths:hover::after {
            content: "Total de fallecidos";
        }
        .footer ul .recovered:hover::after {
            content: "Total de recuperados";
        }
        .footer ul li:hover::after {
            content: "Nuevos infectados";
            font-size: 12px;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.75);
            text-align: center;
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.75);
            position: absolute;
            top: 25px;
            left: 0;
            padding: 0.25rem;
        }`;
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.shadowRoot.innerHTML = `
        <style type="text/css">${Card.styles}</style>
        <div class="header">
            <p class="country">${this.country}</p>
            <p class="code">${this.code}</p>
        </div>
        <div class="cases">
            <h1>${this.cases}</h1>
        </div>
        <div class="footer">
            <ul>
                <li class="new-cases">☣&nbsp;${this.new_cases}</li>
                <li class="deaths">💀&nbsp;${this.deaths}&nbsp;☠</li>
                <li class="recovered">💚&nbsp;${this.recovered}</li>
            </ul>
        </div>`;
    }
}

window.customElements.define("covid-19-card", Card);
export { Card };