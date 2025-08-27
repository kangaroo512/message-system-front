const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `
<div class="terminal">
<div class="terminal-nav">
    <div class="terminal-logo">
      <div class="logo terminal-prompt"><a href="#" class="no-style">N.A.V.I. Message System</a></div>
    </div>
    <nav class="terminal-menu">
      <ul>
        <li><a class="menu-item" href="#">Item #1</a></li>
        <li><a class="menu-item active" href="#">Active Item #2</a></li>
        <li><a class="menu-item" href="#">Item #3</a></li>
      </ul>
    </nav>
</div>
</div>
`;

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});

        /*
        fetch("https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css")
        .then(res => res.text())
        .then(css => {
            console.log(css);
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(css);
            this.shadowRoot.adoptedStyleSheets = [sheet];
        });
*/

        const style = document.createElement('style');
        style.textContent = `
        @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css');
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
    }

}

customElements.define('app-navbar', Navbar);