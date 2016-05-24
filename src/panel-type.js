// @flow

/*:: import type { PanelTypeDefinition } from './panel-type-definition';*/

/**
 * A thin class wrapper around a {@link PanelTypeDefinition} object.
 */
class PanelType {
  /*:: _def: PanelTypeDefinition;*/
  /*:: id: string;*/
  /*:: typeId: string;*/
  /*:: title: string;*/
  /*:: description: string;*/
  /*:: priority: number;*/
  /*:: contentType: string;*/

  /**
   * @param {PanelTypeDefinition} panelDefn
   */
  constructor(panelDefn/*: PanelTypeDefinition*/) {
    if (!PanelType.validatePanelTypeDefinition(panelDefn)) {
      throw new Error('Invalid panel definition');
    }

    /**
     * @private
     * @type {PanelTypeDefinition}
     */
    this._def = panelDefn;

    /** @type {string} */
    this.typeId = panelDefn.typeId;

    /** @type {string} */
    this.id = panelDefn.id;

    /** @type {string} */
    this.title = panelDefn.title || panelDefn.typeId;

    /** @type {string} */
    this.description = panelDefn.description || '';

    /** @type {number} */
    this.priority = panelDefn.priority || 1;

    /** @type {string} */
    this.contentType = panelDefn.contentType || 'application/json';
  }

  /**
   * Delegates to {@link PanelTypeDefinition#matches}
   * @param {Object} item
   * @param {Object} ctx
   * @return {boolean}
   */
  matches(item/*: any*/, ctx/*: Object*/)/*: boolean*/ {
    return this._def.matches(item, ctx);
  }

  /**
   * Delegates to {@link PanelTypeDefinition#initPanelData}
   * @return {Object}
   */
  initPanelData(item/*: any*/, ctx/*: Object*/)/*: void*/ {
    return this._def.initPanelData(item, ctx);
  }

  /**
   * Converts serialized panel content into a simple JS object
   * @param  {string} content
   * @return {Object}
   */
  parseContent(content/*: string*/)/*: Object*/ {
    return this._def.parseContent ? this._def.parseContent(content) : JSON.parse(content);
  }

  /**
   * Converts panel content into a serialized string for serialization
   * @param  {Object} obj
   * @return {string}
   */
  formatContent(obj/*: Object*/)/*: string*/ {
    return this._def.formatContent ? this._def.formatContent(obj) : JSON.stringify(obj || {});
  }

  /**
   * Validates the given panel definition for the minimum required fields.
   * @return {boolean} true if the panel definition is valid; and false otherwise.
   */
  static validatePanelTypeDefinition(def/*: PanelTypeDefinition*/)/*: boolean*/ {
    if (!def.id) {
      return false;
    }

    if (!def.typeId) {
      return false;
    }

    if (!def.matches || typeof def.matches !== 'function') {
      return false;
    }

    if (!def.initPanelData || typeof def.initPanelData !== 'function') {
      return false;
    }

    return true;
  }
}

export { PanelType };
