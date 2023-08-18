import { LitElement, css, html } from 'lit';
export class FormList extends LitElement {
    createRenderRoot() {
        return this;
    }
    static get properties() {
        return {
            idForm: { type: String },
            listItems: { type: Array },
            singleForm: { type: Array },
            renderList: { type: String },
            formDataList: { type: Array },
        }
    }
    static styles = css`
        .visible{
            display: none;
        }
    `;
    constructor() {
        super();
        this.idForm = "";
        this.listItems = [];
        this.singleForm = [];
        this.renderList = "";
        this.formDataList = [];
    }
    _onChildEvent(event) {
        const data = event.detail.data;
        this.dataFormat(data)
    }
    dataFormat(data) {
        this.listItems = []
        this.listItems = data.map(form => {
            return {
                id: form.id,
                formName: form.formname,
                description: form.description,
                formData: form.formdata,
                show: false
            }
        })
        this.requestUpdate();
    }
    toggleShowList(form) {
        form.show = !form.show
        this.idForm = form.id
        this.singleForm = this.listItems.filter(form => form.id === this.idForm)
        console.log("single",this.singleForm);
        this.listItems.map(form => {
            if (form.show === true && form.id !== this.idForm) {
                form.show = !form.show
            }
        })
        this.requestUpdate();
    }
    _update(formId, dataForm) {
        console.log(dataForm);
        const updateData = {
            description: dataForm.description,
        }
        console.log(formId);
        console.log(updateData);
        fetch(`http://localhost:5000/${formId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((data) => {

                dataForm.description = data.description
                this.requestUpdate();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    _delete(formId) {
        const id = formId.id
        fetch(`http://localhost:5000/${formId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        })
            .then((response) => response.json())
            .then((data) => {
                this.listItems = this.listItems.filter(client => client.id !== formId);
                this.requestUpdate();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    render() {
        return html`
            <get-data @ApiData="${this._onChildEvent}" url="http://localhost:5000" method="GET" rerender="${this.renderList}"></get-data>
            <section class="w-full block mt-16 p-6 mx-auto bg-gray-800  rounded-md shadow-md dark:bg-white">
                <div>
                    <h2 class="mt-5 text-gray-200  dark:text-gray-700 font-serif text-center text-xl  p-5">Lista de formularios</h2>
                </div>
                    ${this.listItems.map(form => html`
                        <section  class="max-w-4xl mt-20 p-6 mx-auto  bg-white rounded-md shadow-md dark:bg-gray-800 animate-fade-down animate-once animate-ease-linear">
                            <div @click=${() => this.toggleShowList(form)} class="cursor-pointer text-center dark:text-gray-200">     
                                <h2  class="flex text-center justify-center text-lg font-semibold text-gray-700 capitalize dark:text-white">          
                                    <svg class="w-5 h-5 mx-1 "  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                                    </svg>
                                        ${form.formName}
                                    <svg class="w-5 h-5 mx-1 "  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path class d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                                    </svg></h2>    
                            </div>
                    <form class=${form.show ? '' : 'hidden'}>  
                        ${this.singleForm.map(form => html`
                        <div class="mt-5 animate-fade-down animate-once animate-ease-linear">
                            <label class="text-gray-700 dark:text-gray-200 font-bold" >Nombre:</label>
                            <textarea .value="${form.formName}" @input="${e => (form.formName = e.target.value)}" class="block w-full h-10mt-5  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
                        </div>
                        <div class="mt-5 animate-fade-down animate-once animate-ease-linear">
                            <label class="text-gray-700 dark:text-gray-200 font-bold" >Descripción:</label>
                            <textarea .value="${form.description}" @input="${e => (form.description = e.target.value)}" class="block w-full h-80 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></textarea>
                        </div>
                        <div @click=${() => this._update(form.id, form)} class="relative inline-block animate-fade-down animate-once animate-ease-linear">
                            <p class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-gray-700 border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-amber-600 transition-colors duration-300 transform">
                                <span class="mx-1 text-gray-200 hover:text-gray-200">Actualizar</span>
                                    <svg class="w-5 h-5 mx-1 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                                    </svg>
                            </p>
                        </div>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            ${Object.keys(form.formData).map(index => html`
                                <div class="animate-fade-down animate-once animate-ease-linear">
                                    <label class="text-gray-700 dark:text-gray-200 font-bold" for="${form.formData[index].name}">${form.formData[index].name}:</label>
                                    <input id="${form.formData[index].name}${form.formData[index].type}" type="${form.formData[index].type}" placeholder="Introduzca ${form.formData[index].name}"  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                                </div>         
                            `)}            
                            <div class="flex justify-end mt-6 animate-fade-down animate-once animate-ease-linear">
                            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Enviar</button>
                            </div>
                        </div>
                        `)
            } 
                        <div @click=${() => this._delete(form.id)} class="relative inline-block ">
                            <p class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer border border-transparent rounded-md bg-gray-700 focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-red-900 transition-colors duration-300 transform">
                                <span class="mx-1 text-gray-200 hover:text-gray-200 ">Eliminar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-200">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </p>
                        </div>
                    </form>
                </section>
                `)}
            </section>
        `;
    }
}
customElements.define('form-list', FormList)