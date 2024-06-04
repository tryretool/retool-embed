import { RetoolEmbed } from "./RetoolEmbed";

export type RetoolEmbedAttributes = {
  src: string;
  style?: string;
  onData?: (data: any) => void;
  data?: any;
};
export function createRetoolEmbed(
  attributes: RetoolEmbedAttributes
) {
  if (!customElements.get("retool-embed")) {
    customElements.define("retool-embed", RetoolEmbed);
  }
  const client = document.createElement(
    "retool-embed"
  ) as RetoolEmbed;
  client.setAttribute("src", attributes.src);
  client.customStyle = attributes.style;
  client.data = attributes.data;
  client.onData = attributes.onData;

  return client;
}
