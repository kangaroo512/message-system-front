import './user-search-form.js';
import './user-search-results.js';
import { UserService } from '../../services/UserService.js';

class UserSearchBar extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.currentPage = 0;
        this.userService = new UserService();
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this._loadBase();
        this._setActionButtons();
    }

    _loadBase() {
        this.shadowRoot.innerHTML = '';
        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css')`;
        
        const messagesTemplate = document.createElement('template');
        messagesTemplate.innerHTML = `
        <style>
            .message-container {
                min-width:100%;
            }
            .btn-group {
                display:flex;
                width:100%;
            }
            .btn-group button {
                flex:1;
            }

            .tab-content.active {
                display:block;
            }

            .panel {
                display:none;
            }

            .panel.active {
                display:block;
            }

            .panel {
                margin-top:10px;
            }

            
        </style>
<div class="message-container">
    <div class="btn-group">
      <button class="btn btn-default btn-ghost" data-target="search-form">Search</button>
      <button class="btn btn-default btn-ghost" data-target="favorite-search">Favorite Search</button>
      <button class="btn btn-default btn-ghost" data-target="results">Results</button>
    </div>

    <div class="main-content">
        <div class="panel search-form"><user-search-form></user-search-form></div>
        <div class="panel favorite-search">Favorite Search</div>
        <div class="panel results"><user-search-results></user-search-results></div>
    </div>

</div>
`;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(messagesTemplate.content.cloneNode(true));



    
    }

    _setActionButtons() {
        this.shadowRoot.querySelectorAll(".btn-group button").forEach(btn => {
            btn.addEventListener("click", () => {
                this.shadowRoot.querySelectorAll(".main-content .panel").forEach((element) => {
                    element.classList.remove("active");
                });
                const targetName = btn.getAttribute("data-target");
                const  panel = this.shadowRoot.querySelector(`.main-content .panel.${targetName}`);
                panel.classList.add("active");
            });
        });

        const buttonList = this.shadowRoot.querySelectorAll(".btn-group button");
        if(buttonList[0]) buttonList[0].click();





        this.shadowRoot.addEventListener("search-submit", info => {
            this.currentParams = info.detail;
            this.currentPage = 0;
            this._fetchResults();
            this._showPanel("results");
        });

        this.shadowRoot.addEventListener("next-page-outer", () => {
            console.log("next-page-outer");
            if(this.currentPage < 2) {
                this.currentPage++;
                this._fetchResults();
            }
        });

        this.shadowRoot.addEventListener("prev-page-outer", () => {
            console.log("prev-page-outer");
            if(this.currentPage > 0) {
                this.currentPage--;
                this._fetchResults();
            }
        });

    }

    _showPanel(name) {
        this.shadowRoot.querySelectorAll(".panel").forEach(el => el.classList.remove("active"));
        this.shadowRoot.querySelector(`.panel.${name}`).classList.add("active");
    }

    _fetchResults() {
        const page = this.userService.getUsers(this.currentPage);
        const results = this.shadowRoot.querySelector("user-search-results");
        results.setPage(page);
        console.log("these are the page items:" + page);
    }
    
    
}

customElements.define("user-search-bar", UserSearchBar);