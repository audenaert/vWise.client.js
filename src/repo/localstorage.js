// @flow

import * as UUID from '../uuid';
import { WorkspaceRepository } from './workspace-repository';
import { Workspace } from '../workspace';
import { Panel } from '../panel';
/*:: import { PanelContentMediator } from '../panel-content-mediator';*/
/*:: import { PanelContentMediatorRegistry } from '../panel-content-mediator-registry';*/

const WORKSPACE_IDS_KEY/*: string*/ = 'workspace_ids';
const WORKSPACE_PREFIX/*: string*/ = 'workspace';

const PANEL_PREFIX/*: string*/ = 'panel';

/**
 * @implements {WorkspaceRepository}
 */
class LocalStorageWorkspaceRepository extends WorkspaceRepository {
  /*:: workspaceIds: string[];*/
  /*:: mediatorRegistry: PanelContentMediatorRegistry;*/
  /*:: _panelCache: { [key: string]: Panel };*/
  /*:: _workspaceCache: { [key: string]: Workspace };*/

  constructor(panelTypeRegistry/*: PanelContentMediatorRegistry*/) {
    super();

    if (!localStorage) {
      throw new Error('LocalStorage is not supported on this browser');
    }

    /** @type {PanelContentMediatorRegistry} */
    this.mediatorRegistry = panelTypeRegistry;

    /**
     * @private
     * @type {Object.<string,Panel>}
     */
    this._panelCache = {};

    /**
     * @private
     * @type {Object.<string, Workspace>}
     */
    this._workspaceCache = {};

    /**
     * An array containing all stored workspace ids
     * @type {string[]}
     */
    let storedWorkspaceIds = localStorage.getItem(WORKSPACE_IDS_KEY);
    this.workspaceIds = storedWorkspaceIds ? JSON.parse(storedWorkspaceIds) : [];
  }

  /**
   * @inheritdoc
   */
  createWorkspace(title/*: ?string */ = null)/*: Promise<Workspace>*/ {
    let id = UUID.uuid4();
    let workspace = new Workspace(id, this);

    if (title) {
      workspace.title = title;
    }

    return this.saveWorkspace(workspace);
  }

  /**
   * @inheritdoc
   */
  saveWorkspace(workspace/*: Workspace*/)/*: Promise<Workspace>*/ {
    let dto = workspace.serialize();
    localStorage.setItem(WORKSPACE_PREFIX + workspace.id, JSON.stringify(dto));

    if (this.workspaceIds.indexOf(workspace.id) < 0) {
      this.workspaceIds.push(workspace.id);
      this.sync();
    }

    return Promise.resolve(workspace);
  }

  /**
   * @inheritdoc
   */
  getWorkspace(id/*: string*/)/*: Promise<Workspace>*/ {
    if (this._workspaceCache[id]) {
      return Promise.resolve(this._workspaceCache[id]);
    }

    let dtoJson = localStorage.getItem(WORKSPACE_PREFIX + id);

    if (!dtoJson) {
      return Promise.reject(new Error(`Unable to find workspace with id ${id}`));
    }

    let dto = JSON.parse(dtoJson);
    let workspace = new Workspace(dto.id, this);
    this._workspaceCache[dto.id] = workspace;
    workspace.deserialize(dto);

    return Promise.resolve(workspace);
  }

  /**
   * @inheritdoc
   */
  createPanel(mediator/*: PanelContentMediator*/, workspace/*: Workspace*/)/*: Promise<Panel>*/ {
    let id = UUID.uuid4();
    let panel = new Panel(id, mediator, workspace, () => { this.savePanel(panel) });

    this.savePanel(panel);

    return Promise.resolve(panel);
  }

  /**
   * @inheritdoc
   */
  savePanel(panel/*: Panel*/)/*: Promise<Panel>*/ {
    let dto = panel.serialize();
    localStorage.setItem(PANEL_PREFIX + panel.id, JSON.stringify(dto));
    return Promise.resolve(panel);
  }

  /**
   * @inheritdoc
   */
  getPanel(workspace/*: Workspace*/, id/*: string*/)/*: Promise<Panel>*/ {
    if (this._panelCache[id]) {
      return Promise.resolve(this._panelCache[id]);
    }

    let dtoJson = localStorage.getItem(PANEL_PREFIX + id);

    if (!dtoJson) {
      return Promise.reject(new Error(`Unable to find panel with id ${id}.`));
    }

    let dto = JSON.parse(dtoJson);

    // HACK not sure how else to get these for rehydration...
    let type = this.mediatorRegistry.getMediator(dto.typeId);
    let workspaceP = this.getWorkspace(dto.workspaceId);

    return workspaceP.then((workspace) => {
      let panel = new Panel(dto.id, type, workspace, () => { this.savePanel(panel); });
      this._panelCache[panel.id] = panel;
      panel.deserialize(dto);

      return panel;
    });
  }

  sync() {
    localStorage.setItem(WORKSPACE_IDS_KEY, JSON.stringify(this.workspaceIds));
  }
}

export { LocalStorageWorkspaceRepository };
