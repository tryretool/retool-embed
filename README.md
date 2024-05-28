# Retool Embed Client SDK

Easily embed [Retool](https://retool.com) apps into your existing web applications to extend their functionality. 

If your Retool applications don't require authentication, you can generate a [public link](https://docs.retool.com/apps/web/guides/embed-apps) for your source URL. You can also authenticate users into into embedded Retool apps by [integrating Retool with your identity provider](https://docs.retool.com/apps/web/guides/embed-apps#user-authentication-with-an-identity-provider), or [generating](https://docs.retool.com/apps/external/quickstarts/embed#authentication-flow) a secure embed URL through the Retool API. 

## Installation

Install the SDK via npm:

`npm -i --save-dev @tryretool/retool-embed-client`

## Quickstart

### Embedding a Retool app

To embed a Retool app, use the `createRetoolEmbedClient` function.

```JavaScript

createRetoolEmbedClient({
    src: 'https://example.retool.com/embedded/public/5a34f0e4-1e19-45bd-9d0f-9612d42eed17',
});

```

### Configuration options


| Argument    | Type                | Description              |
|-------------|---------------------|--------------------------|
| `src`       | `string` (required) | URL of the Retool app    |
| `style`     | `string` (optional) | A valid style parameter  |
| `data`      | `Object` (optional) | Object to pass from the parent app into Retool. Within your Retool app, use a [Parent Window Query](https://docs.retool.com/apps/web/guides/embed-apps#pass-data-to-an-embedded-app) to reference keys in the `data` object. |
| `onData`    | `function` (optional) | Callback executed with data when the embedded Retool application calls `parent.postMessage(data)` from a JavaScript Query. | 

## Examples

### Public link 

```JavaScript
const container = document.createElement('div')
app.appendChild(container)

const publicAppUrl = 'https://example.retool.com/embedded/public/5a34f0e4-1e19-45bd-9d0f-9612d42eed17'

embeddedRetool = createRetoolEmbedClient({
    src: publicAppUrl,
    style: "border: 1px solid blue; height: 100%; width: 100%;",
    data: {dataValue: false},
    onData: (data) => {
        mockFunction(data)
    }
});
container.appendChild(embeddedRetool)
```

### Authenticated Embed URL 

```JavaScript
const container = document.createElement('div')
app.appendChild(container)

// Client calls your backend, which makes request to Retool for the embed URL.
const getEmbedUrl = async () => {...}

getEmbedUrl().then((retoolEmbedUrl) => {
    embeddedRetool = createRetoolEmbedClient({
        src: retoolEmbedUrl,
        style: "border: 1px solid blue; height: 100%; width: 100%;",
        data: {dataValue: false},
        onData: (data) => {
            mockFunction(data)
        }
    });
    container.appendChild(embeddedRetool)
});
```

#### Generating an embed URL 

Ensure you generate the embed URL on a secure, authenticated backend server. Follow our[documentation](https://docs.retool.com/apps/external/quickstarts/embed#3-create-an-embed-url) for detailed instructions.
