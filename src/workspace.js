// @flow

/*:: import { Panel } from './panel';*/
/*:: import { PanelType } from './panel-type';*/
/*:: import { WorkspaceRepository } from './repo/workspace-repository';*/

class Workspace {
  /*:: id: string;*/
  /*:: title: string;*/
  /*:: panels: {[key: string]: Panel};*/
  /*:: repo: WorkspaceRepository;*/

  /**
   * @param {string} id
   * @param {Workspace~UpdateHandler} updateHandler
   * @param {WorkspaceRepository} repo
   */
  constructor(id/*: string*/, repo/*: WorkspaceRepository*/) {
    // TODO accept repository / persistence object

    /** @type {string} */
    this.id = id;

    /** @type {WorkspaceRepository} */
    this.repo = repo;

    /**@type {string} */
    this.title = 'Untitled';

    /** @type {Object.<String,Panel>} */
    this.panels = {};
  }

  /**
   * Instantiates a new panel of the given type definition
   * @param {string} id
   * @param {PanelType} panelType
   * @return {Promise.<Panel>}
   */
  createPanel(id/*:string*/, panelType/*: PanelType*/)/*: Promise<Panel>*/ {
    let panelP = this.repo.createPanel(id, panelType, this);

    panelP.then((panel) => {
      this.panels[panel.id] = panel;
    });

    return panelP;
  }

  /**
   * Removes the specified panel from this workspace if it exists
   * @param {Panel} panel
   */
  removePanel(panel/*: Panel*/)/*: void*/ {
    if (this.panels.hasOwnProperty(panel.id)) {
      delete this.panels[panel.id];
      this.repo.saveWorkspace(this);
    }
  }

  /**
   * Serializes a workspace into a simplified object suitable for persistence.
   * @return {Object}
   */
  serialize()/*: Object*/ {
    return {
      id: this.id,
      title: this.title,
      panels: Object.keys(this.panels)
    };
  }

  /**
   * Restores a workspace from its serialized memento
   * @param {Object} memento
   */
  deserialize(memento/*: Object*/)/*: void*/ {
    this.id = memento.id;
    this.title = memento.title;

    this.panels = {};
    for (let panelId of memento.panels) {
      this.repo.getPanel(this, panelId).then((panel) => this.panels[panel.id] = panel);
    }
  }
}

/**
 * @callback {Workspace~UpdateHandler}
 * @param {Workspace} workspace
 * @param {Panel} panel
 */

export { Workspace };
