import './inbox/message-inbox.js';
import './sent/message-sent.js';
import './archive/message-archive.js';
import './spam/message-spam.js';
import './trash/message-trash.js';

class AppMessages extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        //add styling

        
    }

    static get observedAttributes() {
        return ['default-view'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'default-view') {
            this.defaultView = newValue;
            // if already connected, re-render with the new view
            if (this.isConnected) {
                this.render();
            }
        }
    }


    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = '';
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

            .tab-content {
                display:none;
            }

            .tab-content.active {
                display:block;
            }

            
        </style>
<div class="message-container">
    <div class="btn-group">
      <button class="btn btn-default btn-ghost" data-target="message-inbox">Inbox</button>
      <button class="btn btn-default btn-ghost" data-target="message-sent">Sent</button>
      <button class="btn btn-default btn-ghost" data-target="message-archive">Archived</button>
      <button class="btn btn-default btn-ghost" data-target="message-trash">Trash</button>
      <button class="btn btn-default btn-ghost" data-target="message-spam">Spam</button>
    </div>

    <div class="main-content"></div>

</div>
`;
        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css')`;
        
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(messagesTemplate.content.cloneNode(true));
        

        const buttons = this.shadowRoot.querySelectorAll(".btn-group button");


        buttons.forEach(btn => {
            btn.addEventListener('click', () => {

                const attr = btn.getAttribute("data-target");
                const mainContent = this.shadowRoot.querySelector(".main-content");
                mainContent.innerHTML = '';
                mainContent.innerHTML = `<${attr}></${attr}>`;
            });
        });

        //side bar routes
        switch(this.defaultView) {
            case "inbox":
                buttons[0].click();
                break;
            case "sent":
                buttons[1].click();
                break;
            case "archived":
                buttons[2].click();
                break;
            case "trash":
                buttons[3].click();
                break;
            case "spam":
                buttons[4].click();
                break;
            default:
                buttons[0].click();
                break;
        }
        

    }

    
}

customElements.define('app-messages', AppMessages);