# StickyQuery

A tiny, vanilla JS plugin to help you persist query strings across your website. No dependencies.

## How It Works

StickyQuery works by reading existing parameters in the URL and applying them to links on your page.

That way, when the user clicks on a link, the query string will remain as the user navigates from page to page.

## Author Support

If this plugin helps you out, you can buy me a coffee to keep me going! ☕🙂 much appreciated!

[![Coffee][buy-me-a-coffee-logo]](https://buymeacoff.ee/interactiveRob)

## Requirements

### Browser Support

StickyQuery is compatible with all modern browsers, and IE11. <br/>

![Google Chrome Logo][google-chrome-logo]&nbsp;&nbsp;&nbsp;
![Safari Logo][safari-logo]&nbsp;&nbsp;&nbsp;
![Firefox Logo][firefox-logo]&nbsp;&nbsp;&nbsp;
![Internet Explorer Logo][internet-explorer-logo]&nbsp;&nbsp;&nbsp;

## Installation

### Direct Download

Compiled and production-ready code can be found in the `dist` directory.

You can [download the files directly from GitHub (zip)][repo-master-zip].

```html
<script src="path/to/sticky-query.min.js"></script>
```

### NPM

```bash
# npm
npm install sticky-query

# yarn
yarn add sticky-query
```

```javscript
# ES6
import stickyQuery from 'sticky-query';

# ES5
var stickyQuery = require('sticky-query');
```

### CDN

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sticky-query@1/dist/sticky-query.min.js"></script> 
```

## Usage
Just before the closing `</body>` tag (or in your own DOM Content handler function) initialize StickyQuery as follows:

```html
<script>
  stickyQuery.init({
    // options
  });
</script>
```

**_Note:_** _By default StickyQuery will be applied to all links on your page except:_

```html
<!-- Internal anchor links -->
<a href="#about-us">About us</a>

<!-- JavaScript dummy links -->
<a href="javascript:;">Sign up</a>

<!-- Links that already include a query string -->
<a href="https://google.com/?utm_content=example">Go to google</a>

<!-- Links with the class "sticky-query-ignore" -->
<a class="sticky-query-ignore" href="/about-us">About us</a>
```

**You can change this behavior and add your own rules** by passing Options to the `init()` method.

## Options

```html
<script>
  stickyQuery.init({
    allowedKeys: 'utm_content, utm_campaign',
    excludeCustom: '.my-ignore',
    excludeAnchors: true,
    excludeJavascript: true,
    excludeHasQuery: true,
  });
</script>
```

| Option              | Type      | Default | Description                                                                    |
| ------------------- | --------- | ------- | -------------------------------------------------------------------------      |
| `allowedKeys`       | `String`  | `null`  | Limit which parameters will be persisted (separate multiple keys with commas). |
| `excludeCustom`     | `String`  | `null`  | Stop from affecting certain links of your choosing (accepts a CSS selector).   |
| `excludeAnchors`    | `Boolean` | `true`  | Stop from affecting internal anchor links that point to the current page.      |
| `excludeJavascript` | `Boolean` | `true`  | Stop from affecting javascript dummy links.                                    |
| `excludeHasQuery`   | `Boolean` | `true`  | Stop from affecting links that already have a URL query string.                |

## Callbacks

```javascript
stickyQuery.init({
  callbackBefore: function() {
    //
  },
  callbackAfter: function() {
    //
  },
});
```

| Callback         | Params | Description            |
| ---------------- | ------ | ---------------------- |
| `callbackBefore` | `none` | Before initialization. |
| `callbackAfter`  | `none` | After initialization.  |

## Methods

| Method    | Arguments         | Description              |
| --------- | ----------------- | ------------------------ |
| `init`    | `options: object` | Initializes StickyQuery. |
| `destroy` | `none`            | Destroys StickyQuery.    |

## Implementation tricks and examples

#### Exclude links that contain a certain URL

```html
<script>
  stickyQuery.init({
    excludeCustom: '[href*=google.com]',
  });
</script>
```

#### Only apply StickyQuery to links that have a specific selector

```html
<script>
  stickyQuery.init({
    excludeCustom: ':not(.sticky-query-apply)',
  });
</script>
```

## License

The code is available under the [MPL 2.0 License](LICENSE.md).

[google-chrome-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/chrome/chrome_32x32.png
[safari-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/safari/safari_32x32.png
[firefox-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/firefox/firefox_32x32.png
[internet-explorer-logo]: https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png
[buy-me-a-coffee-logo]: https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
[repo-master-zip]: https://github.com/interactiveRob/sticky-query/archive/master.zip
