// @flow

/*:: import { Workspace } from '../workspace';*/
/*:: import { Panel } from '../panel';*/
/*:: import { PanelContentMediator } from '../panel-content-mediator';*/

/**
 * @interface
 */
class WorkspaceRepository {
  /**
   * Creates a new workspace and persists it to the underlying storage mechanism.
   * The $promise property on the returned Workspace will resolve to the Workspace once it has been saved.
   * @abstract
   * @return {Promise.<Workspace>}
   */
  createWorkspace()/*: Promise<Workspace>*/ {
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
   * Retrieves a saved workspace
   * @abstract
   * @param {string} id
   * @return {Promise.<Workspace>}
   */
  getWorkspace(/*:: id: string*/)/*: Promise<Workspace>*/ {
    throw new Error('not implemented');
  }

  /**
   * Creates and saves a new panel instance
   * @abstract
   * @param {string} id
   * @param {PanelContentMediator} type
   * @param {Workspace} workspace
   * @return {Promise.<Panel>}
   */
  createPanel(/*:: type: PanelContentMediator, workspace: Workspace*/)/*: Promise<Panel>*/ {
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

  /**
   * Retrieves a saved panel within the provided workspace
   * @abstract
   * @param {string} id
   * @return {Promise.<Panel>}
   */
  getPanel(/*:: workspace: Workspace, id: string*/)/*: Promise<Panel>*/ {
    throw new Error('not implemented');
  }
}

export { WorkspaceRepository };
