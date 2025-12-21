import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, setCookie, getHeader, getResponseStatusText } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/@vue/shared/dist/shared.cjs.js';
import { v4 } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/uuid/dist-node/index.js';
import fs, { promises } from 'node:fs';
import { createServerClient, parseCookieHeader } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/@supabase/ssr/dist/main/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/destr/dist/index.mjs';
import process$1 from 'node:process';
import { renderToString } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/devalue/index.js';
import { isVNode, toValue, isRef } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/errx/dist/index.js';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/swegr/Documents/GitHub/money_printer/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/swegr/Documents/GitHub/money_printer/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/swegr/Documents/GitHub/money_printer","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/swegr/Documents/GitHub/money_printer/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/swegr/Documents/GitHub/money_printer/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/swegr/Documents/GitHub/money_printer/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/swegr/Documents/GitHub/money_printer/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/confirm": {
        "ssr": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "supabase": {
      "url": "https://bwlalrkoqmcnrbawvtuk.supabase.co",
      "key": "sb_publishable_XNDTqmWEtacRNaXVmKgv2A_g7UBp-ah",
      "redirect": true,
      "redirectOptions": {
        "login": "/login",
        "callback": "/confirm",
        "exclude": [
          "/register",
          "/login"
        ],
        "cookieRedirect": false,
        "saveRedirectToCookie": false
      },
      "cookieName": "sb",
      "cookiePrefix": "sb-bwlalrkoqmcnrbawvtuk-auth-token",
      "useSsrCookies": true,
      "cookieOptions": {
        "maxAge": 28800,
        "sameSite": "lax",
        "secure": false,
        "path": "/"
      },
      "clientOptions": {
        "auth": {
          "flowType": "pkce",
          "detectSessionInUrl": true,
          "persistSession": true,
          "autoRefreshToken": true
        }
      }
    }
  },
  "supabase": {
    "serviceKey": "",
    "secretKey": "sb_secret_19G0LELl6EFraPyTjhjq9A_FGH12h0g"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const memoryStore = {};

  const NONCE = ${JSON.stringify(nonce)}
  
  const mockStorage = {
    getItem: function(key) {
      return memoryStore[key] !== undefined ? memoryStore[key] : null;
    },
    setItem: function(key, value) {
      memoryStore[key] = String(value);
      window.parent.postMessage({
        type: 'storage-set',
        key: key,
        value: String(value),
        nonce: NONCE
      }, '*');
    },
    removeItem: function(key) {
      delete memoryStore[key];
      window.parent.postMessage({
        type: 'storage-remove',
        key: key,
        nonce: NONCE
      }, '*');
    },
    clear: function() {
      for (const key in memoryStore) {
        delete memoryStore[key];
      }
      window.parent.postMessage({
        type: 'storage-clear',
        nonce: NONCE
      }, '*');
    },
    key: function(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] !== undefined ? keys[index] : null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };
  
  try {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: false,
      configurable: true
    });
  } catch (e) {
    window.localStorage = mockStorage;
  }
  
  window.addEventListener('message', function(event) {
    if (event.data.type === 'storage-sync-data' && event.data.nonce === NONCE) {
      const data = event.data.data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          memoryStore[key] = data[key];
        }
      }
      if (typeof window.initTheme === 'function') {
        window.initTheme();
      }
      window.dispatchEvent(new Event('storage-ready'));
    }
  });
  
  window.parent.postMessage({ 
    type: 'storage-sync-request',
    nonce: NONCE
  }, '*');
})();
`
);
const parentStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;
  
  // Wait for shadow root to be attached
  const checkShadow = setInterval(function() {
    if (host.shadowRoot) {
      clearInterval(checkShadow);
      const iframe = host.shadowRoot.getElementById('frame');
      if (!iframe) return;

      const NONCE = ${JSON.stringify(nonce)}
      
      window.addEventListener('message', function(event) {
        if (!event.data || event.data.nonce !== NONCE) return;
        
        const data = event.data;
        
        if (data.type === 'storage-set') {
          localStorage.setItem(data.key, data.value);
        } else if (data.type === 'storage-remove') {
          localStorage.removeItem(data.key);
        } else if (data.type === 'storage-clear') {
          localStorage.clear();
        } else if (data.type === 'storage-sync-request') {
          const allData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
          }
          iframe.contentWindow.postMessage({
            type: 'storage-sync-data',
            data: allData,
            nonce: NONCE
          }, '*');
        }
      });
    }
  }, 10);
})();
`
);
const errorCSS = (
  /* css */
  `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  right: 5px;
  bottom: 5px;
  left: auto;
  top: auto;
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: bottom right;
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 8px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 3px;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`
);
function webComponentScript(base64HTML, startMinimized) {
  return (
    /* js */
    `
  (function() {
    try {
      const host = document.querySelector('nuxt-error-overlay');
      if (!host) return;
      
      const shadow = host.attachShadow({ mode: 'open' });
      
      // Create elements
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(errorCSS)};
      
      const iframe = document.createElement('iframe');
      iframe.id = 'frame';
      iframe.src = 'data:text/html;base64,${base64HTML}';
      iframe.title = 'Detailed error stack trace';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      
      const preview = document.createElement('div');
      preview.id = 'preview';
      
      const button = document.createElement('button');
      button.id = 'toggle';
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';
      
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      
      // Update preview snapshot
      function updatePreview() {
        try {
          let previewIframe = preview.querySelector('iframe');
          if (!previewIframe) {
            previewIframe = document.createElement('iframe');
            previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
            previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            preview.appendChild(previewIframe);
          }
          
          const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
          const cleanedHTML = document.documentElement.outerHTML
            .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
            .replace(/<script[^>]*>.*?<\\/script>/gs, '');
          
          const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(doctype + cleanedHTML);
          iframeDoc.close();
        } catch (error) {
          console.error('Failed to update preview:', error);
        }
      }
      
      function toggleView() {
        const isMinimized = iframe.hasAttribute('inert');
        
        if (isMinimized) {
          updatePreview();
          iframe.removeAttribute('inert');
          button.setAttribute('aria-expanded', 'true');
          liveRegion.textContent = 'Showing detailed error view';
          setTimeout(function() {
            try { iframe.contentWindow.focus(); } catch {}
          }, 100);
        } else {
          iframe.setAttribute('inert', '');
          button.setAttribute('aria-expanded', 'false');
          liveRegion.textContent = 'Showing error page';
          button.focus();
        }
      }
      
      button.onclick = toggleView;
      
      document.addEventListener('keydown', function(e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !iframe.hasAttribute('inert')) {
          toggleView();
        }
      });
      
      // Append to shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(liveRegion);
      shadow.appendChild(iframe);
      shadow.appendChild(preview);
      shadow.appendChild(button);
      
      if (${startMinimized}) {
        iframe.setAttribute('inert', '');
        button.setAttribute('aria-expanded', 'false');
      }
      
      // Initialize preview
      setTimeout(updatePreview, 100);
      
    } catch (error) {
      console.error('Failed to initialize Nuxt error overlay:', error);
    }
  })();
  `
  );
}
function generateErrorOverlayHTML(html, options) {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
  const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
  return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return error500; });
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  if (!globalThis._importMeta_.test && typeof html === "string") {
    const prettyResponse = await defaultHandler(error, event, { json: false });
    return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= statusCode && statusCode < 500 })}</body>`));
  }
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _aK_AJpzt01fv31UnwmfhWoSYISYfZCA_qRNo8LnOCQA = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/swegr/Documents/GitHub/money_printer";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _pc0ddydk2FNoDHd6KT5dLjjgRPKdHT_Slno_AZSifo = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _aK_AJpzt01fv31UnwmfhWoSYISYfZCA_qRNo8LnOCQA,
_pc0ddydk2FNoDHd6KT5dLjjgRPKdHT_Slno_AZSifo
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1edae-+umeaibk5olR10wem8oGVs9OjoQ\"",
    "mtime": "2025-12-21T12:22:53.527Z",
    "size": 126382,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"74192-ctpzR4kflGnyU37Dq+rCx7lBl1M\"",
    "mtime": "2025-12-21T12:22:53.527Z",
    "size": 475538,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _J6F6dX = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://C:/Users/swegr/Documents/GitHub/money_printer/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://C:/Users/swegr/Documents/GitHub/money_printer/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const precomputed = void 0 ;
  const renderer = createRenderer(createSSRApp, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: renderToString$1,
    buildAssetsURL
  });
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process$1.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const precomputed = void 0 ;
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const renderer = createRenderer(() => () => {
  }, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: () => spaTemplate,
    buildAssetsURL
  });
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_xkTFsZ = () => Promise.resolve().then(function () { return perform_post$1; });
const _lazy_cK1Ztf = () => Promise.resolve().then(function () { return buy_post$1; });
const _lazy_lGTpzR = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_QFIxob = () => Promise.resolve().then(function () { return sell_post$1; });
const _lazy_sSbcdP = () => Promise.resolve().then(function () { return marketUpdate_post$1; });
const _lazy_YaDV2O = () => Promise.resolve().then(function () { return init_post$1; });
const _lazy_RQU5wv = () => Promise.resolve().then(function () { return step_post$1; });
const _lazy_JmMWM5 = () => Promise.resolve().then(function () { return summary_get$1; });
const _lazy_ovcAol = () => Promise.resolve().then(function () { return pending_get$1; });
const _lazy_x11Q7a = () => Promise.resolve().then(function () { return resolve_post$1; });
const _lazy_sAkf8D = () => Promise.resolve().then(function () { return tick_post$1; });
const _lazy_eoyGGP = () => Promise.resolve().then(function () { return active_get$1; });
const _lazy_WyREVF = () => Promise.resolve().then(function () { return offers_get$1; });
const _lazy_5V25HQ = () => Promise.resolve().then(function () { return pay_post$1; });
const _lazy_K0uDdx = () => Promise.resolve().then(function () { return take_post$1; });
const _lazy_quZYuk = () => Promise.resolve().then(function () { return companies_get$1; });
const _lazy_16rMgu = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_iI7KoR = () => Promise.resolve().then(function () { return profile_get$1; });
const _lazy_0ySXGh = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _J6F6dX, lazy: false, middleware: true, method: undefined },
  { route: '/api/actions/perform', handler: _lazy_xkTFsZ, lazy: true, middleware: false, method: "post" },
  { route: '/api/assets/buy', handler: _lazy_cK1Ztf, lazy: true, middleware: false, method: "post" },
  { route: '/api/assets', handler: _lazy_lGTpzR, lazy: true, middleware: false, method: "get" },
  { route: '/api/assets/sell', handler: _lazy_QFIxob, lazy: true, middleware: false, method: "post" },
  { route: '/api/cron/market-update', handler: _lazy_sSbcdP, lazy: true, middleware: false, method: "post" },
  { route: '/api/debug/market/init', handler: _lazy_YaDV2O, lazy: true, middleware: false, method: "post" },
  { route: '/api/debug/market/step', handler: _lazy_RQU5wv, lazy: true, middleware: false, method: "post" },
  { route: '/api/economy/summary', handler: _lazy_JmMWM5, lazy: true, middleware: false, method: "get" },
  { route: '/api/events/pending', handler: _lazy_ovcAol, lazy: true, middleware: false, method: "get" },
  { route: '/api/events/resolve', handler: _lazy_x11Q7a, lazy: true, middleware: false, method: "post" },
  { route: '/api/game/tick', handler: _lazy_sAkf8D, lazy: true, middleware: false, method: "post" },
  { route: '/api/loans/active', handler: _lazy_eoyGGP, lazy: true, middleware: false, method: "get" },
  { route: '/api/loans/offers', handler: _lazy_WyREVF, lazy: true, middleware: false, method: "get" },
  { route: '/api/loans/pay', handler: _lazy_5V25HQ, lazy: true, middleware: false, method: "post" },
  { route: '/api/loans/take', handler: _lazy_K0uDdx, lazy: true, middleware: false, method: "post" },
  { route: '/api/market/companies', handler: _lazy_quZYuk, lazy: true, middleware: false, method: "get" },
  { route: '/api/market/create', handler: _lazy_16rMgu, lazy: true, middleware: false, method: "post" },
  { route: '/api/player/profile', handler: _lazy_iI7KoR, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_0ySXGh, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_0ySXGh, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Internal server error", "description": "This page is temporarily unavailable.", "refresh": "Refresh this page" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage) + " | " + escapeHtml(messages.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(messages.statusCode) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(messages.statusMessage) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

async function fetchWithRetry(req, init) {
  const retries = 3;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(req, init);
    } catch (error) {
      if (init?.signal?.aborted) {
        throw error;
      }
      if (attempt === retries) {
        console.error(`Error fetching request ${req}`, error, init);
        throw error;
      }
      console.warn(`Retrying fetch attempt ${attempt + 1} for request: ${req}`);
      await new Promise((resolve) => setTimeout(resolve, 100 * attempt));
    }
  }
  throw new Error("Unreachable code");
}

function setCookies(event, cookies) {
  const response = event.node.res;
  const headersWritable = () => !response.headersSent && !response.writableEnded;
  if (!headersWritable()) {
    return;
  }
  for (const { name, value, options } of cookies) {
    if (!headersWritable()) {
      break;
    }
    setCookie(event, name, value, options);
  }
}

var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["Opportunity"] = "opportunity";
  EventType2["Crisis"] = "crisis";
  EventType2["Audit"] = "audit";
  EventType2["MarketShift"] = "market_shift";
  EventType2["Flavor"] = "flavor";
  return EventType2;
})(EventType || {});

const calculateSlippage = (sharesToSell, company) => {
  const percentage = sharesToSell / company.totalShares;
  const threshold = 0.01;
  if (percentage <= threshold) {
    return company.sharePrice;
  }
  const excessPercentage = percentage - threshold;
  const slippageFactor = excessPercentage * 0.5;
  const discount = Math.min(slippageFactor, 0.5);
  return company.sharePrice * (1 - discount);
};

const STATE_FILE = path.resolve(process.cwd(), "server/data/market_state.json");
class StockEngine {
  static loadState() {
    try {
      if (fs.existsSync(STATE_FILE)) {
        const data = fs.readFileSync(STATE_FILE, "utf-8");
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to load market state", e);
    }
    return { lastTick: (/* @__PURE__ */ new Date()).toISOString(), quarter: 0, activeInfluences: [] };
  }
  static saveState(state) {
    try {
      const dir = path.dirname(STATE_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
    } catch (e) {
      console.error("Failed to save market state", e);
    }
  }
  // Generates a random price movement based on volatility and influences
  static calculateNewPrice(currentPrice, volatility, influences, company) {
    const baseDrift = 5e-3;
    const randomShock = (Math.random() - 0.5) * 2 * volatility;
    let influenceFactor = 1;
    for (const inf of influences) {
      if (StockEngine.isApplicable(inf, company)) {
        influenceFactor += inf.strength - 1;
      }
    }
    const percentChange = baseDrift + randomShock + (influenceFactor - 1);
    let newPrice = currentPrice * (1 + percentChange);
    if (newPrice < 0.01) newPrice = 0.01;
    return Number(newPrice.toFixed(2));
  }
  static isApplicable(inf, company) {
    if (inf.type === "global_mod") return true;
    if (inf.type === "sector_mod" && inf.target === company.sector) return true;
    if (inf.type === "company_mod" && inf.target === company.ticker) return true;
    return false;
  }
  static async stepMarket(client) {
    const state = StockEngine.loadState();
    const { data: companies, error } = await client.from("companies").select("*");
    if (error || !companies) throw new Error("Failed to fetch companies");
    state.activeInfluences.forEach((inf) => inf.duration--);
    state.activeInfluences = state.activeInfluences.filter((inf) => inf.duration > 0);
    StockEngine.spawnRandomInfluences(state);
    const updates = [];
    for (const c of companies) {
      const companyStruct = {
        id: c.id,
        name: c.name,
        ticker: c.ticker,
        sector: c.sector,
        description: c.description,
        sharePrice: Number(c.share_price),
        prevSharePrice: Number(c.prev_share_price || c.share_price),
        totalShares: c.total_shares,
        volatility: Number(c.volatility),
        dividendYield: Number(c.dividend_yield),
        priceHistory: []
      };
      const newPrice = StockEngine.calculateNewPrice(companyStruct.sharePrice, companyStruct.volatility, state.activeInfluences, companyStruct);
      updates.push({
        id: c.id,
        share_price: newPrice,
        prev_share_price: companyStruct.sharePrice
      });
    }
    if (updates.length > 0) {
      const { error: updateError } = await client.from("companies").upsert(updates);
      if (updateError) throw updateError;
    }
    state.lastTick = (/* @__PURE__ */ new Date()).toISOString();
    state.quarter++;
    StockEngine.saveState(state);
    return {
      quarter: state.quarter,
      updatedCount: updates.length,
      activeInfluences: state.activeInfluences,
      companies: updates
      // Return the updated states (id, price, prevPrice)
    };
  }
  static spawnRandomInfluences(state) {
    if (Math.random() < 0.15) {
      const sectors = StockEngine.getInitialSectors();
      const sector = sectors[Math.floor(Math.random() * sectors.length)];
      const isBoom = Math.random() > 0.5;
      const inf = {
        id: v4(),
        name: `${sector} ${isBoom ? "Boom" : "Slump"}`,
        description: `The ${sector} sector is experiencing a ${isBoom ? "surge" : "downturn"}.`,
        type: "sector_mod",
        target: sector,
        duration: 4 + Math.floor(Math.random() * 4),
        // 4-8 quarters
        strength: isBoom ? 1.05 : 0.95
        // +5% or -5% per tick force
      };
      state.activeInfluences.push(inf);
    }
  }
  // Helper to generate a new company
  static generateCompany(name, ticker, sector) {
    const startPrice = 10 + Math.random() * 190;
    return {
      id: v4(),
      name,
      ticker,
      sector,
      description: `A generic ${sector} company.`,
      sharePrice: Number(startPrice.toFixed(2)),
      prevSharePrice: Number(startPrice.toFixed(2)),
      totalShares: 1e6 + Math.floor(Math.random() * 9e6),
      volatility: 0.05 + Math.random() * 0.15,
      // 5% to 20% volatility
      dividendYield: Math.random() > 0.3 ? Math.random() * 0.05 : 0,
      // 70% chance of dividend
      priceHistory: [Number(startPrice.toFixed(2))]
    };
  }
  static getInitialSectors() {
    return ["Technology", "Healthcare", "Finance", "Energy", "Consumer"];
  }
}

const serverSupabaseClient = async (event) => {
  if (!event.context._supabaseClient) {
    const { url, key, cookiePrefix, cookieOptions, clientOptions: { auth = {}, global = {} } } = useRuntimeConfig(event).public.supabase;
    event.context._supabaseClient = createServerClient(url, key, {
      auth,
      cookies: {
        getAll: () => parseCookieHeader(getHeader(event, "Cookie") ?? ""),
        setAll: (cookies) => setCookies(event, cookies)
      },
      cookieOptions: {
        ...cookieOptions,
        name: cookiePrefix
      },
      global: {
        fetch: fetchWithRetry,
        ...global
      }
    });
  }
  return event.context._supabaseClient;
};

const serverSupabaseUser = async (event) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client.auth.getClaims();
  if (error) {
    throw createError({ statusMessage: error?.message });
  }
  return data?.claims ?? null;
};

const perform_post = defineEventHandler(async (event) => {
  var _a;
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  if (!body || !body.actionId) throw createError({ statusCode: 400, statusMessage: "Missing actionId" });
  const { data: actionDef, error: actionError } = await client.from("game_actions").select("*").eq("id", body.actionId).single();
  if (actionError || !actionDef) {
    throw createError({ statusCode: 404, statusMessage: "Action definition not found" });
  }
  const { data: stats, error: statsError } = await client.from("player_stats").select("*").eq("user_id", user.id).single();
  if (statsError || !stats) {
    throw createError({ statusCode: 500, statusMessage: "Failed to retrieve player stats" });
  }
  const requirements = actionDef.requirements || [];
  const updates = {};
  const changes = [];
  for (const req of requirements) {
    const currentVal = (_a = stats[req.resource]) != null ? _a : 0;
    if (req.min !== void 0 && currentVal < req.min) {
      throw createError({ statusCode: 400, statusMessage: `Insufficient ${req.resource} (Required: ${req.min})` });
    }
    if (req.cost) {
      if (currentVal < req.cost) {
        throw createError({ statusCode: 400, statusMessage: `Not enough ${req.resource} to pay cost` });
      }
      const newVal = currentVal - req.cost;
      updates[req.resource] = newVal;
      if (req.resource in updates) {
        updates[req.resource] -= req.cost;
        if (updates[req.resource] < 0) throw createError({ statusCode: 400, statusMessage: "Cost exceeds balance" });
      } else {
        updates[req.resource] = currentVal - req.cost;
      }
      changes.push({ path: `player.${req.resource}`, value: -req.cost, operation: "add" });
    }
  }
  let success = true;
  let message = "Action performed successfully";
  if (actionDef.base_success_rate !== void 0) {
    if (Math.random() > actionDef.base_success_rate) {
      success = false;
      message = "Action failed";
    }
  }
  if (Object.keys(updates).length > 0) {
    const { error: updateError } = await client.from("player_stats").update(updates).eq("user_id", user.id);
    if (updateError) {
      throw createError({ statusCode: 500, statusMessage: updateError.message });
    }
  }
  return {
    success,
    message,
    changes
  };
});

const perform_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: perform_post
}, Symbol.toStringTag, { value: 'Module' }));

const buy_post = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  const { assetType, companyId, shares, amount } = body;
  if (!assetType) {
    throw createError({ statusCode: 400, statusMessage: "Missing assetType" });
  }
  const { data: stats, error: statsError } = await client.from("player_stats").select("cash").eq("user_id", user.id).maybeSingle();
  if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: "Failed to fetch player stats" });
  let cost = 0;
  let assetName = "New Asset";
  let properties = {};
  if (assetType === "stock") {
    if (!companyId || !shares) throw createError({ statusCode: 400, statusMessage: "Missing stock details" });
    const { data: company } = await client.from("companies").select("*").eq("id", companyId).single();
    if (!company) throw createError({ statusCode: 404, statusMessage: "Company not found" });
    cost = Number(company.share_price) * shares;
    assetName = company.name;
    properties = { ticker: company.ticker, company_id: company.id };
  } else {
    cost = amount || 0;
  }
  if (stats.cash < cost) {
    throw createError({ statusCode: 400, statusMessage: "Insufficient funds" });
  }
  await client.from("player_stats").update({ cash: ((stats == null ? void 0 : stats.cash) || 0) - cost }).eq("user_id", user.id);
  const { data: newAsset, error: assetError } = await client.from("assets").insert({
    owner_id: user.id,
    type: assetType,
    name: assetName,
    base_value: cost,
    current_value: cost,
    company_id: companyId,
    shares,
    properties
  }).select().single();
  if (assetError) throw createError({ statusCode: 500, statusMessage: "Failed to create asset" });
  return {
    success: true,
    asset: newAsset,
    cost
  };
});

const buy_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: buy_post
}, Symbol.toStringTag, { value: 'Module' }));

var AssetType = /* @__PURE__ */ ((AssetType2) => {
  AssetType2["Stock"] = "stock";
  AssetType2["RealEstate"] = "real_estate";
  AssetType2["Business"] = "business";
  AssetType2["Crypto"] = "crypto";
  return AssetType2;
})(AssetType || {});

const index_get = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  const { data: assetsData, error } = await client.from("assets").select("*").eq("owner_id", user.id);
  if (error) throw createError({ statusCode: 500, statusMessage: error.message });
  if (!assetsData || assetsData.length === 0) {
    return { assets: [] };
  }
  const stockAssets = assetsData.filter((a) => a.type === AssetType.Stock && a.company_id);
  const companyIds = stockAssets.map((a) => a.company_id);
  let companyMap = {};
  if (companyIds.length > 0) {
    const { data: companies } = await client.from("companies").select("id, ticker, share_price, name").in("id", companyIds);
    if (companies) {
      companies.forEach((c) => companyMap[c.id] = c);
    }
  }
  const compiledAssets = assetsData.map((asset) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const props = asset.properties || {};
    const base = {
      id: asset.id,
      ownerId: asset.owner_id,
      type: asset.type,
      name: asset.name || "Unknown",
      acquiredAt: asset.acquired_at || (/* @__PURE__ */ new Date()).toISOString(),
      baseValue: Number(asset.base_value || 0),
      currentValue: Number(asset.current_value || asset.base_value || 0)
    };
    if (asset.type === AssetType.Stock) {
      const company = companyMap[asset.company_id];
      const shares = Number(asset.shares || asset.count || 0);
      const currentPrice = company ? Number(company.share_price) : base.currentValue / (shares || 1);
      return {
        ...base,
        type: AssetType.Stock,
        name: company ? company.name : base.name,
        ticker: company ? company.ticker : asset.ticker || "???",
        shares,
        currentValue: shares * currentPrice,
        costBasisPerShare: Number(asset.cost_basis_per_share) || base.baseValue / (shares || 1)
      };
    } else if (asset.type === AssetType.RealEstate) {
      return {
        ...base,
        type: AssetType.RealEstate,
        location: props.location || asset.location || "Unknown",
        condition: Number((_b = (_a = props.condition) != null ? _a : asset.condition) != null ? _b : 100),
        isRenovating: Boolean((_d = (_c = props.is_renovating) != null ? _c : asset.is_renovating) != null ? _d : false)
      };
    } else if (asset.type === AssetType.Business) {
      return {
        ...base,
        type: AssetType.Business,
        sector: props.sector || asset.sector || "Generic",
        level: Number((_f = (_e = props.level) != null ? _e : asset.level) != null ? _f : 1),
        employees: Number((_h = (_g = props.employees) != null ? _g : asset.employees) != null ? _h : 0),
        revenuePerQuarter: Number((_i = props.revenue_per_quarter) != null ? _i : 0),
        expensePerQuarter: Number((_j = props.expense_per_quarter) != null ? _j : 0)
      };
    }
    return base;
  });
  return { assets: compiledAssets };
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const sell_post = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  const { assetId } = body;
  if (!assetId) {
    throw createError({ statusCode: 400, statusMessage: "Missing assetId" });
  }
  const { data: asset, error: assetError } = await client.from("assets").select("*, company:companies(*)").eq("id", assetId).eq("owner_id", user.id).maybeSingle();
  if (assetError || !asset) throw createError({ statusCode: 404, statusMessage: "Asset not found" });
  let realizedValue = Number(asset.current_value || asset.base_value);
  if (asset.type === "stock" && asset.company) {
    const shares = Number(asset.shares || 0);
    const priceAfterSlippage = calculateSlippage(shares, {
      share_price: asset.company.share_price,
      volatility: asset.company.volatility,
      total_shares: asset.company.total_shares
    });
    realizedValue = shares * priceAfterSlippage;
  }
  const costBasis = Number(asset.base_value || 0);
  const gain = Math.max(0, realizedValue - costBasis);
  const tax = gain * 0.3;
  const finalProceeds = realizedValue - tax;
  const { data: stats, error: statsError } = await client.from("player_stats").select("cash").eq("user_id", user.id).maybeSingle();
  if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: "Failed to fetch player stats" });
  const currentCash = (stats == null ? void 0 : stats.cash) || 0;
  const { error: updateError } = await client.from("player_stats").update({ cash: currentCash + finalProceeds }).eq("user_id", user.id);
  if (updateError) throw createError({ statusCode: 500, statusMessage: "Failed to update balance" });
  const { error: deleteError } = await client.from("assets").delete().eq("id", assetId);
  if (deleteError) {
    console.error("Failed to delete asset after adding cash!", deleteError);
    return { success: false, error: "Inconsistency error" };
  }
  return {
    success: true,
    realizedValue,
    tax,
    finalProceeds,
    newBalance: Number(stats.cash || 0) + finalProceeds
  };
});

const sell_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sell_post
}, Symbol.toStringTag, { value: 'Module' }));

const marketUpdate_post = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  try {
    const result = await StockEngine.stepMarket(client);
    return {
      success: true,
      ...result
    };
  } catch (e) {
    return {
      success: false,
      error: e.message
    };
  }
});

const marketUpdate_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: marketUpdate_post
}, Symbol.toStringTag, { value: 'Module' }));

const init_post = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const { count, error: countError } = await client.from("companies").select("*", { count: "exact", head: true });
  if (countError) throw createError({ statusCode: 500, statusMessage: countError.message });
  if (count && count > 0 && !(body == null ? void 0 : body.force)) {
    return { message: "Market already initialized. Use force: true to reset." };
  }
  if (body == null ? void 0 : body.force) {
    await client.from("companies").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  }
  const sectors = StockEngine.getInitialSectors();
  const companiesToInsert = [];
  for (const sector of sectors) {
    for (let i = 0; i < 10; i++) {
      const name = `${sector} Corp ${i + 1}`;
      const ticker = `${sector.substring(0, 3).toUpperCase()}${i}`;
      const company = StockEngine.generateCompany(name, ticker, sector);
      companiesToInsert.push({
        id: company.id,
        name: company.name,
        ticker: company.ticker,
        sector: company.sector,
        description: company.description,
        share_price: company.sharePrice,
        prev_share_price: company.prevSharePrice,
        total_shares: company.totalShares,
        volatility: company.volatility,
        dividend_yield: company.dividendYield
        // jsonb fields?
        // Assuming 'price_history' is a JSONB column or similar
        // If checking the schema from index.get.ts, it didn't explicitly show it,
        // but we will assume it can be stored.
        // We'll trust the plan and assume we can add it or it's ignored if column missing.
        // If Supabase throws error, we will fix schema.
      });
    }
  }
  const { error: insertError } = await client.from("companies").insert(companiesToInsert);
  if (insertError) throw createError({ statusCode: 500, statusMessage: insertError.message });
  return {
    message: `Initialized ${companiesToInsert.length} companies across ${sectors.length} sectors.`,
    companies: companiesToInsert.length
  };
});

const init_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: init_post
}, Symbol.toStringTag, { value: 'Module' }));

const step_post = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  try {
    const result = await StockEngine.stepMarket(client);
    return {
      message: "Market stepped successfully.",
      ...result
    };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

const step_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: step_post
}, Symbol.toStringTag, { value: 'Module' }));

const summary_get = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const { data: stats } = await client.from("player_stats").select("cash").eq("user_id", user.id).single();
  const cash = (stats == null ? void 0 : stats.cash) || 0;
  const { data: assets } = await client.from("assets").select("*").eq("owner_id", user.id);
  let totalAssetValue = 0;
  let liquidStockValue = 0;
  const assetValuations = [];
  if (assets && assets.length > 0) {
    const stockAssets = assets.filter((a) => a.type === "stock" && a.company_id);
    const companyIds = stockAssets.map((a) => a.company_id);
    let companyMap = {};
    if (companyIds.length > 0) {
      const { data: companies } = await client.from("companies").select("id, share_price").in("id", companyIds);
      if (companies) {
        companies.forEach((c) => companyMap[c.id] = c);
      }
    }
    for (const asset of assets) {
      let currentValue = asset.current_value || asset.base_value || 0;
      if (asset.type === "stock" && asset.company_id && companyMap[asset.company_id]) {
        currentValue = (asset.shares || 0) * companyMap[asset.company_id].share_price;
      }
      totalAssetValue += currentValue;
      if (asset.type === "stock") {
        liquidStockValue += currentValue;
      }
      assetValuations.push({
        assetId: asset.id,
        name: asset.name || asset.ticker || "Unknown Asset",
        currentValue,
        ltv: asset.ltv || 0.5,
        maxLoanable: currentValue * (asset.ltv || 0.5)
      });
    }
  }
  const { data: loans } = await client.from("loans").select("*").eq("borrower_id", user.id);
  let totalPrincipal = 0;
  if (loans) {
    totalPrincipal = loans.reduce((sum, loan) => sum + (loan.remaining_principal || 0), 0);
  }
  const state = {
    netWorth: cash + totalAssetValue - totalPrincipal,
    liquidity: {
      cash,
      liquidStockValue,
      liquidationPenalty: liquidStockValue * 0.01
      // Assume 1% slippage/fees
    },
    debt: {
      totalPrincipal,
      dailyInterestRate: 0,
      // Would need weighted average calculation
      nextPaymentDue: new Date(Date.now() + 864e5 * 7).toISOString()
      // Placeholder mechanism for now
    },
    assets: assetValuations
  };
  return {
    tick: Date.now(),
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    state
  };
});

const summary_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: summary_get
}, Symbol.toStringTag, { value: 'Module' }));

const pending_get = defineEventHandler(async (event) => {
  const mockEvents = [
    {
      id: "evt_001",
      type: EventType.Opportunity,
      title: "Insider Tip",
      description: "An old contact offers you early access to a tech startup IPO. It requires quick cash.",
      isPersistent: false,
      choices: [
        {
          id: "c_001_a",
          text: "Invest heavily ($50k)",
          outcome: {
            id: "out_001_a",
            description: "You bought in early.",
            mutations: [
              { path: "player.cash", operation: "add", value: -5e4 },
              { path: "assets.tech_stock_01.value", operation: "add", value: 5e4 }
            ]
          }
        },
        {
          id: "c_001_b",
          text: "Ignore",
          outcome: {
            id: "out_001_b",
            description: "You let the opportunity pass.",
            mutations: []
          }
        }
      ]
    }
  ];
  return {
    events: mockEvents
  };
});

const pending_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: pending_get
}, Symbol.toStringTag, { value: 'Module' }));

const resolve_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body || !body.eventId || !body.choiceId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing eventId or choiceId"
    });
  }
  const response = {
    success: true,
    outcome: {
      id: "out_mock",
      description: "Event resolved successfully (Mock)",
      mutations: []
    }
  };
  return response;
});

const resolve_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: resolve_post
}, Symbol.toStringTag, { value: 'Module' }));

const tick_post = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  try {
    const result = await StockEngine.stepMarket(client);
    return {
      tick: Date.now(),
      globalTrend: 0,
      // Deprecated/Managed by influences
      marketState: result.companies,
      // This might differ in shape from PublicCompany but contains key fields
      activeInfluences: result.activeInfluences,
      message: "Market updated via StockEngine"
    };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

const tick_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tick_post
}, Symbol.toStringTag, { value: 'Module' }));

const active_get = defineEventHandler(async (event) => {
  const loops = [
    {
      id: "ln_001",
      borrowerId: "usr_001",
      lenderName: "Iron Bank",
      principal: 5e5,
      remainingPrincipal: 48e4,
      interestRateDaily: 2e-4,
      // 0.02%
      originationDate: new Date(Date.now() - 864e5 * 10).toISOString(),
      // 10 days ago
      termDays: -1,
      // Margin
      collateralAssetId: "ast_001"
    },
    {
      id: "ln_002",
      borrowerId: "usr_001",
      lenderName: "QuickCred",
      principal: 1e4,
      remainingPrincipal: 8500,
      interestRateDaily: 1e-3,
      originationDate: new Date(Date.now() - 864e5 * 5).toISOString(),
      termDays: 30
    }
  ];
  return { loans: loops };
});

const active_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: active_get
}, Symbol.toStringTag, { value: 'Module' }));

const offers_get = defineEventHandler(async (event) => {
  const offers = [
    {
      id: "offer_fast_cash",
      lenderName: "QuickCred",
      maxPrincipal: 1e4,
      interestRateDaily: 1e-3,
      // 0.1% daily
      ltvRatio: 0,
      termDays: 30
    },
    {
      id: "offer_margin",
      lenderName: "Iron Bank",
      maxPrincipal: 5e5,
      interestRateDaily: 2e-4,
      // 0.02% daily
      ltvRatio: 0.5,
      termDays: -1
    }
  ];
  return { offers };
});

const offers_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: offers_get
}, Symbol.toStringTag, { value: 'Module' }));

const pay_post = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  const { loanId, amount } = body;
  if (!loanId || !amount) {
    throw createError({ statusCode: 400, statusMessage: "Missing loanId or amount" });
  }
  const { data: loan, error: loanError } = await client.from("loans").select("*").eq("id", loanId).eq("borrower_id", user.id).maybeSingle();
  if (loanError || !loan) {
    throw createError({ statusCode: 404, statusMessage: "Loan not found" });
  }
  const { data: stats, error: statsError } = await client.from("player_stats").select("cash").eq("user_id", user.id).maybeSingle();
  if (statsError || !stats) throw createError({ statusCode: 404, statusMessage: "Player stats not found" });
  const currentCash = (stats == null ? void 0 : stats.cash) || 0;
  if (currentCash < amount) {
    throw createError({ statusCode: 400, statusMessage: "Insufficient funds" });
  }
  const paymentAmount = Math.min(amount, Number(loan.remaining_principal));
  await client.from("player_stats").update({ cash: currentCash - paymentAmount }).eq("user_id", user.id);
  const newPrincipal = Number(loan.remaining_principal) - paymentAmount;
  const { error: updateError } = await client.from("loans").update({ remaining_principal: newPrincipal }).eq("id", loanId);
  if (updateError) throw createError({ statusCode: 500, statusMessage: "Failed to update loan principal" });
  return {
    success: true,
    paid: paymentAmount,
    remaining: newPrincipal
  };
});

const pay_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: pay_post
}, Symbol.toStringTag, { value: 'Module' }));

const take_post = defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  const { lenderName, principal, interestRateDaily, termDays, collateralAssetId } = body;
  if (!principal || !lenderName || interestRateDaily === void 0) {
    throw createError({ statusCode: 400, statusMessage: "Missing loan details" });
  }
  if (collateralAssetId) {
    const { data: asset, error: assetError } = await client.from("assets").select("*").eq("id", collateralAssetId).eq("owner_id", user.id).maybeSingle();
    if (assetError || !asset) {
      throw createError({ statusCode: 400, statusMessage: "Invalid or unauthorized collateral asset" });
    }
    const assetValue = Number(asset.current_value || asset.base_value);
    if (principal > assetValue * 0.8) {
      throw createError({ statusCode: 400, statusMessage: "Principal exceeds max LTV for collateral" });
    }
  }
  const { data: stats, error: statsError } = await client.from("player_stats").select("cash").eq("user_id", user.id).maybeSingle();
  if (statsError || !stats) throw createError({ statusCode: 500, statusMessage: "Failed to fetch player stats" });
  const currentCash = (stats == null ? void 0 : stats.cash) || 0;
  await client.from("player_stats").update({ cash: currentCash + Number(principal) }).eq("user_id", user.id);
  const { data: loan, error: loanError } = await client.from("loans").insert({
    borrower_id: user.id,
    lender_name: lenderName,
    principal,
    remaining_principal: principal,
    interest_rate_daily: interestRateDaily,
    term_days: termDays || -1,
    collateral_asset_id: collateralAssetId
  }).select().single();
  if (loanError) throw createError({ statusCode: 500, statusMessage: "Failed to create loan record" });
  return {
    success: true,
    loan
  };
});

const take_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: take_post
}, Symbol.toStringTag, { value: 'Module' }));

const companies_get = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  let companies = [];
  let usedMock = false;
  try {
    const { data, error } = await client.from("companies").select("*").order("ticker");
    if (error || !data || data.length === 0) throw error || new Error("No data");
    companies = data;
  } catch (e) {
    console.warn("Failed to fetch companies from Supabase, failing back to mock data:", e);
    usedMock = true;
    companies = [
      {
        id: "comp_tech_001",
        name: "OmniCorp Tech",
        ticker: "OMNI",
        sector: "Technology",
        description: "A global conglomerate in AI and robotics.",
        share_price: 150.25,
        prev_share_price: 148.5,
        total_shares: 1e8,
        volatility: 0.8,
        dividend_yield: 5e-3
      },
      {
        id: "comp_re_002",
        name: "BuildRight Real Estate",
        ticker: "BLDR",
        sector: "Real Estate",
        description: "Commercial real estate trust.",
        share_price: 45.1,
        prev_share_price: 45,
        total_shares: 5e7,
        volatility: 0.2,
        dividend_yield: 0.04
      }
    ];
  }
  const formattedCompanies = companies.map((c) => ({
    id: c.id,
    name: c.name,
    ticker: c.ticker,
    sector: c.sector,
    description: c.description,
    sharePrice: Number(c.share_price),
    prevSharePrice: Number(c.prev_share_price || c.share_price),
    totalShares: c.total_shares,
    volatility: Number(c.volatility),
    dividendYield: Number(c.dividend_yield),
    priceHistory: []
  }));
  return { companies: formattedCompanies, source: usedMock ? "mock" : "db" };
});

const companies_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: companies_get
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  const body = await readBody(event);
  if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  const { name, ticker, sector } = body || {};
  if (!name || !ticker || !sector) {
    throw createError({ statusCode: 400, statusMessage: "Missing Input: name, ticker, sector" });
  }
  const company = StockEngine.generateCompany(name, ticker, sector);
  company.description = `Founded by player.`;
  const { error: insertError } = await client.from("companies").insert({
    id: company.id,
    name: company.name,
    ticker: company.ticker,
    sector: company.sector,
    description: company.description,
    share_price: company.sharePrice,
    prev_share_price: company.prevSharePrice,
    total_shares: company.totalShares,
    volatility: company.volatility,
    dividend_yield: company.dividendYield
    // creator_id: user.id // If schema supports it
  });
  if (insertError) throw createError({ statusCode: 500, statusMessage: insertError.message });
  return {
    message: "Company successfully listed.",
    company
  };
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const profile_get = defineEventHandler(async (event) => {
  var _a;
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient(event);
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  const { data: profile, error: profileError } = await client.from("profiles").select("*").eq("id", user.id).single();
  const { data: stats, error: statsError } = await client.from("player_stats").select("*").eq("user_id", user.id).single();
  return {
    id: user.id,
    username: (profile == null ? void 0 : profile.username) || ((_a = user.email) == null ? void 0 : _a.split("@")[0]) || "Operator",
    title: (profile == null ? void 0 : profile.title) || "Day Trader",
    stats: {
      heat: (stats == null ? void 0 : stats.heat) || 0,
      karma: (stats == null ? void 0 : stats.karma) || 0,
      reputation: (stats == null ? void 0 : stats.reputation) || 0,
      insiderLevel: (stats == null ? void 0 : stats.insider_level) || 0
    },
    level: (stats == null ? void 0 : stats.level) || 1,
    xp: (stats == null ? void 0 : stats.xp) || 0,
    nextLevelXp: ((stats == null ? void 0 : stats.level) || 1) * 1e3
    // Simple progression formula
  };
});

const profile_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
