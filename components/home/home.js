class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        
        
    }

    connectedCallback() {

        this.render();
    }

    render() {
        const homeTemplate = document.createElement('template');
        homeTemplate.innerHTML = `
<div class="terminal-card">
    <header>Card Title</header>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
      ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
      incidunt. Eaque quod et, aut maiores excepturi sint.
    </div>
</div>
<div class="terminal-card">
    <header>Wha't s a Navi</header>
    <div><img src=""></div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
      ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
      incidunt. Eaque quod et, aut maiores excepturi sint.
    </div>
</div>
<div class="terminal-card">
    <header>Lain Iwakura</header>
    <div><img src="./images/lain_iwakura.jpg"></div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
      ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
      incidunt. Eaque quod et, aut maiores excepturi sint.
    </div>
</div>
        `;
        const style = document.createElement("style");
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css');
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(homeTemplate.content.cloneNode(true));

    }


}

customElements.define('app-home', Home);