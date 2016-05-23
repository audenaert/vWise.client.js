// @flow

// NOTE: this file is meant to be a declarative "interface" for documentation and typechecking purposes.

/**
 * @name PanelDefinition
 * @interface
 * @property {string} id A unique identifier for this panel.
 * @property {string} typeId Identifies the type of data that this panel can display.
 * @property {string} [title] A short human-readable title of this panel.
 * @property {string} [description] A longer human-readable description of this panel.
 * @property {number} [priority] When handling multiple panels, higher priority panels will be handled first.
 * @property {string} [contentType] A MIME type string ???
 */

/**
 * Determines whether this panel is equipped to display a candidate item.
 * @method
 * @name PanelDefinition#matches
 * @param {Object} item The candidate item to display.
 * @param {Object} [ctx] Execution context related to the item.
 * @return {boolean} true if this panel is able to display the given item.
*/

/**
 *
 * @method
 * @name PanelDefinition#initPanelData
 * @param {Object} item The item to display.
 * @param {Object} [ctx] Execution context related to the item.
 */

/*:: export type PanelDefinition = {
  id: string,
  typeId: string,
  title: ?string,
  description: ?string,
  priority: ?number,
  contentType: ?string,
  matches: (item: any, ctx?: Object) => boolean,
  initPanelData: (item: any, ctx?: Object) => void
}*/
