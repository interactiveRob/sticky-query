export default (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.stickyQuery = factory(root);
    }
})(
    typeof global !== 'undefined' ? global : this.window || this.global,

    function(root) {
        'use strict';

        let stickyQuery = {}; // Object for public APIs 
        let settings; // Placeholder variables

        /**
         * Destroy the current initialization.
         * @public
         */
        stickyQuery.destroy = function() {
            // If plugin isn't already initialized, stop
            if (!settings) return;

            //select and remove query strings where they have been applied
            let affectedLinks = nodelistToArray(
                document.querySelectorAll('[data-sticky-query="true"]'),
            );

            affectedLinks.forEach(function(link) {
                let href = link.getAttribute('href');
                let fragment = '';

                if (href.indexOf('#') !== -1) {
                    fragment = '#' + href.split('#')[1];
                }

                let originalLink = href.split('?')[0];
                originalLink += fragment.length ? fragment : '';

                link.setAttribute('href', originalLink);
            });

            // Reset variables
            settings = null;
        };

        /**
         * Initialize Plugin
         * @public
         * @param {Object} options User settings
         */
        stickyQuery.init = function(options) {
            /**
             * Default settings
             */
            let defaults = {
                customSelector: null,
                allowedKeys: null,
                excludeAnchors: true,
                excludeJavascript: true,
                excludeHasQuery: true,
                excludeCustom: null,

                callbackBefore: function() {},
                callbackAfter: function() {},
            };

            /**
             * Destroy any existing initializations
             */
            stickyQuery.destroy();

            /**
             * Merge user options with defaults
             */
            settings = extend({}, defaults, options || {});

            new StickyQuery(settings);
        };

        //constructor
        function StickyQuery(settings) {
            this.settings = settings;
            this.url = window.location.href;

            this.allowedKeys = this.getAllowedKeys();
            this.exclusionRules = this.getExclusionRules();
            this.selector = this.buildSelector();

            this.persistedParams = {};
            this.persistedString = null;

            //init and callbacks
            this.settings.callbackBefore(this);
            this.init();
            this.settings.callbackBefore(this);
        }

        StickyQuery.prototype.getAllowedKeys = function() {
            /**
             * If the user has specified certain keys to look for, get those only.
             * Otherwise, get all parameter keys in the url
             */
            return this.settings.allowedKeys
                ? csv_to_array(settings.allowedKeys)
                : getQueryParameterKeys(this.url);
        };

        StickyQuery.prototype.buildPersistedQuery = function() {
            let queryString = Object.keys(this.persistedParams).reduce(
                function(accumulator, key) {
                    if (this.persistedParams[key] === null) {
                        return accumulator;
                    }

                    accumulator.push(key + '=' + this.persistedParams[key]);

                    return accumulator;
                }.bind(this),
                [],
            );

            if(!queryString.length) return;
            return '?' + queryString.join('&');
        };

        StickyQuery.prototype.collectParameterValues = function() {
            this.allowedKeys.forEach(
                function(key) {
                    let param_value = getQueryParameterValue(key, this.url);
                    if (
                        typeof param_value !== 'undefined' &&
                        param_value !== null
                    ) {
                        this.persistedParams[key] = param_value;
                    }
                }.bind(this),
            );
        };

        StickyQuery.prototype.getExclusionRules = function() {
            return {
                customSelector: {
                    status: !!this.settings.customSelector,
                    selector: this.settings.customSelector,
                },
                anchors: {
                    status: this.settings.excludeAnchors,
                    selector: ':not([href^="#"])',
                },
                javascript: {
                    status: this.settings.excludeJavascript,
                    selector: ':not([href*="javascript"])',
                },
                hasQuery: {
                    status: this.settings.excludeHasQuery,
                    selector: ':not([href*="?"])',
                },
                customExclude: {
                    status: !!this.settings.excludeCustom,
                    selector: ':not(' + this.settings.excludeCustom + ')',
                },
                defaultExclude: {
                    status: true,
                    selector: ':not(.sticky-query-ignore)',
                },
            };
        };

        StickyQuery.prototype.buildSelector = function() {
            /**
             * Builds a CSS selector of links that
             * won't be affected by this plugin
             */
            let excludedSelectors = Object.keys(this.exclusionRules).reduce(
                function(accumulator, key) {
                    if (!this.exclusionRules[key].status) {
                        return accumulator;
                    }

                    return accumulator + this.exclusionRules[key].selector;
                }.bind(this),
                new String(),
            );

            let base = this.settings.customSelector ? '' : 'a[href]';

            return base + excludedSelectors;
        };

        StickyQuery.prototype.applyQueryParams = function(links) {
            // links.forEach(function(link) {
            //     let href = link.getAttribute('href');
            //     let queryLink = ;
            // });

            links.forEach(
                function(link) {
                    let plainLink = link.getAttribute('href');
                    let queryLink = plainLink + this.persistedString;

                    /**
                     * Handle anchor-fragment if one exists
                     */
                    if (plainLink.indexOf('#') !== -1) {
                        let urlPieces = plainLink.split('#');
                        let fragment = '#' + urlPieces[1];

                        plainLink = urlPieces[0];

                        queryLink = plainLink + this.persistedString + fragment;
                    }

                    /**
                     * Handle query string if one exists
                     */
                    if (plainLink.indexOf('?') !== -1) {
                        let urlPieces = plainLink.split('?');

                        plainLink = urlPieces[0];

                        queryLink = plainLink + this.persistedString;
                    }


                    link.setAttribute('href', queryLink);
                    link.setAttribute('data-sticky-query', true);
                }.bind(this),
            );

            return links;
        };

        StickyQuery.prototype.debug = function() {
            /**
             * Write to window for debugging
             */
            window.url_params = {};
            window.url_params.persistedParams = this.persistedParams;
            window.url_params.persistedString = this.persistedString;
            window.url_params.selector = this.selector;
        };

        StickyQuery.prototype.init = function() {
            
            //If no query string in present in the current request url, bail.
            if(this.url.indexOf('?')==-1){
                return;
            }

            /**
             * Collect parameters
             */
            this.collectParameterValues();

            /**
             * Build new query string
             */
            this.persistedString = this.buildPersistedQuery();

            /**
             * Uncomment to debug Object
             */
            // this.debug();

            /**
             * Apply new query string; but first:
             * (convert the selected Nodelist into an Array)
             */
            let selectedLinks = nodelistToArray(
                document.querySelectorAll(this.selector),
            );

            this.applyQueryParams(selectedLinks);
        };

        /**
         * Helper functions
         */
        function extend() {
            for (let i = 1; i < arguments.length; i++) {
                for (let key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key)) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
            return arguments[0];
        }

        function csv_to_array(csv) {
            let replaced = csv.replace(/\s+/g, '');

            return replaced.split(',');
        }

        function nodelistToArray(list) {
            return Array.prototype.slice.call(list);
        }

        function getQueryParameterKeys(url) {
            let reg = new RegExp('[?&]([^#&=]*)', 'ig');
            let keys = reg.exec(url);
            let matched_keys = [];

            while (keys != null) {
                matched_keys.push(keys[1]);
                keys = reg.exec(url);
            }

            return matched_keys;
        }

        function getQueryParameterValue(field, url) {
            let href = url;
            let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
            let string = reg.exec(href);

            return string ? string[1] : null;
        }

        /**
         * Public APIs
         */
        return stickyQuery;
    },
);
