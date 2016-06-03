// @flow

/*:: import { Panel } from './panel';*/
/*:: import { PanelContentMediator } from './panel-content-mediator';*/
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
   * @param {PanelContentMediator} contentMediator
   * @return {Promise.<Panel>}
   */
  createPanel/*:: <T>*/(contentMediator/*: PanelContentMediator*/, panelContent/*: T*/)/*: Promise<Panel<T>>*/ {
    let panelP = this.repo.createPanel(contentMediator, this, panelContent);

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
}

/**
 * @callback {Workspace~UpdateHandler}
 * @param {Workspace} workspace
 * @param {Panel} panel
 */

export { Workspace };
