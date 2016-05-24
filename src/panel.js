// @flow

/*:: import { Workspace } from './workspace';*/
/*:: import { PanelType } from './panel-type';*/

/*:: type Vprops = {
  width: number,
  height: number,
  xPosition: number,
  yPosition: number
};*/
/**
 * @typedef Vprops
 * @type {Object}
 * @property {integer} width
 * @property {integer} height
 * @property {integer} xPosition
 * @property {integer} yPosition
 */


class Panel {
  /*:: id: string;*/
  /*:: type: PanelType;*/
  /*:: workspace: Workspace;*/
  /*:: vprops: Vprops;*/
  /*:: content: any;*/

  /**
   * @param {string} id
   * @param {PanelType} type
   * @param {Workspace} workspace
   * @return {Workspace}
   */
  constructor(id/*: string */, type/*: PanelType*/, workspace/*: Workspace*/) {
    /** @type {string} */
    this.id = id;

    /** @type {PanelType} */
    this.type = type;

    /** @type {Workspace} */
    this.workspace = workspace;

    /**
     * Visual display properties
     * @type {Vprops}
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

  setSize(width/*: number*/, height/*: number*/)/*: void*/ {
    this.vprops.width = width;
    this.vprops.height = height;
  }

  setPosition(x/*: number*/, y/*: number*/)/*: void*/ {
    this.vprops.xPosition = x;
    this.vprops.yPosition = y;
  }

  remove()/*: void*/ {
    this.workspace.removePanel(this);
  }
}

export { Panel };
