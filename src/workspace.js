// @flow

/*:: import { Panel } from './panel';*/
/*:: import { PanelContentMediator } from './panel-content-mediator';*/
/*:: import { WorkspaceRepository } from './repo/workspace-repository';*/

class Workspace {
  /*:: id: string;*/
  /*:: title: string;*/
  /*:: panels: {[key: string]: Panel};*/
  /*:: panelStack: Panel[];*/
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

    /** @type {Object.<string,Panel>} */
    this.panels = {};

    /**
     * Z-ordering of panels, with the top of the stack at the highest index (end of array).
     * If a panel is not a member of this list, then that panel is hidden or "minimized".
     *
     * Note: This property should NOT be used in an ng-repeat directive since ng-repeat tends to
     * destroy and recreate DOM elements when ordering changes, thereby resetting panel contents to
     * an initial state. Use `panels` instead, and rely on the `panel.vprops.zPosition` for that
     * panel's index in the stack.
     *
     * @type {Panel[]}
     */
    this.panelStack = [];
  }

  /**
   * Instantiates a new panel of the given type definition
   * @param {PanelContentMediator} contentMediator
   * @param {Object} panelContent
   * @param {Object} [vprops]
   * @return {Promise.<Panel>}
   */
  createPanel/*:: <T>*/(contentMediator/*: PanelContentMediator*/, panelContent/*: T*/, vprops/*: ?{ [key: string]: string }*/)/*: Promise<Panel<T>>*/ {
    let panelP = this.repo.createPanel(contentMediator, this, panelContent, vprops);

    panelP.then((panel) => {
      this.panels[panel.id] = panel;
      panel.vprops.zPosition = this.panelStack.length;
      this.panelStack.push(panel);
    });

    return panelP;
  }

  /**
   * Removes the specified panel from this workspace if it exists
   * @param {Panel} panel
   */
  removePanel(panel/*: Panel*/)/*: void*/ {
    var queuePersist = false;

    if (this.panels.hasOwnProperty(panel.id)) {
      delete this.panels[panel.id];
      this.repo.removePanel(panel, this);

      queuePersist = true;
    }

    let ix = this.panelStack.indexOf(panel);
    if (ix >= 0) {
      this.panelStack.splice(ix, 1);

      while (ix < this.panelStack.length) {
        let panel = this.panelStack[ix];
        panel.vprops.zPosition = ix;
        this.repo.savePanel(panel);
        ix++;
      }

      queuePersist = true;
    }

    if (queuePersist) {
      this.repo.saveWorkspace(this);
    }
  }

  /**
   * Activates a panel by moving it to the top of the stack
   */
  activatePanel(panel/*: Panel*/)/*: void*/ {
    if (this.panels.hasOwnProperty(panel.id)) {
      let ix = this.panelStack.indexOf(panel);
      if (ix >= 0) {
        this.panelStack.splice(ix, 1);
      }

      this.panelStack.push(panel);

      while (ix < this.panelStack.length) {
        let panel = this.panelStack[ix];
        panel.vprops.zPosition = ix;
        this.repo.savePanel(panel);
        ix++;
      }

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
