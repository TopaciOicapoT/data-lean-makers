import { LitElement, css, html } from 'lit';
import './form-list';

export class ContainerMedium extends LitElement {
    createRenderRoot() {
        return this;
    }
    static get properties() {
        return {
            renderListItems: { type: String },


        }
    }
    constructor() {
        super()
        this.renderListItems = "";
    }

    firstUpdated() {
        this.addEventListener('setItems', this.setItems)
    }

    setItems(e) {

        this.renderListItems = e.detail.items
    }

    render() {
        return html`
    <section class="grid place-content-center place-items-center rounded-xl bg-gradient-to-b from-indigo-500 shadow-lg shadow-gray-500 min-h-full p-10 m-5 animate-fade-down animate-once animate-ease-linear">
        
        <h1 class="font-serif text-center text-xl truncate bg-gray-50 shadow-lg p-5 shadow-gray-900 rounded-md">
            Formulario Data Lean Maker
        </h1>

        <form-dni></form-dni>
        <div>
            <h2 class="mt-20 font-serif text-center text-xl bg-gray-50 shadow-lg p-5 shadow-gray-900 rounded-md ">Lista de formularios</h2>
        </div>
        <form-list renderList="${this.renderListItems}"></form-list>
    </section>
    `;
    }


}

window.customElements.define('container-medium', ContainerMedium);