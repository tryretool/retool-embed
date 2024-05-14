import { RetoolEmbedClient } from "RetoolEmbedClient"

export type RetoolEmbedClientAttributes = {
    src: string,
    height?: string,
    width?: string,
    onData?: (data: any) => void
}
export function createRetoolEmbedClient(attributes: RetoolEmbedClientAttributes) {
    customElements.define('retool-embed-client', RetoolEmbedClient)
    const client = document.createElement('retool-embed-client') as RetoolEmbedClient
    client.setAttribute('src', attributes.src)
    client.onData = attributes.onData
}