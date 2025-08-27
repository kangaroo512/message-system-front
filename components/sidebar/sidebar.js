const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `
<style>
.terminal {
    position:fixed;
    top:50px;
    left:10px;
}
</style>
<div class="terminal">
<nav>
    <ul>
      <li><a href="#/home">Home</a></li>
      <li><a href="#/search-user">Search</a></li>
      <li>
        <a href="#/messages/inbox">Messages</a>
        <ul>
          <li><a href="#/messages/inbox">Inbox</a></li>
          <li><a href="#/messages/sent">Sent</a></li>
          <li><a href="#/messages/archived">Archived</a></li>
          <li><a href="#/messages/trash">Trash</a></li>
          <li><a href="#/messages/spam">Spam</a></li>
        </ul>
      </li>
      <li><a href="#NavigationList">Resources</a></li>
      <li>
        <a href="#NavigationList">Profile</a>
        <ul>
          <li><a href="#NavigationList">Account</a></li>
          <li><a href="#NavigationList">Billing</a></li>
          <li><a href="#NavigationList">Logout</a></li>
        </ul>
        </li>
    </ul>
  </nav>
  </div>
`;

class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});

        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css');
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
        
    }
}

customElements.define('app-sidebar', Sidebar);