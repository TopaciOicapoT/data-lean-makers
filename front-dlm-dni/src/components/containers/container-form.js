import { LitElement, css, html } from 'lit';
import '../forms-list/form-list';
import { urlBase } from '../../variables/const.urls.js'
export class ContainerForm extends LitElement {
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
        this.urlBase = urlBase;
        this.renderListItems = "";
    }
    // We listen to the `dispatch` event coming from the `form-dni` component.
    firstUpdated() {
        this.addEventListener('setItems', this.setItems)
    }
    // We send the updated data to the `form-list` component to force its rendering with the updated data.
    setItems(e) {
        this.renderListItems = e.detail.items
    }
    render() {
        return html`
    <section class=" place-content-center place-items-center rounded-xl bg-gradient-to-b from-indigo-500 shadow-lg shadow-gray-500 min-h-full p-10 m-20 animate-fade-down animate-once animate-ease-linear">       
        <h1 class="font-serif text-center text-xl truncate p-5 bg-white text-gray-950  shadow-md   shadow-gray-900 rounded-md">
            Generador de formularios Data Lean Maker
        </h1>
        <form-dni urlBase="${this.urlBase}"></form-dni>
        <form-list urlBase="${this.urlBase}" .renderList="${this.renderListItems}"></form-list>
    </section>
    `;
    }
}
window.customElements.define('container-form', ContainerForm);