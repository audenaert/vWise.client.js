import { PanelRegistry } from './panel-type-registry';
import { expect } from 'chai';

describe('PanelRegistry', function () {
  let registry;

  const def0 = {
    id: 'panel0',
    typeId: 'type0',
    matches: noop,
    initPanelData: noop
  };

  const def1 = {
    id: 'panel1',
    typeId: 'type0',
    matches: noop,
    initPanelData: noop
  };

  const def2 = {
    id: 'panel2',
    typeId: 'type1',
    matches: noop,
    initPanelData: noop
  };

  beforeEach(function () {
    registry = new PanelRegistry();
  });

  describe('#register', function () {
    it('should fail to register invalid panel definition', function () {
      (() => registry.register({})).should.throw();
    });

    it('should correctly register a valid panel definition', function () {
      let reg = registry.register(def0);
      reg.should.be.ok;
    });

    it('should fail to register a panel definition with a duplicate typeId', function () {
      registry.register(def0);
      (() => registry.register(def1)).should.throw();
    });
  });

  describe('#getPanelType', function () {
    it('should get a panel type by typeId', function () {
      let reg = registry.register(def0);
      expect(registry.getPanelType(def0.typeId)).to.deep.equal(reg);
    });

    it('should fail if no panel with the given typeId has been registered', function () {
      (() => registry.getPanelType('foo')).should.throw();
    });
  });

  describe('#listPanelTypes', function () {
    it('should return an array of all registered panel types', function () {
      registry.register(def0);
      registry.register(def2);
      let panelTypes = registry.listPanelTypes();

      panelTypes.should.be.ok;
      panelTypes.should.be.an('array');
      panelTypes.should.not.be.empty;
      panelTypes.should.have.lengthOf(2);

      let panelTypeIds = panelTypes.map((t) => t.id);
      panelTypeIds.should.contain(def0.id);
      panelTypeIds.should.contain(def2.id);
    });
  });

  describe('#remove', function () {
    it('should not do anything if the given typeId is not registered', function () {
      registry.register(def0);
      registry.register(def2);

      registry.listPanelTypes().should.have.lengthOf(2);

      registry.remove('foo');

      registry.listPanelTypes().should.have.lengthOf(2);
    });

    it('should remove the panel registration with the given typeId', function () {
      registry.register(def0);
      registry.register(def2);

      registry.listPanelTypes().should.have.lengthOf(2);

      registry.remove(def0.typeId);

      let panelTypes = registry.listPanelTypes();
      panelTypes.should.have.lengthOf(1);

      let panelTypeIds = panelTypes.map((t) => t.id);
      panelTypeIds.should.contain(def2.id);
      panelTypeIds.should.not.contain(def0.id);

      (() => registry.getPanelType(def0.id)).should.throw();
    });
  });
});


function noop() {}
