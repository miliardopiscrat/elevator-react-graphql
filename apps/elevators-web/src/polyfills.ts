/*
 * Polyfill stable language features.
 * It's recommended to use @babel/preset-env and browserslist
 * to only include the polyfills necessary for the target browsers.
 */
/* tslint:disable */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

declare global {
  interface Object {
    global: object;
    globalThis: object;
  }
}

polyfillGlobalThis();
polyfillGlobal();

function polyfillGlobalThis ():object {
  if (typeof globalThis !== 'undefined') return globalThis;
  Object.defineProperty(Object.prototype, 'globalThis', {
    get: function () {
      delete Object.prototype.globalThis;
      this.globalThis = this;
      return this;
    },
    configurable: true
  });
  return globalThis;
}

function polyfillGlobal ():object {
  if (typeof global !== 'undefined') return global;
  Object.defineProperty(Object.prototype, 'global', {
    get: function () {
      delete Object.prototype.global;
      this.global = this;
      return this;
    },
    configurable: true
  });
  return global;
}
