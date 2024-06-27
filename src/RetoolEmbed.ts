type WatcherValue = {
  iframe?: HTMLIFrameElement;
  selector: string;
  pageName: string;
  queryId: string;
};
export class RetoolEmbed extends HTMLElement {
  private iframe: HTMLIFrameElement;
  private elementWatchers: Record<string, WatcherValue> = {};
  public onData?: (data: any) => void;
  public customStyle?: string;
  private _data: any;

  constructor() {
    super();
    this.iframe = document.createElement("iframe");
    this.onMessage = this.onMessage.bind(this);
    this.onData = this.onData?.bind(this);
  }

  get data() {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
    this.onDataHandler();
  }

  onMessage(event: MessageEvent) {
    if (!this.iframe?.contentWindow) return;

    if (
      (event.origin === new URL(this.iframe.src).origin ||
        event.origin == "null") &&
      event.data?.type !== "PARENT_WINDOW_QUERY" &&
      event.data?.type !== "intercom-snippet__ready"
    ) {
      this.onData?.(event.data);
    }

    if (event.data.type === "PARENT_WINDOW_QUERY") {
      this.createOrReplaceWatcher(
        event.data.selector,
        event.data.pageName,
        event.data.id
      );
      this.postMessageForSelector("PARENT_WINDOW_RESULT", event.data);
    }
  }

  private onDataHandler() {
    for (const key in this.elementWatchers) {
      const watcher = this.elementWatchers[key];
      watcher.iframe?.contentWindow?.postMessage(
        {
          type: "PARENT_WINDOW_RESULT",
          result: this.data[watcher.selector],
          id: watcher.queryId,
          pageName: watcher.pageName,
        },
        "*"
      );
    }
  }

  private createOrReplaceWatcher = (
    selector: string,
    pageName: string,
    queryId: string
  ) => {
    const watcherId = pageName + "-" + queryId;
    const updatedState = this.elementWatchers;

    updatedState[watcherId] = {
      iframe: this.iframe,
      selector: selector,
      pageName: pageName,
      queryId: queryId,
    };

    this.elementWatchers = updatedState;
    this.onDataHandler();
  };

  private postMessageForSelector = (messageType: string, eventData: any) => {
    const maybeData = this.data ? this.data[eventData.selector] : null;

    if (maybeData !== null && maybeData !== undefined) {
      this.iframe?.contentWindow?.postMessage(
        {
          type: messageType,
          result: maybeData,
          id: eventData.id,
          pageName: eventData.pageName,
        },
        "*"
      );
    } else {
      console.log(
        `Not sending data back to Retool, nothing found for selector: ${eventData.selector}`
      );
    }
  };

  connectedCallback() {
    // defaults for the iframe
    this.iframe.sandbox.add("allow-scripts", "allow-same-origin");
    this.iframe.title = "Retool Embed";

    // initial attributes
    const src = this.getAttribute("src");
    this.iframe.setAttribute("src", src ?? "");

    if (this.customStyle) {
      this.iframe.setAttribute("style", this.customStyle);
    }

    this.appendChild(this.iframe);
    window.addEventListener("message", this.onMessage);
  }

  disconnectedCallback() {
    window.removeEventListener("message", this.onMessage);
  }
}
