// @flow

import { PanelContentMediator } from './panel-content-mediator';

/**
 * Manages {@link PanelContentMediator} instances based on their typeId values.
 */
class PanelContentMediatorRegistry {
  /*:: mediators: {[key: string]: PanelContentMediator};*/

  constructor() {
    /**
     * @private
     * @type {Object.<String, PanelContentMediator>}
     */
    this.mediators = {};
  }

  /**
   * Registers a new mediator instance in the registry.
   * @param {PanelContentMediator} mediator
   * @throws {Error} if a panel definition with the same typeId has already been registered.
   */
  register(mediator/*: PanelContentMediator*/)/*: void*/ {
    if (!(mediator instanceof PanelContentMediator)) {
      throw new TypeError('Expected instance of PanelContentMediator');
    }

    let typeId = mediator.id;

    if (this.mediators.hasOwnProperty(typeId)) {
      throw new Error(`A panel type with id '${typeId}' has already been registered.`);
    }

    this.mediators[mediator.id] = mediator;
  }

  /**
   * Removes a previously registered {@link PanelTypeDefinition} by typeId if available.
   * @param {string} panelTypeId
   */
  remove(panelTypeId/*: string*/) {
    if (this.mediators.hasOwnProperty(panelTypeId)) {
      delete this.mediators[panelTypeId];
    }
  }

  /**
   * Retrieve all available panel definition types that have been registered.
   * @return {PanelContentMediator[]}
   */
  getMediators()/*: PanelContentMediator[]*/ {
    return Object.keys(this.mediators).map((key) => this.mediators[key]);
  }

  /**
   * Retrieve a panel definition's info by its typeId.
   * @param {string} panelTypeId
   * @return {PanelType}
   * @throws {Error} if no matching handler is found for the given id.
   */
  getMediator(id/*: string*/)/*: PanelContentMediator*/ {
    if (!this.mediators.hasOwnProperty(id)) {
      throw new Error(`No drop handler with id '${id}'.`)
    }

    return this.mediators[id];
  }

  /**
   * Finds panel content mediators that are capable of handling the provided data object.
   * @param {*} obj
   * @param {Object} context
   * @return {PanelContentMediator[]}
   */
  findContentMediators(obj/*: any*/, context/*: Object*/ = {})/*: PanelContentMediator[]*/ {
    return this.getMediators().filter(mediator => mediator.matches(obj, context));
  }
}

export { PanelContentMediatorRegistry };
