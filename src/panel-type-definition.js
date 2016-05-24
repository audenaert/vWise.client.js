// @flow

// NOTE: this file is meant to be a declarative "interface" for documentation and typechecking purposes.

/**
 * @name PanelTypeDefinition
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
 * @name PanelTypeDefinition#matches
 * @param {Object} item The candidate item to display.
 * @param {Object} [ctx] Execution context related to the item.
 * @return {boolean} true if this panel is able to display the given item.
*/

/**
 *
 * @method
 * @name PanelTypeDefinition#initPanelData
 * @param {Object} item The item to display.
 * @param {Object} [ctx] Execution context related to the item.
 */

/**
 * An optional method for parsing serialized panel content.
 * The default behavior is to try to parse JSON.
 * @method
 * @name PanelTypeDefinition#parseContent
 * @param {string} content
 * @return {Object}
 */

/**
 * Converts content for panel from a JS object into a string for serialization purposes.
 * Note: This may be a partial representation of the JS object provided the additional properties can be restored as needed.
 * The default behavior is to serialize as a JSON blob.
 * @method
 * @name PanelTypeDefinition#formatContent
 * @param {Object} obj
 * @return {string}
 */

/*:: export type PanelTypeDefinition = {
  id: string,
  typeId: string,
  title: ?string,
  description: ?string,
  priority: ?number,
  contentType: ?string,
  matches: (item: any, ctx?: Object) => boolean,
  initPanelData: (item: any, ctx?: Object) => void,
  parseContent: ?(content: string) => Object,
  formatContent: ?(obj: Object) => string
}*/
