class UserForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this._userData = null;

    }

    set data(userData) {
        this._userData = userData;
        this.fill();
        this.render();
    }

    get data() {
        return this._userData;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const formTemplate = document.createElement("template");
        formTemplate.innerHTML = `
  <form action="#" id="form">
    <fieldset>
      <legend>Form legend</legend>
      <div class="form-group">
        <label for="email">Email input:</label>
        <input id="email" name="email" type="email" required="" minlength="5" placeholder="test" data-ddg-inputtype="identities.emailAddress">
      </div>
      <div class="form-group">
        <label for="text">Text input:</label>
        <input id="text" name="text" type="text" required="" minlength="5" placeholder="test" data-ddg-inputtype="unknown">
      </div>
      <div class="form-group">
        <label for="itext">Invalid input (min-length 10):</label>
        <input id="itext" name="itext" type="text" minlength="10" data-ddg-inputtype="unknown">
      </div>
      <div class="form-group">
        <label for="pw">Password input:</label>
        <input type="password" id="pw" name="pw" value="password" data-ddg-inputtype="credentials.password.new" data-ddg-autofill="true" style="background-size: auto 24px !important; background-position: right center !important; background-repeat: no-repeat !important; background-origin: content-box !important; background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsPSIjMDAwIiBkPSJNOC4wNDcgNC42MjVDNy45MzcgNC4xMjUgNy44NjIgNCA3LjUgNGMtLjM2MiAwLS40MzguMTI1LS41NDcuNjI1LS4wNjguMzEtLjE3NyAxLjMzOC0uMjUxIDIuMDc3LS43MzguMDc0LTEuNzY3LjE4My0yLjA3Ny4yNTEtLjUuMTEtLjYyNS4xODQtLjYyNS41NDcgMCAuMzYyLjEyNS40MzcuNjI1LjU0Ny4zMS4wNjcgMS4zMzYuMTc3IDIuMDc0LjI1LjA3My43NjcuMTg1IDEuODQyLjI1NCAyLjA3OC4xMS4zNzUuMTg1LjYyNS41NDcuNjI1LjM2MiAwIC40MzgtLjEyNS41NDctLjYyNS4wNjgtLjMxLjE3Ny0xLjMzNi4yNS0yLjA3NC43NjctLjA3MyAxLjg0Mi0uMTg1IDIuMDc4LS4yNTQuMzc1LS4xMS42MjUtLjE4NS42MjUtLjU0NyAwLS4zNjMtLjEyNS0uNDM4LS42MjUtLjU0Ny0uMzEtLjA2OC0xLjMzOS0uMTc3LTIuMDc3LS4yNTEtLjA3NC0uNzM5LS4xODMtMS43NjctLjI1MS0yLjA3N1oiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0xNC42ODEgNS4xOTljLS43NjYgMC0xLjQ4Mi4yMS0yLjA5My41NzhhLjYzNi42MzYgMCAwIDEtLjY1NS0xLjA5IDUuMzQgNS4zNCAwIDEgMSAxLjMwMiA5LjcyMmwtLjc3NS43NzZhLjYzNi42MzYgMCAwIDEtLjQ1LjE4NmgtMS4zOTh2MS42NWMwIC40OTMtLjQuODkzLS44OTMuODkzSDguNTc4djEuMTQxYzAgLjQ5NC0uNC44OTMtLjg5NC44OTNINC42MzZBLjYzNi42MzYgMCAwIDEgNCAxOS4zMTNWMTYuMjZjMC0uMTY5LjA2Ny0uMzMuMTg2LS40NWw1LjU2Mi01LjU2MmEuNjM2LjYzNiAwIDEgMSAuOS45bC01LjM3NiA1LjM3NXYyLjE1M2gyLjAzNHYtMS4zOTljMC0uMzUuMjg1LS42MzYuNjM2LS42MzZIOS4zNHYtMS45MDdjMC0uMzUxLjI4NC0uNjM2LjYzNS0uNjM2aDEuNzcxbC44NjQtLjg2M2EuNjM2LjYzNiAwIDAgMSAuNjY4LS4xNDcgNC4wNjkgNC4wNjkgMCAxIDAgMS40MDItNy44OVoiLz4KICAgIDxwYXRoIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjYyNSA4LjQ5OWExLjg3NSAxLjg3NSAwIDEgMSAzLjc1IDAgMS44NzUgMS44NzUgMCAwIDEtMy43NSAwWm0xLjg3NS0uNjI1YS42MjUuNjI1IDAgMSAwIDAgMS4yNS42MjUuNjI1IDAgMCAwIDAtMS4yNVoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPgogICAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTQuNjI1IDEyLjEyNWEuNjI1LjYyNSAwIDEgMCAwLTEuMjUuNjI1LjYyNSAwIDAgMCAwIDEuMjVaIi8+Cjwvc3ZnPgo=&quot;) !important; transition: background !important;">
      </div>
      <div class="form-group">
        <label for="radio">Radio input:</label>
        <input name="radio" type="radio" id="radio">
      </div>
      <div class="form-group">
        <label for="check">Checkbox input:</label>
        <input type="checkbox" id="check">
      </div>
      <div class="form-group">
        <label for="select">Select field:</label>
        <select id="select" name="select" data-ddg-inputtype="unknown">
          <option> Option 01 </option>
          <option> Option 02 </option>
        </select>
      </div>
      <div class="form-group">
        <label for="event-date">Event date:</label>
        <input type="date" id="event-date" name="event-date">
      </div>
      <div class="form-group">
        <label for="event-time">Event time:</label>
        <input type="time" id="event-time" name="event-time">
      </div>
      <div class="form-group">
        <label for="textarea">Textarea:</label>
        <textarea id="textarea" cols="30" rows="5" name="=&quot;textarea&quot;">Textarea text</textarea>
      </div>
      <div class="form-group">
        <label for="submit">Input Button:</label>
        <button class="btn btn-default" type="submit" role="button" name="submit" id="submit">Submit</button>
      </div>
    </fieldset>
  </form>
        `;

        const style = document.createElement('style');
        style.textContent = `
         @import url('https://unpkg.com/terminal.css@0.7.4/dist/terminal.min.css');
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
        const form = this.shadowRoot.getElementById("form");


    }

    fill() {

    }
}

customElements.define('app-user-form', UserForm);