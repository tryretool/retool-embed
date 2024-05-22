"use strict";

import { createRetoolEmbedClient } from "../createRetoolEmbedClient";

describe("createRetoolEmbedClient", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("has the correct src for its iframe", () => {
    const client = createRetoolEmbedClient({
      src: "https://test.onretool.com/embedded/authed/1234",
    });

    expect(client.getAttribute("src")).toBe(
      "https://test.onretool.com/embedded/authed/1234"
    );

    document.body.appendChild(client);
    const clientElement = document.querySelector("retool-embed-client");
    expect(clientElement).not.toBeNull();
    const iframe = clientElement?.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("src")).toBe(
      "https://test.onretool.com/embedded/authed/1234"
    );
  });

  it("has the correct style for its iframe", () => {
    const client = createRetoolEmbedClient({
      src: "https://test.onretool.com/embedded/authed/1234",
      style: "border: 1px solid red",
    });

    document.body.appendChild(client);

    expect(client.customStyle).toBe("border: 1px solid red");
    const iframe = document.querySelector("iframe");

    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute("style")).toBe("border: 1px solid red");

  });
});
