import { LitElement } from 'lit';
export class GetData extends LitElement {
    static get properties() {
        return {
            url: { type: String },
            method: { type: String },
            rerender: { type: String },
        }
    }
    constructor() {
        super();
        this.rerender = "";
        this.requestUpdate();
    }
    connectedCallback() {
        super.connectedCallback();
        this.getData()
    }
    async update(changedProperties) {
        if (changedProperties.has("rerender")) {
            const oldValue = changedProperties.get("rerender");
            const newValue = this.rerender;
            this.getData();            
        }
        super.update(changedProperties);
    }
    _sendData(data) {
        this.dispatchEvent(new CustomEvent('ApiData', {
            detail: { data }, bubbles: true, composed: true
        }));
    }
    getData() {
        fetch(this.url, { method: this.method })
            .then((response) => {
                if (response.ok) return response.json()
                return Promise.reject(response)
            })
            .then((data) => {
                this._sendData(data);
            })
            .catch((error) => { console.warn('getData error in GetData.js', error); })
    }
}
customElements.define('get-data', GetData);