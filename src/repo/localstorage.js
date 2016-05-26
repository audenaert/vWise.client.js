// @flow

import * as UUID from '../uuid';
import { WorkspaceRepository } from './workspace-repository';
import { Workspace } from '../workspace';
/*:: import { Panel } from '../panel';*/

const WORKSPACE_IDS_KEY/*: string*/ = 'workspace_ids';
const WORKSPACE_PREFIX/*: string*/ = 'workspace';

const PANEL_PREFIX/*: string*/ = 'panel';

/**
 * @implements {WorkspaceRepository}
 */
class LocalStorageWorkspaceRepository extends WorkspaceRepository {
  /*:: workspaceIds: string[];*/

  constructor() {
    super();

    if (!localStorage) {
      throw new Error('LocalStorage is not supported on this browser');
    }

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
    localStorage.setItem(`${WORKSPACE_PREFIX}${workspace.id}`, JSON.stringify(workspace));

    if (this.workspaceIds.indexOf(workspace.id) < 0) {
      this.workspaceIds.push(workspace.id);
      this.sync();
    }

    return Promise.resolve(workspace);
  }

  /**
   * @inheritdoc
   */
  savePanel(panel/*: Panel*/)/*: Promise<Panel>*/ {
    localStorage.setItem(`${PANEL_PREFIX}${panel.id}`, JSON.stringify(panel));
    return Promise.resolve(panel);
  }

  sync() {
    localStorage.setItem(WORKSPACE_IDS_KEY, JSON.stringify(this.workspaceIds));
  }
}

export { LocalStorageWorkspaceRepository };
