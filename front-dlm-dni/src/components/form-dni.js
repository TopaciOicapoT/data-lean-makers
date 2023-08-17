import { LitElement, css, html } from 'lit';

export class FormDni extends LitElement {

  createRenderRoot() {
    return this;
  }
  static get properties(){
    return{
      formName:{type: String},
      description:{type: String},
      formData:{type: Object},
      count:{type: Number},
      formatNewAdd:{type:Object},
      inputNames:{type: Object}
    }
  }
  constructor() {
    super();
    this.formName = '';
    this.description = '';
    this.formData = {};
    this.inputNames = {};
    this.listAddType = [];
    this.newAdd = "text";
    this.count = 0;
    this.formatNewAdd = {};

  }
  handleSelectChange(event) {

    let idNewAdd = event.target.id;
    this.newAdd = event.target.value;
    this.formatNewAdd={
      ...this.formatNewAdd,
      [idNewAdd]: this.newAdd
    }
  }
  deleteTypeInput(key){
    delete this.formatNewAdd[key]
    delete this.inputNames[key];
    this.listAddType=this.listAddType.filter(e=>e !==key)    
    this.requestUpdate()
  }
  _addInput() {
    this.count++
    this.listAddType.push(this.count)
    let idNewAdd = this.count;
    this.newAdd = "text";
    this.formatNewAdd[idNewAdd]= this.newAdd
    this.inputNames[idNewAdd] = '';
    this.requestUpdate()
  }
  handleSubmit(event) {
    event.preventDefault()
    this.formData= this.formatNewAdd
    this.formData = Object.keys(this.formatNewAdd).reduce((result, key)=>{
      result[key]= {
        type: this.formatNewAdd[key],
        name: this.inputNames[key]
      }
      return result;
    }, {});
    const newForm = {
      formname: this.formName,
      description: this.description,
      formdata: this.formData
    };
    
    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newForm),
    })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        this._dispatchItems(data);
      }, 1000);
    })
    .catch((error) => {
      
      console.error('Error al enviar los datos:', error.message);
    });
    this.formName = '';
    this.description = '';
    this.formData = {};
    this.inputNames = {};
    this.formatNewAdd = {};
    this.count = 0;
    this.listAddType = [];
    this.requestUpdate();
    
  }

  _dispatchItems() {
    this.dispatchEvent(new CustomEvent('setItems', {
      detail: { items: new Date().getTime() }, bubbles: true, composed: true
    }));
  }

  render() {
    return html`
  <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-5">


    <form @submit="${this.handleSubmit}">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="formName">Nombre del formulario</label>
                <input required id="formName" type="text" .value="${this.formName}" @input="${e => (this.formName = e.target.value)}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" for="description">Descripción</label>
                <textarea required id="description" type="email" .value="${this.description}" @input="${e => (this.description = e.target.value)}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
            </div>

            <div>
                <label class="text-gray-700 dark:text-gray-200" >Seleccione tipo de input a continuación:</label>
                ${Object.keys(this.formatNewAdd).map(e => html`
                <div class=" z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
                <a href="#" class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                 ${e}: ${this.formatNewAdd[e]} </a>

                </div>
                
                
                
                `)}
              <div class="relative inline-block ">
                  <p @click=${() => this._addInput()} class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-blue-500 transition-colors duration-300 transform">
                      <span class="mx-1">Añadir input</span>
                      <svg class="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                      </svg>
                  </p>
              </div>
            ${this.listAddType.map(key => html`
            
            <div class="mt-5">
                <label class="text-gray-700 dark:text-gray-200" for="username">Nombre del input: ${key}</label>
                  <input required id="inputName" type="text" .value="${this.inputNames[key]}" @input="${e => (this.inputNames[key] = e.target.value)}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"> 
                <select @change="${this.handleSelectChange}" id="${key}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" >
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="password">Contraseña</option>
                  <option value="checkbox">Check</option>
                  <option value="date">Fecha</option>
                  <option value="email">E-mail</option>
                </select>
                <div class="relative inline-block ">
                  <p @click=${() => this.deleteTypeInput(key)} class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-red-900 transition-colors duration-300 transform">
                      <span class="mx-1">Eliminar</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
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