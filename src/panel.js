// @flow

/*:: import { Workspace } from './workspace';*/
/*:: import { PanelContentMediator } from './panel-content-mediator';*/

/*:: type Point = { x: number, y: number };*/
/**
 * @typedef Point
 * @type {Object}
 * @property {integer} x
 * @property {integer} y
 */

 /*:: type Dimensions = { width: number, height: number };*/
/**
 * @typedef Dimensions
 * @type {Object}
 * @property {integer} width
 * @property {integer} height
 */


class Panel {
  /*:: id: string;*/
  /*:: contentMediator: PanelContentMediator;*/
  /*:: workspace: Workspace;*/
  /*:: vprops: { [key: string]: any };*/
  /*:: content: any;*/
  /*:: updateHandler: ?(panel: Panel) => void;*/

  /**
   * @param {string} id
   * @param {PanelContentMediator} contentMediator
   * @param {Workspace} workspace
   * @return {Workspace}
   */
  constructor(id/*: string */, contentMediator/*: PanelContentMediator*/, workspace/*: Workspace*/, updateHandler/*: ?(panel: Panel) => void*/) {
    /** @type {string} */
    this.id = id;

    /** @type {PanelContentMediator} */
    this.contentMediator = contentMediator;

    /** @type {Workspace} */
    this.workspace = workspace;

    /** @type {Panel~UpdateHandler} */
    this.updateHandler = updateHandler;

    /**
     * Visual display properties
     * @private
     * @type {Object.<string,Object>}
     */
    this.vprops = {
      xPosition: 100,
      yPosition: 100,
      zPosition: 10,
      width: 250,
      height: 300,
      aspect: 0,
      background: 'blue',
      textColor: 'black',
      fontFamily: '',
      fontSize: '',
      fontWeight: '',
      style: ''
    }
  }

  /**
   * Sets the size dimensions of the panel
   * Triggers update handler after all properties have been set.
   * @param {integer} width
   * @param {integer} height
   */
  setSize(width/*: number*/, height/*: number*/)/*: void*/ {
    this.setAll({ width, height });
  }

  /**
   * Retrieves the dimensions of the panel
   * @return {Dimensions}
   */
  getSize()/*: Dimensions*/ {
    return {
      width: this.vprops.width,
      height: this.vprops.height
    };
  }

  /**
   * Sets position of the panel.
   * Triggers update handler after all properties have been set.
   * @param {integer} xPosition
   * @param {integer} yPosition
   */
  setPosition(xPosition/*: number*/, yPosition/*: number*/)/*: void*/ {
    this.setAll({ xPosition, yPosition });
  }

  /**
   * Retrieves the position of the panel.
   * @return {Point}
   */
  getPosition()/*: Point*/ {
    return {
      x: this.vprops.xPosition,
      y: this.vprops.yPosition
    };
  }

  /**
   * Sets an arbitrary property on the panel.
   * Triggers update handler after property has been set.
   * @param {string} property
   * @param {Object} [value]
   */
  set(property/*: string*/, value/*: any*/)/*: void*/ {
    this.setAll({ [property]: value });
  }

  /**
   * Copies provided key/value pairs from provided object into panel properties
   * Triggers update handler after all properties have been set.
   * @param {Object.<string,Object>} [props = {}]
   */
  setAll(props/*: { [key: string]: any }*/ = {})/*: void*/ {
    for (let prop in props) if (props.hasOwnProperty(prop)) {
      this.vprops[prop] = props[prop];
    }

    if (this.updateHandler) {
      this.updateHandler(this);
    }
  }

  /**
   * Retrieves a specific named panel property.
   * @param {string} property
   * @return {Object}
   */
  get(property/*: string*/)/*: any*/ {
    return this.vprops[property];
  }

  /**
   * Retrieves an object map containing all panel properties.
   * The returned object is a shallow copy of the underlying data structure.
   * @return {Object.<string,Object>}
   */
  getAll()/*: { [key: string]: any }*/ {
    let clone = {};

    for (let prop in this.vprops) if (this.vprops.hasOwnProperty(prop)) {
      clone[prop] = this.vprops[prop];
    }

    return clone;
  }

  /**
   * Removes the panel from its contained workspace
   * @see Workspace#removePanel
   */
  remove()/*: void*/ {
    this.workspace.removePanel(this);
  }
}

/**
 * @callback Panel~UpdateHandler
 * @param {Panel} panel
 */

export { Panel };
