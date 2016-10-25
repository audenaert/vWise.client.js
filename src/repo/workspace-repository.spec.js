import { Panel } from '../panel';
import { PanelContentMediator } from '../panel-content-mediator';
import { PanelContentMediatorRegistry } from '../panel-content-mediator-registry';
import { Workspace } from '../workspace';
import { WorkspaceRepository } from './workspace-repository';

import { expect } from 'chai';
import sinon from 'sinon';

const mediator = new PanelContentMediator('hello', 'Hello, World!', 'This is a test panel definition.');

const mediatorRegistry = new PanelContentMediatorRegistry();
mediatorRegistry.register(mediator);

describe('WorkspaceRepository', function () {
  let repo;
  let workspace;

  beforeEach(function () {
    repo = new WorkspaceRepository(mediatorRegistry);
    workspace = new Workspace('test', repo);
  });

  describe('#marshallPanel', function () {
    it('should return an object that can be serialized into JSON and back', function () {
      let panel = new Panel('test', mediator, workspace, { hello: 'world' });
      let dto0 = repo.marshallPanel(panel);
      let dto1 = JSON.parse(JSON.stringify(dto0));

      dto0.should.be.ok;
      dto0.should.deep.equal(dto1);

    });
  });

  describe('#unmarshallPanel', function () {
    it('should repopulate a panel instance with serialized values', function () {
      // unmarshalling a panel calls WorkspaceRepository#getWorkspace
      let panel0 = new Panel('test', mediator, workspace, { hello: 'world' });
      panel0.set('hello', 'world');

      let dto0 = repo.marshallPanel(panel0);
      let dto1 = JSON.parse(JSON.stringify(dto0));

      return repo.unmarshallPanel(dto1, workspace).then(panel1 => {
        comparePanels(panel0, panel1);
      });
    });
  });

  describe('#marshallWorkspace', function () {
    it('should return an object that can be serialized into JSON and back', function () {
      let dto0 = repo.marshallWorkspace(workspace);
      let dto1 = JSON.parse(JSON.stringify(dto0));

      dto0.should.be.ok;
      dto0.should.deep.equal(dto1);
    });
  });

  describe('#unmarshallWorkspace', function () {
    it('should repopulate a workspace instance with serialized values', function () {
      let dto0 = repo.marshallWorkspace(workspace);
      let dto1 = JSON.parse(JSON.stringify(dto0));

      return repo.unmarshallWorkspace(dto1).then(workspace1 => compareWorkspaces(workspace, workspace1));
    });
  });
});


function comparePanels(a, b) {
  expect(a.id).to.equal(b.id);
  expect(a.workspace).to.deep.equal(b.workspace);
  expect(a.contentMediator).to.deep.equal(b.contentMediator);
  expect(a.vprops).to.deep.equal(b.vprops);
  expect(a.content).to.deep.equal(b.content);
}

function compareWorkspaces(a, b) {
  expect(a.id).to.equal(b.id);
  expect(a.title).to.equal(b.title);
}
