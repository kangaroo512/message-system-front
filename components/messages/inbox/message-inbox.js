import { MessageService } from "../../../services/MessageService.js";
import '../../paginator/paginator.js';

class Inbox extends HTMLElement {
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
        const actionButtons = this.shadowRoot.querySelectorAll(".btn-group button");
        console.log(actionButtons);
        actionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log("Loading button...");
                const target = btn.getAttribute("data-target");
                const methodName = target + 'Method';
                if(typeof this[methodName] === 'function') {
                    this[methodName](this.getSelectedMessages());
                } else {
                    return;
                }
                

            });
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
    receivedMethod(selectedMessages) {
        if(Array.isArray(selectedMessages)) {
            selectedMessages.forEach(conversation => {
                console.log(JSON.stringify(conversation));
            });
        } else {
            console.log("NO MESSAGES");
        }
    }

    sentMethod() {
        console.log("THIS IS A SENT MESSAGE");
    }

    archivedMethod() {
        console.log("THIS IS AN ARCHIVED METHOD");
    }

    trashMethod() {
        console.log("THIS IS A TRASH METHOD");
    }

    spamMethod() {
        console.log("THIS IS A SPAM METHOD");
    }

    //BUTTONS TEMPLATE
    getButtonTemplate() {
        return `
            <div class="btn-group">
                <button class="btn btn-default btn-ghost" data-target="received">Received</button>
                <button class="btn btn-default btn-ghost"data-target="sent">Sent</button>
                <button class="btn btn-default btn-ghost" data-target="archived">Archived</button>
                <button class="btn btn-default btn-ghost" data-target="trash">Trash</button>
                <button class="btn btn-default btn-ghost" data-target="spam">Spam</button>
            </div>
        `;
    }


}

customElements.define('message-inbox', Inbox);