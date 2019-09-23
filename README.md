# StickyQuery 

A tiny, vanilla JS plugin to help you persist query strings across your website. No dependencies.

**How it works:** StickyQuery works by reading existing parameters in the URL and applying them to links on your page. That way, when the user clicks on a link, the query string will remain as the user navigates from page to page.

## Browser Support
StickyQuery is compatible with all modern browsers, and IE11. <br/>

![Google Chrome Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/chrome/chrome_32x32.png)&nbsp;&nbsp;&nbsp;
![Safari Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/safari/safari_32x32.png)&nbsp;&nbsp;&nbsp;
![Firefox Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/firefox/firefox_32x32.png)&nbsp;&nbsp;&nbsp;
![Internet Explorer Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/58.1.3/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png)&nbsp;&nbsp;&nbsp;
<br/><br/>

## Author Support
If this plugin helps you out, you can buy me a coffee to keep me going! ☕🙂 much appreciated!

[![Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/interactiveRob)
<br/>

Okay, here we go:

# How to use

## Getting Started

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

## 1. Include StickyQuery on your site.

Choose one of the following methods to include the StickyQuery plugin script on your site

**Direct Download**

You can [download the files directly from GitHub](https://github.com/interactiveRob/sticky-query/archive/master.zip).

```html
<script src="path/to/sticky-query.min.js"></script>
```

**CDN coming soon**

```html

```

**NPM coming soon**

You can also use NPM (or your favorite package manager).

```bash
npm install [sticky-query]
```
```javscript
//example ES6-style import 
import 'sticky-query';
```
<br/>

## 2. Initialize StickyQuery.

Just before the closing `</body>` tag (or in your own DOM Content handler function) initialize StickyQuery as follows.

```html
	<script>
		new stickyQuery.init();
	</script>
```

***Note:*** *By default StickyQuery will be applied to all links on your page except:*

* Internal anchor links, for example--

	`<a href="#about-us">About us</a>`

* Javascript dummy links, for example--

	`<a href="javascript:;">Sign up</a>`

* Links that already include a query string, for example--

	`<a href="https://google.com/?utm_content=example">Go to google</a>`

* Links with the class `.sticky-query-ignore`

	`<a class="sticky-query-ignore" href="/about-us">About us</a>`
<br/><br/>

**You can change this behavior and add your own rules** by passing Options to the `init()` method, see below:

<br/>

## 3. Configure Options and Settings

#### allowedKeys 
Limit which parameters will be persisted. 
By default StickyQuery uses all existing url parameters.

- default ` : null;`
- accepts comma separated list of URL parameter keys 
	
	##### example	
	```javascript
		stickyQuery.init({
			allowedKeys: 'utm_campaign, utm_content, utm_medium, utm_source, utm_term',
		});		
	```
<br/>

#### excludeCustom
Stop StickyQuery from affecting certain links of your choosing

- default ` : null`
- accepts CSS selector

	##### examples	
	```javascript
		stickyQuery.init({
			excludeCustom: '.download-link',
		});		
	```

	```javascript
		//use an attribute selector to exclude links that contain a certain URL
		stickyQuery.init({
			excludeCustom: '[href*="microsoft.com"]',
		});		
	```

<br/>

#### excludeAnchors
Stop StickyQuery from affecting internal anchor links that point to the current page

- default ` : true`
- accepts Boolean

<br/>

#### excludeJavascript
Stop StickyQuery from affecting javascript dummy links

- default ` : true`
- accepts Boolean

<br/>

#### excludeHasQuery
Stop StickyQuery from affecting links that already have a URL query string

- default ` : true`
- accepts Boolean

### Example with all possible settings

```javascript 
	new stickyQuery.init({
		allowedKeys: 'utm_content, utm_campaign',
		excludeCustom: '.my-ignore',	
		excludeAnchors: true,
		excludeJavascript: true,
		excludeHasQuery: true,
		excludeCustom: null,
	});		
```
<br/>

### Callbacks

StickyQuery comes with two standard callbacks for your convenience
#### callbackBefore: `function(){}`,
#### callbackAfter: `function(){}`,

##### example with callbacks

```javascript
	var callbackFunction = function(){ console.log('callback happened'); }

	new stickyQuery.init({
		allowedKeys: 'utm_content, utm_campaign',
		excludeCustom: '.my-ignore',
		callbackBefore: callbackFunction,
		callbackAfter: callbackFunction,
	});		
```

<br/>

### Methods

#### init(options)
init the plugin and pass in options

#### destroy()
remove persisted query strings where they have been applied

## License

The code is available under the [MPL 2.0 License](LICENSE.md).