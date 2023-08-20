import { LitElement, css, html } from 'lit';

export class FormDni extends LitElement {
  createRenderRoot() {
    return this;
  }
  static get properties() {
    return {
      count: { type: Number },
      urlBase: { type: String },
      formData: { type: Object },
      formName: { type: String },
      inputNames: { type: Object },
      description: { type: String },
      formatNewAdd: { type: Object },
    }
  }
  constructor() {
    super();
    this.count = 0;
    this.urlBase = "";
    this.formData = {};
    this.formName = '';
    this.newAdd = "text";
    this.inputNames = {};
    this.listAddType = [];
    this.description = '';
    this.formatNewAdd = {};
  }

  // We collect the data of selectable input types.
  handleSelectChange(event) {
    let idNewAdd = event.target.id;
    this.newAdd = event.target.value;
    this.formatNewAdd = {
      ...this.formatNewAdd,
      [idNewAdd]: this.newAdd
    }
  }
  // We remove an input that we don't want.
  deleteTypeInput(key) {
    delete this.formatNewAdd[key]
    delete this.inputNames[key];
    this.listAddType = this.listAddType.filter(e => e !== key)
    this.requestUpdate()
  }
  // We create a new input selection element.
  _addInput() {
    this.count++
    this.listAddType.push(this.count)
    let idNewAdd = this.count;
    this.newAdd = "text";
    this.formatNewAdd[idNewAdd] = this.newAdd
    this.inputNames[idNewAdd] = '';
    this.requestUpdate()
  }
  // We retrieve the data from the form and format it as required.
  handleSubmit(event) {
    event.preventDefault()
    // We format the input data before storing it.
    this.formData = this.formatNewAdd
    // We create the formData object with its necessary keys and values.
    this.formData = Object.keys(this.formatNewAdd).reduce((result, key) => {
      result[key] = {
        id: crypto.randomUUID(),
        type: this.formatNewAdd[key],
        name: this.inputNames[key]
      }
      return result;
    }, {});
    // We use the formatted data to create the final object that we will send to the backend.
    const newForm = {
      formname: this.formName,
      description: this.description,
      formdata: this.formData
    };
    fetch(this.urlBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newForm),
    })
      .then((response) => response.json())
      .then((data) => {
        // After finishing sending the data, we schedule a dispatch function after a delay to allow time for the backend to send and receive the new data, ensuring that the changes are reflected on the client.
        setTimeout(() => {
          this._dispatchItems();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al enviar los datos:', error.message);
      });

      // We reset the values to initiate the process again and save a new form.
    this.formName = '';
    this.description = '';
    this.formData = {};
    this.inputNames = {};
    this.formatNewAdd = {};
    this.count = 0;
    this.listAddType = [];
    this.requestUpdate();
  }
// We emit an event outside the component with a consistently different value to be picked up by the parent and force the rendering of the component.
  _dispatchItems() {
    this.dispatchEvent(new CustomEvent('setItems', {
      detail: { items: crypto.randomUUID() }, bubbles: true, composed: true
    }));
  }
  render() {
    return html`
      <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-5">
        <form @submit="${this.handleSubmit}">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700 dark:text-gray-200 font-bold" for="formName">Nombre del formulario:</label>
              <input required id="formName" type="text" .value="${this.formName}" @input="${e => (this.formName = e.target.value)}" placeholder="Nombre de tu formulario" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>
            <div>
              <label class="text-gray-700 dark:text-gray-200 font-bold" for="description">Descripción:</label>
              <textarea required id="description" type="email" .value="${this.description}" @input="${e => (this.description = e.target.value)}" placeholder="Describe brevemente tu formulario" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
            </div>
            <div>
            <h3 class="text-gray-700 dark:text-gray-200 font-bold">Inputs seleccionados</h3>
            ${Object.keys(this.formatNewAdd).map(e => html`
              <div class=" z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
              <a href="#" class="block px-4 py-3 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Input tipo 
              ${this.formatNewAdd[e]} ✅</a>
              </div>
            `)}
            </div>
            <div>
              <div>

                <label class="text-gray-700 dark:text-gray-200 font-bold" >Seleccione tipo de input a continuación:</label>
              </div>
            <div class="relative inline-block ">
            <p @click=${() => this._addInput()} class="font-bold b mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 hover:text-gray-200 focus:outline-none hover:bg-blue-500 transition-colors duration-300 transform">
              <span class="mx-1 ">Añadir input </span>
                <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
              </svg>
            </p>
          </div>
          ${this.listAddType.map(key => html`
          <div class="mt-5">
            <label class="text-gray-700 dark:text-gray-200" for="username"  >Nombre de input:</label>
            <input required id="inputName" type="text" .value="${this.inputNames[key]}" @input="${e => (this.inputNames[key] = e.target.value)}" placeholder="Este nombre se mostrara sobre tu input " class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"> 
              <select @change="${this.handleSelectChange}" id="${key}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" >
                <option id="${crypto.randomUUID()}" value="text">Texto</option>
                <option id="${crypto.randomUUID()}" value="number">Número</option>
                <option id="${crypto.randomUUID()}" value="password">Contraseña</option>
                <option id="${crypto.randomUUID()}" value="checkbox">Check</option>
                <option id="${crypto.randomUUID()}" value="date">Fecha</option>
                <option id="${crypto.randomUUID()}" value="email">E-mail</option>
              </select>
            <div class="relative inline-block ">
              <p @click=${() => this.deleteTypeInput(key)} class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-red-900 transition-colors duration-300 transform">
                <span class="mx-1">Eliminar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
              </p>
            </div>
          </div>
        `)}
          </div>
        </div>
          <div class="flex justify-end mt-6">
            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Enviar</button>
          </div>
        </form>
      </section>
      `;
  }
}
window.customElements.define('form-dni', FormDni)