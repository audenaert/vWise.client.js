// @flow

/*:: import type { PanelDefinition } from './panel-definition';*/

import { PanelRegistration } from './panel-registration';

/**
 * A lightweight data structure representing a {@link PanelRegistration} instance.
 * @typedef PanelType
 * @memberof PanelRegistration
 * @type {Object}
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} priority
 */
/*:: type PanelType = {
  id: string,
  title: string,
  description: string,
  priority: number
}*/

/**
 * Manages {@link PanelDefinition} instances based on their typeId values.
 */
class PanelRegistry {
  /*:: registrations: {[key: string]: PanelRegistration};*/

  constructor() {
    /**
     * @private
     * @type {Object.<String, PanelDefinition>}
     */
    this.registrations = {};
  }

  /**
   * Registers a new {@link PanelDefinition} instance in the registry.
   * @param {PanelDefinition} panelDefn
   * @return {PanelRegistration}
   * @throws {Error} if a panel definition with the same typeId has already been registered.
   */
  register(panelDefn/*: PanelDefinition*/)/*: PanelRegistration*/ {
    let typeId = panelDefn.typeId;

    if (this.registrations.hasOwnProperty(typeId)) {
      throw new Error(`A panel with id '${typeId}' has already been registered.`);
    }

    let reg = new PanelRegistration(panelDefn);
    this.registrations[reg.typeId] = reg;
    return reg;
  }

  /**
   * Removes a previously registered {@link PanelDefinition} by typeId if available.
   * @param {string} panelTypeId
   */
  remove(panelTypeId/*: string*/) {
    if (this.registrations.hasOwnProperty(panelTypeId)) {
      delete this.registrations[panelTypeId];
    }
  }

  /**
   * Retrieve all available panel definition types that have been registered.
   * @return {PanelType[]}
   */
  listPanelTypes()/*: PanelType[]*/ {
    return Object.keys(this.registrations).map((key) => {
      let registration = this.registrations[key];
      return {
        id: registration.id,
        title: registration.title,
        description: registration.description,
        priority: registration.priority
      };
    });
  }

  /**
   * Retrieve a panel definition's info by its typeId.
   * @param {string} panelTypeId
   * @return {PanelType}
   * @throws {Error} if no matching handler is found for the given id.
   */
  getPanelType(panelTypeId/*: string*/)/*: PanelType*/ {
    if (!this.registrations.hasOwnProperty(panelTypeId)) {
      throw new Error(`No drop handler with id '${panelTypeId}'.`)
    }

    return this.registrations[panelTypeId];
  }
}

export { PanelRegistry };
