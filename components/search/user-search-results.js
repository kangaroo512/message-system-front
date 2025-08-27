import '../paginator/paginator.js';

class UserSearchResults extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.page = null;
    }

    connectedCallback() {
        this.render();
    }

    setPage(page) {
        this.page = page;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = "";
        this._loadBasicTemplate();
        this._renderUsers(this.page);
        if(this.page) {
            this._setupPaginator(this.page);
        }
    }

    _loadBasicTemplate() {
        const  resultTemplate = document.createElement("template");
        resultTemplate.innerHTML = `
            <style>
                footer {
                    display:flex;
                    justify-content:center;
                    align-items:center;  
                }

                header {
                    display:flex;
                    position:relative;
                    justify-content:center;
                }

                .send-message-container {
                    position:absolute;
                    right:10px;
                }

                .message-envelope {
                    height:20px;
                    width:30px;
                }
            </style>
            <div class="main-content">
                <div class=users-container></div>
                <footer><app-paginator></app-paginator></footer>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css');
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(resultTemplate.content.cloneNode(true));
        
    }

    _renderUsers(page) {
        const mainBody = this.shadowRoot.querySelector("div.users-container");
        mainBody.innerHTML = "";

        if(!page || !page.content) {
            mainBody.innerHTML = `NO USERS`;
            return;
        }

        for(const user of page.content) {
            mainBody.appendChild(this._createUserCard(user));
        }
    }

    _createUserCard(user) {
        const divContent = document.createElement("div");
        const table = document.createElement('table');
        
        table.dataset.username = user.username;
        table.dataset.avatar = user.avatar;
        table.dataset.status = user.status;
        table.dataset. country = user.country;
        table.dataset.city = user.city;
        table.dataset.nativeLanguage = user.nativeLanguage;
        table.dataset.timeZone = user.timeZone;
        table.dataset.joinedDate = user.joinedDate;
        table.dataset.onlineStatus = user.onlineStatus;
        table.dataset.interests = user.interests;
        table.dataset.gender = user.gender;

        const content = `
            <tr>
                <th>Avatar: </th>
                <td>${user.avatar || ''}</td>
            <tr>
            <tr>
                <th>Status: </th>
                <td>${user.status || ''}</td>
            <tr>
            <tr>
                <th>Country: </th>
                <td>${user.country || ''}</td>
            <tr>
            <tr>
                <th>City: </th>
                <td>${user.city || ''}</td>
            <tr>
            <tr>
                <th>Native Language: </th>
                <td>${user.nativeLanguage || ''}</td>
            <tr>
            <tr>
                <th>Timezone: </th>
                <td>${user.timeZone || ''}</td>
            <tr>
            <tr>
                <th>Joined: </th>
                <td>${user.joinedDate || ''}</td>
            <tr>
            <tr>
                <th>Online: </th>
                <td>${user.onlineStatus || ''}</td>
            <tr>
            <tr>
                <th>Interests: </th>
                <td>${user.interests || ''}</td>
            <tr>
            <tr>
                <th>Gender: </th>
                <td>${user.gender || ''}</td>
            <tr>
        `;

        const card = document.createElement("div");
        card.classList.add("terminal-card");

        const sendMessage = this.createSendMessageDiv();
        
        const header = document.createElement("header");
        header.innerHTML = `${user.username || ''}`;
        header.appendChild(sendMessage);

        card.appendChild(header);

        table.innerHTML = content;

        divContent.appendChild(table);
        card.appendChild(divContent);

        return card;
        
    }

    _setupPaginator(page) {
        //PAGINATOR
        const paginator = this.shadowRoot.querySelector("app-paginator");
        paginator.setPageInfo(page.pageNumber, page.totalPages);
        paginator.addEventListener("prev-page", () => this.dispatchEvent(new CustomEvent("prev-page-outer", {bubbles:true})));

        paginator.addEventListener("next-page", () => this.dispatchEvent(new CustomEvent("next-page-outer", {bubbles:true})))
    }

    createSendMessageDiv() {
        const messageTemplate = document.createElement("div");
        messageTemplate.classList.add("send-message-container");
        messageTemplate.innerHTML = `
            <img class="message-envelope" src="./images/letterbox.png"></img>
        `;
        return messageTemplate;
    }


}

customElements.define("user-search-results", UserSearchResults);