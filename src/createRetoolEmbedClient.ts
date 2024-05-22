import { RetoolEmbedClient } from "./RetoolEmbedClient";

export type RetoolEmbedClientAttributes = {
  src: string;
  style?: string;
  onData?: (data: any) => void;
};
export function createRetoolEmbedClient(
  attributes: RetoolEmbedClientAttributes
) {
  if (!customElements.get("retool-embed-client")) {
    customElements.define("retool-embed-client", RetoolEmbedClient);
  }
  const client = document.createElement(
    "retool-embed-client"
  ) as RetoolEmbedClient;
  client.setAttribute("src", attributes.src);
  client.customStyle = attributes.style;

  client.onData = attributes.onData;
  return client;
}
