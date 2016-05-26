// @flow

/*:: import { Workspace } from '../workspace';*/
/*:: import { Panel } from '../panel';*/

/**
 * @interface
 */
class WorkspaceRepository {
  /**
   * Creates a new workspace and persists it to the underlying storage mechanism.
   * The $promise property on the returned Workspace will resolve to the Workspace once it has been saved.
   * @abstract
   * @return {Workspace}
   */
  createWorkspace()/*: Workspace*/ {
    throw new Error('not implemented');
  }

  /**
   * Saves the workspace to the persitence layer.
   * @abstract
   * @param {Workspace} workspace
   * @return {Promise.<Workspace>}
   */
  saveWorkspace(/*:: workspace: Workspace*/)/*: Promise<Workspace>*/ {
    throw new Error('not implemented');
  }

  /**
   * Saves the provided panel to the persistence layer
   * @abstract
   * @param {Panel} panel
   * @return {Promise.<Panel>}
   */
  savePanel(/*:: panel: Panel*/)/*: Promise<Panel>*/ {
    throw new Error('not implemented');
  }
}

export { WorkspaceRepository };
