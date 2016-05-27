// @flow

/*:: import type { PanelTypeDefinition } from './panel-type-definition';*/

import { PanelType } from './panel-type';

/**
 * Manages {@link PanelTypeDefinition} instances based on their typeId values.
 */
class PanelTypeRegistry {
  /*:: types: {[key: string]: PanelType};*/

  constructor() {
    /**
     * @private
     * @type {Object.<String, PanelTypeDefinition>}
     */
    this.types = {};
  }

  /**
   * Registers a new {@link PanelTypeDefinition} instance in the registry.
   * @param {PanelTypeDefinition} typeDef
   * @return {PanelType}
   * @throws {Error} if a panel definition with the same typeId has already been registered.
   */
  register(typeDef/*: PanelTypeDefinition*/)/*: PanelType*/ {
    let typeId = typeDef.typeId;

    if (this.types.hasOwnProperty(typeId)) {
      throw new Error(`A panel type with id '${typeId}' has already been registered.`);
    }

    let reg = new PanelType(typeDef);
    this.types[reg.typeId] = reg;
    return reg;
  }

  /**
   * Removes a previously registered {@link PanelTypeDefinition} by typeId if available.
   * @param {string} panelTypeId
   */
  remove(panelTypeId/*: string*/) {
    if (this.types.hasOwnProperty(panelTypeId)) {
      delete this.types[panelTypeId];
    }
  }

  /**
   * Retrieve all available panel definition types that have been registered.
   * @return {PanelType[]}
   */
  listPanelTypes()/*: PanelType[]*/ {
    return Object.keys(this.types).map((key) => this.types[key]);
  }

  /**
   * Retrieve a panel definition's info by its typeId.
   * @param {string} panelTypeId
   * @return {PanelType}
   * @throws {Error} if no matching handler is found for the given id.
   */
  getPanelType(panelTypeId/*: string*/)/*: PanelType*/ {
    if (!this.types.hasOwnProperty(panelTypeId)) {
      throw new Error(`No drop handler with id '${panelTypeId}'.`)
    }

    return this.types[panelTypeId];
  }
}

export { PanelTypeRegistry };
