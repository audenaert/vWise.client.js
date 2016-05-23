// @flow

/*:: import type { PanelDefinition } from './panel-definition';*/

/**
 * A thin class wrapper around a {@link PanelDefinition} object.
 */
class PanelRegistration {
  /*:: _def: PanelDefinition;*/
  /*:: id: string;*/
  /*:: typeId: string;*/
  /*:: title: string;*/
  /*:: description: string;*/
  /*:: priority: number;*/
  /*:: contentType: string;*/

  /**
   * @param {PanelDefinition} panelDefn
   */
  constructor(panelDefn/*: PanelDefinition*/) {
    if (!PanelRegistration.validatePanelDefinition(panelDefn)) {
      throw new Error('Invalid panel definition');
    }

    /**
     * @private
     * @type {PanelDefinition}
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
   * Delegates to {@link PanelDefinition#matches}
   * @param {Object} item
   * @param {Object} ctx
   * @return {boolean}
   */
  matches(item/*: any*/, ctx/*: Object*/)/*: boolean*/ {
    return this._def.matches(item, ctx);
  }

  /**
   * Delegates to {@link PanelDefinition#initPanelData}
   * @return {Object}
   */
  initPanelData(item/*: any*/, ctx/*: Object*/)/*: void*/ {
    return this._def.initPanelData(item, ctx);
  }

  /**
   * Validates the given panel definition for the minimum required fields.
   * @return {boolean} true if the panel definition is valid; and false otherwise.
   */
  static validatePanelDefinition(def/*: PanelDefinition*/)/*: boolean*/ {
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

export { PanelRegistration };
