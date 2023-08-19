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

            console.log(this.inputsData);
        return html`
        ${this.inputsData.map(item=>html`
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-lg  font-semibold text-gray-700 capitalize dark:text-white"><Strong>id:</strong> ${item.id}</h2>
      
        
        ${Object.keys(item.values).map((val) => html`
        <div class=" z-20 min-w-fit text-center py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
        
        <a class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            
            Tipo: ${item.values[val]?.inputType}
            
        </a>
        <a class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            
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