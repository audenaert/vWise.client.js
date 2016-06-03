// @flow

/**
 * A simple key/value cache store that uses an in-memory object.
 */
class Cache/*:: <T>*/ {
  /*:: _cache: { [key: string]: T };*/

  constructor() {
    /** @type {Object.<string,*>} */
    this._cache = {};
  }

  /**
   * Fetches a value from the cache by its key.
   * If no value has been associated with that key, then the cached value will be set to the return value of the provider and then returned.
   * @param  {string} key
   * @param  {Cache~provider}
   * @return {*}
   */
  fetch(key/*: string*/, provider/*: T | (key: string) => T*/)/*: T*/ {
    if (typeof key === 'undefined') {
      throw new Error('no key provided');
    }

    if (typeof provider === 'undefined') {
      throw new Error('no value provider provided');
    }

    if (!this._cache.hasOwnProperty(key)) {
      this._cache[key] = typeof provider === 'function' ? provider(key) : provider;
    }

    return this._cache[key];
  }

  /**
   * Removes the specified key from the cache.
   * If no key is provided, then the entire cache is cleared.
   * @param  {string} [key]
   */
  clear(key/*: ?string*/)/*: void*/ {
    if (key) {
      if (this._cache.hasOwnProperty(key)) {
        delete this._cache[key];
      }
    } else {
      this._cache = {};
    }
  }
}

/**
 * Provides the value that should be associated with the provided key
 * @callback Cache~provider
 * @param {string} key
 * @return {*}
 */

export { Cache };
