# Retool Embed Client (JavaScript SDK)

This package is intended to help developers embed [Retool]() apps in their existing web applications. These apps may either be [Embed](https://docs.retool.com/apps/external/quickstarts/embed) apps, or [Public](https://docs.retool.com/apps/web/guides/embed-apps) apps. 

## Installation

`npm -i --save-dev @tryretool/retool-embed-client`


## Supported arguments

| Argument    | Expected input |
|-------------|----------------|
| `src`       | **Required** `string` URL of the Retool app |
| `style`     | **Optional** `string` A valid style parameter for the iframe | 
| `data`      | **Optional** `Object` Made available in the Retool application. When an embedded Retool application runs a Parent Window Query, `RetoolEmbedClient` will check if `data` contains a key matching the Parent Window Query's selector, and if so, return that value to the query. See [Embed]() docs for an example. |
| `onData`    | **Optional** `function` Callback executed with data when the embedded Retool application calls `parent.postMessage(data)` from a JavaScript Query. | 

## Embed example

```JavaScript
const container = document.createElement('div')
app.appendChild(container)

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

### A note on getting an embed URL 

This implementation assumes you have developed a way of providing your application with an [Embed](https://docs.retool.com/apps/external/quickstarts/embed) URL. This implementation should follow our [docs](https://docs.retool.com/apps/external/quickstarts/embed#3-create-an-embed-url) and be run on a secure, authenticated backend server, before it's provided to your hosting frontend application. 

## Public apps example

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

