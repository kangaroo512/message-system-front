import { MessageService } from "../../../services/MessageService.js";
import '../../paginator/paginator.js';

class Trash extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.messageService = new MessageService();
        this.currentPage = 0;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const page = this.messageService.getMessages(this.currentPage);
        this._renderBaseTemplate();
        this._renderMessages(page);
        this._setupPaginator(page);
        this._setupSelectAll();
        this._setupActionButtons();
    }

    _renderBaseTemplate() {
        this.shadowRoot.innerHTML = "";

        const inboxTemplate = document.createElement('template');
        inboxTemplate.innerHTML = `
        ${this.getDestroyOverlay()}
    <table>
        <caption>
            ${this.getButtonTemplate()}
        </caption>
        <tfoot>
            <tr>
                <th colspan="5"><app-paginator></app-paginator></th>
            </tr>
        </tfoot>
        <tbody>
        </tbody>
        <thead>
            <tr>
                <th><input type="checkbox" class="select-all"></th>
                <th>Name</th>
                <th># Messages</th>
                <th>Message preview</th>
                <th>Sent/Received</th>
            </tr>
        </thead>
        <tbody class="inbox-content">
        </tbody>
    </table>
        `;
        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css')`;
        
         this.shadowRoot.appendChild(style);
         this.shadowRoot.appendChild(inboxTemplate.content.cloneNode(true));
    }

    _renderMessages(page) {
        const tbody = this.shadowRoot.querySelector("tbody.inbox-content");

        if(!page) {
            tbody.innerHTML = `<tr><td colspan="5">NO MESSAGES</td></tr>`;
            return;
        }

        for(const message of page.content) {
            tbody.appendChild(this._createMessageRow(message));
        }
    }

    _createMessageRow(message) {
            const tr = document.createElement('tr');

            tr.dataset.conversationId = message.conversationId;
            tr.dataset.name = message.name;
            tr.dataset.numberOfMessages = message.numberOfMessages;
            tr.dataset.messagePreview = message.messagePreview;
            tr.dataset.date = message.date;

            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            const checkTag = document.createElement('td');
            checkTag.setAttribute('conversation-id', `${message.conversationId}`);

            const nameTag = document.createElement('td');
            const numberTag = document.createElement('td');
            const previewTag = document.createElement('td');
            const dateTag = document.createElement('td');

            checkTag.appendChild(checkbox);
            nameTag.innerHTML = `${message.name}`;
            numberTag.innerHTML = `${message.numberOfMessages}`;
            previewTag.innerHTML = `${message.messagePreview}`;
            dateTag.innerHTML = `${message.date}`;

            tr.appendChild(checkTag);
            tr.appendChild(nameTag);
            tr.appendChild(numberTag);
            tr.appendChild(previewTag);
            tr.appendChild(dateTag);

            return tr;
    }

    _setupPaginator(page) {
        //PAGINATOR
        const paginator = this.shadowRoot.querySelector("app-paginator");
        paginator.setPageInfo(this.currentPage, page.totalPages);
        paginator.addEventListener("prev-page", () => {
            this.currentPage--;
            this.render();
        });

        paginator.addEventListener("next-page", () => {
            this.currentPage++;
            this.render();
        });
    }

    _setupSelectAll() {
        //SELECT ALL CHECKBOX
        const selectAllCheck = this.shadowRoot.querySelector(".select-all");
        selectAllCheck.addEventListener("change", () => {
            this.shadowRoot.querySelectorAll(".inbox-content tr input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = selectAllCheck.checked;
            });
        });

        //UNSELECT TOP CHECKBOX IF ANY OF THE OTHERS BOXES GETS UNCHECKED
        this.shadowRoot.querySelectorAll(".inbox-content input[type='checkbox']").forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                if(!checkbox.checked) {
                    selectAllCheck.checked = false;
                } else {
                    const all = this.shadowRoot.querySelectorAll(".inbox-content input[type='checkbox']");
                    const allChecked = Array.from(all).every(cb => cb.checked);
                    selectAllCheck.checked = allChecked;
                }
            });
        });
    }

    _setupActionButtons() {
        //received, sent, archived, trash, spam buttons
        const destroyBtn = this.shadowRoot.querySelector(".btn-group button[data-target='Destroy']");
        const dropdown = this.shadowRoot.querySelector("#myDropdown");


        destroyBtn.addEventListener("click", () => this.destroy(this.getSelectedMessages()));
        dropdown.addEventListener("change", (event) => {
            const option = event.target.value;
            const methodName = "moveTo" + option;
            if(typeof this[methodName] === "function") {
                console.log(methodName);
                this[methodName](this.getSelectedMessages());
            }
        });


    }

    getSelectedMessages() {
        if(!this.shadowRoot) return [];
        
        const inboxContent = this.shadowRoot.querySelectorAll("tbody.inbox-content tr");
        
        if(!inboxContent) return [];

        let checkedMessages = [];

        inboxContent.forEach(row => {
            const check = row.querySelector("input[type='checkbox']");
            if(check && check.checked) {
                checkedMessages.push({
                    conversationId:row.dataset.conversationId,
                    name:row.dataset.name,
                    numberOfMessages:row.dataset.numberOfMessages,
                    messagePreview:row.dataset.messagePreview,
                    date:row.dataset.date
                });
            }
        });
        return checkedMessages;

    }


    //BUTTON METHODS
    moveToInbox(selectedMessages) {
        if(Array.isArray(selectedMessages)) {
            selectedMessages.forEach(conversation => {
                console.log(JSON.stringify(conversation));
            });
        } else {
            console.log("NO MESSAGES");
        }
    }

    moveToSent(selectedMessages) {
        console.log("THIS IS A SENT MESSAGE");
    }

    moveToArchive(selectedMessages) {
        console.log("THIS IS AN ARCHIVE METHOD");
    }

    destroy(selectedMessages) {

        console.log("DESTROY THIS MESSAGES!");

        const overlay = this.shadowRoot.querySelector("#overlay");
        if(overlay) {
            overlay.classList.remove("hidden");

            setTimeout(() => {
                overlay.classList.add("hidden");
            }, 2000);
        }

    }

    //BUTTONS TEMPLATE
    getButtonTemplate() {
        return `
            <style>
                #myDropdown {
                    height:36px;
                }
            </style>
            <div class="btn-group">
                <select id="myDropdown" name="myDropdown" class="btn btn-default btn-ghost">
                    <option value="" selected disabled>— Move to —</option>
                    <option value="Inbox" class="btn btn-default btn-ghost">Inbox</option>
                    <option value="Sent" class="btn btn-default btn-ghost">Sent</option>
                    <option value="Archive" class="btn btn-default btn-ghost">Archive</option>
                </select>
                <button class="btn btn-default btn-ghost" data-target="Destroy">Destroy</button>
            </div>
        `;
    }

    getDestroyOverlay() {
        return `
        <style>
            .overlay {
                position: fixed;        /* cover the whole page */
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0,0,0,0.8); /* semi-transparent background */
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;          /* on top of everything */
            }

            .overlay img {
                position:absolute;
                max-width: 80%;
                max-height: 80%;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            }

            .hidden {
                display: none;
            }

            .overlay .background {
                z-index: 1; /* base image */
            }

            .overlay .gif {
                 z-index: 2; /* GIF on top */
            }

        </style>
        <div id="overlay" class="overlay hidden">
            <img class="background" src="./images/thistroy.jpg" alt="Deleted">
            <img class="gif" src="https://media.tenor.com/SLEQa_uyE40AAAAi/fire-clear-background.gif" alt="fire">
        </div>

        `;
    }


}

customElements.define('message-trash', Trash);