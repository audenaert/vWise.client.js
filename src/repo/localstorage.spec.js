import { expect } from 'chai';

import { LocalStorageWorkspaceRepository } from './localstorage';
import { PanelContentMediator } from '../panel-content-mediator';
import { PanelContentMediatorRegistry } from '../panel-content-mediator-registry';
import { Workspace } from '../workspace';

describe('LocalStorageWorkspaceRepository', function () {
  let mediatorRegistry = new PanelContentMediatorRegistry();
  let mediator = new PanelContentMediator('test');
  let repo;

  mediatorRegistry.register(mediator);

  beforeEach(function () {
    repo = new LocalStorageWorkspaceRepository(mediatorRegistry);
    repo.reset();
  });

  describe('#constructor', function () {
    it('should populate empty storage with default values', function () {
      let repo = new LocalStorageWorkspaceRepository(mediatorRegistry);
      repo.mediatorRegistry.should.deep.equal(mediatorRegistry);
      repo.workspaceIds.should.be.an('array');
      repo.workspaceIds.should.be.empty;
      repo.panelIds.should.be.an('array');
      repo.panelIds.should.be.empty;
    });

    it('should automatically load saved data', function () {
      let repo = new LocalStorageWorkspaceRepository(mediatorRegistry);
      repo.createWorkspace();

      let repo2 = new LocalStorageWorkspaceRepository(mediatorRegistry);
      repo2.workspaceIds.should.not.be.empty;
    });
  });

  describe('#createWorkspace', function () {
    it('should create a workspace', function () {
      let workspaceP = repo.createWorkspace();

      return workspaceP.then(workspace => {
        workspace.should.be.ok;
        workspace.should.be.an.instanceof(Workspace);
      });
    });

    it('should persist the created workspace preemptively', function () {
      let workspaceP = repo.createWorkspace();

      return workspaceP.then(workspace => {
        repo.workspaceIds.should.not.be.empty;
        repo.workspaceIds.should.have.lengthOf(1);
        repo.workspaceIds.should.contain(workspace.id);
      });
    });
  });

  describe('#saveWorkspace', function () {
    it('should save a workspace for later retrieval in the same repository instance', function () {
      const title0 = 'test0';
      const title1 = 'test1';

      return repo.createWorkspace(title0)
        .then(workspace => {
          workspace.title.should.equal(title0);
          workspace.title = title1;
          return repo.saveWorkspace(workspace);
        })
        .then(({id}) => repo.getWorkspace(id))
        .then(workspace => {
          workspace.title.should.equal(title1);
        });
    });

    it('should save a workspace for later retrieval by a separate instance', function () {
      const title0 = 'test0';
      const title1 = 'test1';

      return repo.createWorkspace(title0)
        .then(workspace => {
          workspace.title.should.equal(title0);
          workspace.title = title1;
          return repo.saveWorkspace(workspace);
        })
        .then(({id}) => {
          // create a new repository to load saved workspace from localStorage instead of cache
          let newRepo = new LocalStorageWorkspaceRepository(mediatorRegistry);
          return newRepo.getWorkspace(id);
        })
        .then(workspace => {
          workspace.title.should.equal(title1);
        });
    });
  });

  describe('#getWorkspace', function () {
    it('should retrieve a workspace by id', function () {
      let idP = repo.createWorkspace().then(({id}) => id);
      let workspaceP = idP.then(id => repo.getWorkspace(id));

      return Promise.all([idP, workspaceP]).then(([id, workspace]) => {
        expect(workspace).to.be.ok;
        expect(workspace.id).to.equal(id);
      });
    });

    it('should retrieve the same instance of a workspace with the same id', function () {
      const title0 = 'foo';
      const title1 = 'bar';

      let workspace0P = repo.createWorkspace(title0);
      let workspace1P = workspace0P.then(({id}) => repo.getWorkspace(id));

      return Promise.all([workspace0P, workspace1P]).then(([workspace0, workspace1]) => {
        workspace0.title = title1;
        expect(workspace1.title).to.equal(title1);
      });
    });
  });

  describe('#createPanel', function () {
    it('should create a panel on the provided workspace');
    it('should persist the created panel preemptively');
  });

  describe('#savePanel', function () {
    it('should save a panel for later retrieval in the same repository instance');
    it('should save a panel for later retrieval by a separate instance');
  });

  describe('#getPanel', function () {
    it('should retrieve a panel by id');
    it('should retrieve the same instance of a panel with the same id');
  });
});
