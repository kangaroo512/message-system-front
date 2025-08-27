class UserSearchForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._loadBaseForm();
        this._submit();
    }

    _loadBaseForm() {
        this.shadowRoot.innerHTML = '';
        const formTemplate = document.createElement("template");
        formTemplate.innerHTML = `
  <form action="#" id="form">
    <fieldset>
      <legend>Find your buddy</legend>
      <div class="form-group">
        <label for="text">Username:</label>
        <input id="text" name="username" type="text" minlength="5" placeholder="username" data-ddg-inputtype="unknown">
      </div>
      <div class="form-group">
        <label for="select-country">Select Country:</label>
        <select id="select-country" name="select-country" data-ddg-inputtype="unknown">
          <option value="France">France</option>
          <option value="Japan">Japan</option>
        </select>
      </div>
      <div class="form-group">
        <label for="city">City:</label>
        <input id="city" name="city" type="text" minlength="5" placeholder="city" data-ddg-inputtype="unknown">
      </div>
      <div class="form-group">
        <label for="select-native-language">Native language:</label>
        <select id="select-native-language" name="select-native-language" data-ddg-inputtype="unknown">
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
        </select>
      </div>
      <div class="form-group">
        <label for="keyword">Keyword:</label>
        <input id="keyword" name="keyword" type="text" minlength="4" data-ddg-inputtype="unknown">
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" name="select-native-language" data-ddg-inputtype="unknown">
          <option value="femenin">Femenine</option>
          <option value="masculin">Masculine</option>
          <option value="Other">Other</option>
        </select>
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

    }

    _submit() {
      const form = this.shadowRoot.querySelector("form");
      if(!form) return;
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        this.dispatchEvent(new CustomEvent("search-submit", {
          detail:data,
          bubbles:true,
          compased:true
        }));
      });
    }
}

customElements.define("user-search-form", UserSearchForm);