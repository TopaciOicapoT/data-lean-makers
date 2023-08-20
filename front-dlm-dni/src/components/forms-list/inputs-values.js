// Component where the record of inputs created by the parent component is displayed.
import { LitElement, css, html } from 'lit';
export class InputsValues extends LitElement{
    createRenderRoot() {
        return this;
    }   
    static get properties() {
        return {
            show:{type:Boolean},
            values:{type:Object},
            inputsData:{type: Array},
        }
    }
    constructor(){
        super()

            this.values={};
            this.show= false;
            this.inputsData = [];
    }
    render() {
        return html`
        <h1 class="text-lg mt-10 font-semibold text-gray-700  dark:text-white">Registro de inputs:</h1>
        ${this.inputsData.map(item=>html`
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 overflow-hidden">
    <h2 class="text-lg  font-semibold text-gray-700  dark:text-white"><Strong>id:</strong> ${item.id}</h2>      
        ${Object.keys(item.values).map((val) => html`
        <div class=" z-20 break-words place-content-center place-items-center text-center py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 overflow-hidden">       
        <a class=" block break-words px-4 py-3 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300  dark:hover:text-white overflow-hidden">           
            Tipo: ${item.values[val]?.inputType}            
        </a>
        <a class=" block break-words px-4 py-3 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300  dark:hover:text-white overflow-hidden">           
            Valor: ${item.values[val]?.value}
        </a>
    </div>
    `)}    
    </section>
    `)}
    `;
    }

}

customElements.define('inputs-values', InputsValues)