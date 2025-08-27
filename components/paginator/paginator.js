class Paginator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.page = 0;
        this.totalPages = 0;
    }

    setPageInfo(page, totalPages) {
        this.page = page;
        this.totalPages = totalPages;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <div>
                <button id="prev" ${this.page <= 0 ? "disabled": ""}>Prev</button>
                <span>Page ${this.page  + 1} of ${this.totalPages}</span>
                <button id="next" ${this.page + 1 >= this.totalPages ? "disabled" : ""}>Next</button>
            </div>
        `;

        this.shadowRoot.querySelector("#prev")
        ?.addEventListener("click", () => this.dispatchEvent(new CustomEvent("prev-page")));
        this.shadowRoot.querySelector("#next")
        ?.addEventListener("click", () => this.dispatchEvent(new CustomEvent("next-page")));
    }
}

customElements.define("app-paginator", Paginator);