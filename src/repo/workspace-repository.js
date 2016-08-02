// @flow

import { Panel } from '../panel';
import { Workspace } from '../workspace';
/*:: import { PanelContentMediator } from '../panel-content-mediator';*/
/*:: import { PanelContentMediatorRegistry } from '../panel-content-mediator-registry';*/

/**
 * @interface
 */
class WorkspaceRepository {
  /*:: mediatorRegistry: PanelContentMediatorRegistry;*/

  constructor(mediatorRegistry/*: PanelContentMediatorRegistry*/) {
    /** @type {PanelContentMediatorRegistry} */
    this.mediatorRegistry = mediatorRegistry;
  }

  /**
   * Creates a new workspace and persists it to the underlying storage mechanism.
   * The $promise property on the returned Workspace will resolve to the Workspace once it has been saved.
   * @abstract
   * @return {Promise.<Workspace>}
   */
  createWorkspace()/*: Promise<Workspace>*/ {
    throw new Error('WorkspaceRepository#createWorkspace not implemented');
  }

  /**
   * Saves the workspace to the persitence layer.
   * @abstract
   * @param {Workspace} workspace
   * @return {Promise.<Workspace>}
   */
  saveWorkspace(/*:: workspace: Workspace*/)/*: Promise<Workspace>*/ {
    throw new Error('WorkspaceRepository#saveWorkspace not implemented');
  }

  /**
   * Retrieves a saved workspace
   * @abstract
   * @param {string} id
   * @return {Promise.<Workspace>}
   */
  getWorkspace(/*:: id: string*/)/*: Promise<Workspace>*/ {
    throw new Error('WorkspaceRepository#getWorkspace not implemented');
  }

  /**
   * Removes a saved workspace
   * @abstract
   * @param {string} id
   * @return {Promise}
   */
  removeWorkspace(/*:: workspace: Workspace*/)/*: Promise*/ {
    throw new Error('WorkspaceRepository#removeWorkspace not implemented');
  }

  /**
   * Creates and saves a new panel instance
   * @abstract
   * @param {string} id
   * @param {PanelContentMediator} type
   * @param {Workspace} workspace
   * @param {Object} [vprops]
   * @return {Promise.<Panel>}
   */
  createPanel/*:: <T>*/(/*:: type: PanelContentMediator, workspace: Workspace, panelContent: T, vprops: ?{ [key: string]: string }*/)/*: Promise<Panel<T>>*/ {
    throw new Error('WorkspaceRepository#createPanel not implemented');
  }

  /**
   * Saves the provided panel to the persistence layer
   * @abstract
   * @param {Panel} panel
   * @return {Promise.<Panel>}
   */
  savePanel(/*:: panel: Panel*/)/*: Promise<Panel>*/ {
    throw new Error('WorkspaceRepository#savePanel not implemented');
  }

  /**
   * Retrieves a saved panel within the provided workspace
   * @abstract
   * @param {string} panelId
   * @param {Workspace} workspace
   * @return {Promise.<Panel>}
   */
  getPanel(/*:: panelId: string, workspace: Workspace*/)/*: Promise<Panel>*/ {
    throw new Error('WorkspaceRepository#getPanel not implemented');
  }

  /**
   * Removes a saved panel
   * @abstract
   * @param {string} id
   * @param {Workspace} workspace
   * @return {Promise}
   */
  removePanel(/*:: panel: Panel, workspace: Workspace*/)/*: Promise*/ {
    throw new Error('WorkspaceRepository#removePanel not implemented');
  }

  /**
   * Marshalls a {@link Panel} instance into a simplified DTO for persistence.
   * @private
   * @param  {Panel} panel
   * @return {Object}
   */
  marshallPanel(panel/*: Panel*/)/*: Object*/ {
    let dto = {};

    dto.id = panel.id;
    dto.mediatorId = panel.contentMediator.id;
    dto.workspaceId = panel.workspace.id;
    dto.vprops = panel.getVisualProperties();
    dto.content = panel.contentMediator.marshall(panel.content);

    return dto;
  }

  /**
   * Repopulates panel data from a marshalled DTO.
   * @param  {Object} dto
   * @param  {Workspace} workspace
   * @return {Promise.<Panel>}
   */
  unmarshallPanel(dto/*: Object*/, workspace/*: Workspace*/)/*: Promise<Panel>*/ {
    let mediator = this.mediatorRegistry.getMediator(dto.mediatorId);
    let contentP = mediator.unmarshall(dto.content);

    let panelP = contentP.then(content => {
      let panel = new Panel(dto.id, mediator, workspace, content, dto.vprops, p => { this.savePanel(p); });
      return panel;
    });

    return panelP;
  }

  /**
   * Marshalls a workspace into a simplified object suitable for persistence.
   * @param {Workspace} workspace
   * @return {Object}
   */
  marshallWorkspace(workspace/*: Workspace*/)/*: Object*/ {
    return {
      id: workspace.id,
      title: workspace.title,
      panels: workspace.panelStack.map(p => p.id)
    };
  }

  /**
   * Restores a workspace from its marshalled DTO
   * @param {Object} dto
   * @return {Promise.<Workspace>}
   */
  unmarshallWorkspace(dto/*: Object*/)/*: Promise<Workspace>*/ {
    let ws = new Workspace(dto.id, this);
    ws.title = dto.title;

    let panelPs = dto.panels.map(id => this.getPanel(ws.id, id).then((p) => ws.panels[id] = p));
    return Promise.all(panelPs).then(() => ws);
  }
}

export { WorkspaceRepository };
