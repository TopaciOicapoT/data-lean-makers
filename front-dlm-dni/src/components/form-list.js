import { LitElement, css, html } from 'lit';

export class FormList extends LitElement{
    createRenderRoot() {
        return this;
    }
    static get properties(){
        return{
            listItems: {type:Array},
            renderList:{type: String},
            formDataList:{type: Array}
            
        }
    }
    static styles = css`
        .visible{
            display: none;
        }
    `;
    constructor() {
        super();
        this.listItems = [];
        this.renderList= "";
        this.formDataList=[];
        
    }
    _onChildEvent(event) {
        const data = event.detail.data;
        this.dataFormat(data)        
    }
    
    dataFormat(data){
        this.listItems= []
        this.listItems= data.map(form =>{
             
            return {
            id: form.id,
            formName: form.formname ,
            description: form.description,
            formData: form.formdata,
            show: false
        }
        })
            
        this.requestUpdate();
        
    }
    toggleShowList(form){
        form.show = !form.show
        this.requestUpdate();
    }
    _update(formId, data){
        const updateData = {...data}
        // fetch(`http://localhost:3000/${formId}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //       },
        //       body: JSON.stringify(updateData),
        // })
        //     .then((response) => response.json())
        //     .then((data)=>{
        //         this.listItems = [...data]
        //         this.requestUpdate();
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    }

    _delete(formId){
        const id = formId.id
        fetch(`http://localhost:3000/${formId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(id),
        })
            .then((response) => response.json())
            .then((data)=>{
                this.listItems = this.listItems.filter(client => client.id !== formId);
                this.requestUpdate();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    render(){
        return html`
        <get-data @ApiData="${this._onChildEvent}" url="http://localhost:3000" method="GET" rerender="${this.renderList}"></get-data>

        ${this.listItems.map(form => html`
            
        
        <section class="max-w-4xl mt-20 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 animate-fade-down animate-once animate-ease-linear">
    <h2 @click=${() => this.toggleShowList(form)} class="cursor-pointer text-center text-lg font-semibold text-gray-700 capitalize dark:text-white">${form.formName}</h2>

    <form class=${form.show ? '': 'hidden'}>
        <div>
            <label class="text-gray-700 dark:text-gray-200" >Descripción</label>
            <p class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">${form.description}</p>
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">


        ${
            Object.keys(form.formData).map(index => html`
            
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="${form.formData[index].name}">${form.formData[index].name}</label>
                <input id="${form.formData[index].name}" type="${form.formData[index].type}" autocomplete="new-password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
            </div>
            
            `)
        }


        <div class="flex justify-end mt-6">
            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Enviar</button>
        </div>
    </div>
                    <div @click=${()=> this._delete(form.id)} class="relative inline-block ">
                      <p class=" mt-5 relative z-10 flex items-center p-2 text-sm text-gray-600 cursor-pointer bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none hover:bg-red-900 transition-colors duration-300 transform">
                          <span class="mx-1">Eliminar</span>
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                      </p>
                  </div>
</form>
</section>

`)}
    `;
    }
}

customElements.define('form-list',FormList)
