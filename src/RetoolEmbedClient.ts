export class RetoolEmbedClient extends HTMLElement {
    private iframe: HTMLIFrameElement
    public onData?: (data: any) => void

    constructor() {
        super()
        this.iframe = document.createElement('iframe')
        window.addEventListener('message', this.onMessage)
    }

    private onMessage(event: MessageEvent) {
        if (!this.iframe.contentWindow) return

        if (
            event.origin === new URL(this.iframe.src).origin &&
            event.data?.type !== "PARENT_WINDOW_QUERY" &&
            event.data?.type !== "intercom-snippet__ready"
        ) {
            this.onData?.(event.data)
        }

    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })
        // defaults for the iframe
        this.iframe.sandbox.add('allow-scripts', 'allow-same-origin')
        this.iframe.title = 'Retool Embed'

        // initial attributes
        const src = this.getAttribute('src')
        this.iframe.setAttribute('src', src ?? '')
        const height = this.getAttribute('height')
        const width = this.getAttribute('width')
        this.iframe.setAttribute('height', height ?? '100%')
        this.iframe.setAttribute('width', width ?? '100%')
        shadow.appendChild(this.iframe)
    }


    attributeChangedCallback(name: string, oldValue: string, newValue: string) {

    }
}

