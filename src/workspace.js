// @flow

import { Panel } from './panel';
/*:: import { PanelType } from './panel-type';*/

class Workspace {
  /*:: id: string;*/
  /*:: title: string;*/
  /*:: panels: {[key: string]: Panel};*/

  /**
   * @param {string} id
   */
  constructor(id/*: string*/) {
    /** @type {string} */
    this.id = id;

    /**@type {string} */
    this.title = 'Untitled';

    /** @type {Object.<String,Panel>} */
    this.panels = {};
  }

  /**
   * Instantiates a new panel of the given type definition
   * @param {string} id
   * @param {PanelType} panelType
   * @return {Panel}
   */
  createPanel(id/*:string*/, panelType/*: PanelType*/)/*: Panel*/ {
    let panel = new Panel(id, panelType, this);
    this.panels[panel.id] = panel;
    return panel;
  }

  /**
   * Removes the specified panel from this workspace if it exists
   * @param {Panel} panel
   */
  removePanel(panel/*: Panel*/)/*: void*/ {
    if (this.panels.hasOwnProperty(panel.id)) {
      delete this.panels[panel.id];
    }
  }
}

export { Workspace };
