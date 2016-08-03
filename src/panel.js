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


class Panel/*:: <T>*/ {
  /*:: id: string;*/
  /*:: contentMediator: PanelContentMediator;*/
  /*:: workspace: Workspace;*/
  /*:: vprops: { [key: string]: any };*/
  /*:: content: T;*/
  /*:: updateHandler: ?(panel: Panel) => void;*/

  /**
   * @param {string} id
   * @param {PanelContentMediator} contentMediator
   * @param {Workspace} workspace
   * @param {*} content
   * @param {Object} [vprops]
   * @param {Function} [updateHandler]
   * @return {Workspace}
   */
  constructor(id/*: string */, contentMediator/*: PanelContentMediator*/, workspace/*: Workspace*/, content/*: T*/, vprops/*: ?{ [key: string]: any }*/, updateHandler/*: ?(panel: Panel<T>) => void*/) {
    if (!id) {
      throw new Error('no id provided');
    }
    /** @type {string} */
    this.id = id;

    if (!contentMediator) {
      throw new Error('no content mediator provided');
    }
    /** @type {PanelContentMediator} */
    this.contentMediator = contentMediator;

    if (!workspace) {
      throw new Error('no workspace provided');
    }
    /** @type {Workspace} */
    this.workspace = workspace;

    if (!content) {
      throw new Error('no panel content provided');
    }
    /** @type {*} */
    this.content = content;

    /** @type {Panel~UpdateHandler} */
    this.updateHandler = updateHandler;

    /**
     * Visual display properties
     * @private
     * @type {Object.<string,*>}
     */
    this.vprops = {
      xPosition: 100,
      yPosition: 100,
      zPosition: 10,
      width: 250,
      height: 300,
      aspect: 0,
      background: '#ffffff',
      foreground: 'rgba(0,0,0,0.87)',
      fontFamily: '',
      fontSize: '',
      fontWeight: '',
      style: ''
    };

    if (vprops) {
      for (let prop of Object.keys(vprops)) {
        this.vprops[prop] = vprops[prop];
      }
    }
  }

  /**
   * Sets the size dimensions of the panel
   * Triggers update handler after all properties have been set.
   * @param {integer} width
   * @param {integer} height
   */
  setSize(width/*: number*/, height/*: number*/)/*: void*/ {
    this.setVisualProperties({ width, height });
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
    this.setVisualProperties({ xPosition, yPosition });
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
   * Sets an arbitrary visual property on the panel.
   * Triggers update handler after property has been set.
   * @param {string} property
   * @param {*} [value]
   */
  set(property/*: string*/, value/*: any*/)/*: void*/ {
    this.setVisualProperties({ [property]: value });
  }

  /**
   * Copies provided key/value pairs from provided object into panel visual properties
   * Triggers update handler after all properties have been set.
   * @param {Object.<string,*>} [props = {}]
   */
  setVisualProperties(props/*: { [key: string]: any }*/ = {})/*: void*/ {
    for (let prop in props) if (props.hasOwnProperty(prop)) {
      this.vprops[prop] = props[prop];
    }

    this.save();
  }

  /**
   * Retrieves a specific named panel visual property.
   * @param {string} property
   * @return {*}
   */
  get(property/*: string*/)/*: any*/ {
    return this.vprops[property];
  }

  /**
   * Retrieves an object map containing all panel properties.
   * The returned object is a shallow copy of the underlying data structure.
   * @return {Object.<string,*>}
   */
  getVisualProperties()/*: { [key: string]: any }*/ {
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

  /**
   * Activates the panel in the workspace by raising it to the top of the panel stack.
   * @see Workspace#activatePanel
   */
  activate()/*: void*/ {
    this.workspace.activatePanel(this);
  }

  /**
   * Notifies the update handler of potential updates to this panel.
   */
  save()/*: void*/ {
    if (this.updateHandler) {
      this.updateHandler(this);
    }
  }
}

/**
 * @callback Panel~UpdateHandler
 * @param {Panel} panel
 */

export { Panel };
