// @flow

import * as UUID from '../uuid';
import { Cache } from '../cache';
import { WorkspaceRepository } from './workspace-repository';
import { Workspace } from '../workspace';
import { Panel } from '../panel';
/*:: import { PanelContentMediator } from '../panel-content-mediator';*/
/*:: import { PanelContentMediatorRegistry } from '../panel-content-mediator-registry';*/

const WORKSPACE_IDS_KEY/*: string*/ = 'vwise_workspace_ids';
const WORKSPACE_PREFIX/*: string*/ = 'vwise_workspace';

const PANEL_IDS_KEY/*: string*/ = 'vwise_panel_ids';
const PANEL_PREFIX/*: string*/ = 'vwise_panel';

/**
 * @implements {WorkspaceRepository}
 */
class LocalStorageWorkspaceRepository extends WorkspaceRepository {
  /*:: workspaceIds: string[];*/
  /*:: panelIds: string[];*/
  /*:: _panelCache: Cache<Promise<Panel>>;*/
  /*:: _workspaceCache: Cache<Promise<Workspace>>;*/

  constructor(mediatorRegistry/*: PanelContentMediatorRegistry*/) {
    super(mediatorRegistry);

    if (!localStorage) {
      throw new Error('LocalStorage is not supported on this browser');
    }

    /**
     * @private
     * @type {Cache.<Promise.<Panel>>}
     */
    this._panelCache = new Cache();

    /**
     * @private
     * @type {Cache.<Promise.<Workspace>>}
     */
    this._workspaceCache = new Cache();

    let storedWorkspaceIds = localStorage.getItem(WORKSPACE_IDS_KEY);
    /**
     * An array containing all stored workspace ids
     * @type {string[]}
     */
    this.workspaceIds = storedWorkspaceIds ? JSON.parse(storedWorkspaceIds) : [];

    let storedPanelIds = localStorage.getItem(PANEL_IDS_KEY);
    /**
     * An array containing all stored panel ids
     * @type {string[]}
     */
    this.panelIds = storedPanelIds ? JSON.parse(storedPanelIds) : [];
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
    let dto = this.marshallWorkspace(workspace);
    let id = workspace.id;
    localStorage.setItem(WORKSPACE_PREFIX + id, JSON.stringify(dto));

    let promise = Promise.resolve(workspace);

    if (this.workspaceIds.indexOf(id) < 0) {
      // promise should not exist in cache since we've never seen this instance before
      // if one does exist, we have problems... override that instance with the one we're saving
      this._workspaceCache.fetch(id, promise);
      this.workspaceIds.push(id);
      this.sync();
    }

    return promise;
  }

  /**
   * @inheritdoc
   */
  getWorkspace(id/*: string*/)/*: Promise<Workspace>*/ {
    return this._workspaceCache.fetch(id, () => {
      let json = localStorage.getItem(WORKSPACE_PREFIX + id);

      if (!json) {
        return Promise.reject(new Error(`Unable to find workspace with id ${id}`));
      }

      let dto = JSON.parse(json);
      let workspaceP = this.unmarshallWorkspace(dto);
      workspaceP.catch(() => this._workspaceCache.clear(id));
      return workspaceP;
    });
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
    let dto = this.marshallPanel(panel);
    localStorage.setItem(PANEL_PREFIX + panel.id, JSON.stringify(dto));
    return Promise.resolve(panel);
  }

  /**
   * @inheritdoc
   */
  getPanel(workspace/*: Workspace*/, id/*: string*/)/*: Promise<Panel>*/ {
    return this._panelCache.fetch(id, () => {
      let json = localStorage.getItem(PANEL_PREFIX + id);

      if (!json) {
        return Promise.reject(new Error(`Unable to find panel with id ${id}.`));
      }

      let dto = JSON.parse(json);
      let panelP = this.unmarshallPanel(dto);
      panelP.catch(() => this._panelCache.clear(id));
      return panelP;
    });
  }

  /**
   * Synchronize local state with the data in localStorage
   */
  sync() {
    localStorage.setItem(WORKSPACE_IDS_KEY, JSON.stringify(this.workspaceIds));
  }

  /**
   * Delete all stored data and reset the repository to an empty state
   */
  reset() {
    for (let id of this.workspaceIds) {
      localStorage.removeItem(WORKSPACE_PREFIX + id);
    }

    localStorage.removeItem(WORKSPACE_IDS_KEY);

    this.workspaceIds = [];
    this._workspaceCache.clear();

    for (let id of this.panelIds) {
      localStorage.removeItem(PANEL_PREFIX + id);
    }

    localStorage.removeItem(PANEL_IDS_KEY);

    this.panelIds = [];
    this._panelCache.clear();
  }
}

export { LocalStorageWorkspaceRepository };
