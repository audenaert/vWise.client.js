import { PanelContentMediator } from './panel-content-mediator';
import { PanelContentMediatorRegistry } from './panel-content-mediator-registry';
import { expect } from 'chai';

class TestMediator extends PanelContentMediator {
  constructor(id, matchString) {
    super(id, `Test Mediator (${id})`);
    this.matchString = matchString || id;
  }

  matches(obj) {
    return obj === this.matchString;
  }
}

describe('PanelContentMediatorRegistry', function () {
  const mediator0 = new PanelContentMediator('test0', 'Test Mediator 0');
  const mediator1 = new PanelContentMediator('test1', 'Test Mediator 1');
  let registry;

  beforeEach(function () {
    registry = new PanelContentMediatorRegistry();
  });

  describe('#register', function () {
    it('should fail to register invalid panel definition', function () {
      (() => registry.register({})).should.throw();
    });

    it('should correctly register a valid panel definition', function () {
      expect(() => registry.register(mediator0)).to.not.throw();
    });

    it('should fail to register a panel definition with a duplicate typeId', function () {
      registry.register(mediator0);
      expect(() => registry.register(mediator0)).to.throw();
    });
  });

  describe('#getMediator', function () {
    it('should get a panel type by typeId', function () {
      registry.register(mediator0);
      expect(registry.getMediator(mediator0.id)).to.deep.equal(mediator0);
    });

    it('should fail if no panel with the given typeId has been registered', function () {
      expect(() => registry.getMediator('foo')).to.throw();
    });
  });

  describe('#getMediators', function () {
    it('should return an array of all registered panel types', function () {
      registry.register(mediator0);
      registry.register(mediator1);
      let mediators = registry.getMediators();

      mediators.should.be.ok;
      mediators.should.be.an('array');
      mediators.should.not.be.empty;
      mediators.should.have.lengthOf(2);
      mediators.should.contain(mediator0);
      mediators.should.contain(mediator1);
    });
  });

  describe('#remove', function () {
    it('should not do anything if the given typeId is not registered', function () {
      registry.register(mediator0);
      registry.register(mediator1);

      registry.getMediators().should.have.lengthOf(2);

      registry.remove('foo');

      registry.getMediators().should.have.lengthOf(2);
    });

    it('should remove the panel registration with the given typeId', function () {
      registry.register(mediator0);
      registry.register(mediator1);

      registry.getMediators().should.have.lengthOf(2);

      registry.remove(mediator0.id);

      let mediators = registry.getMediators();
      mediators.should.have.lengthOf(1);
      mediators.should.contain(mediator1);
      mediators.should.not.contain(mediator0);

      expect(() => registry.getPanelType(mediator0.id)).to.throw();
    });
  });

  describe('#findContentMediators', function () {
    it('should return a list of mediators for which #matches returns true', function () {
      registry.register(new TestMediator('foo'));
      registry.register(new TestMediator('bar'))
      let mediators = registry.findContentMediators('foo');

      mediators.should.be.an('array');
      mediators.should.not.be.empty;
      mediators.should.have.lengthOf(1);
    });

    it('should return an empty list if none can handle object', function () {
      registry.register(new TestMediator('foo'));
      registry.register(new TestMediator('bar'));
      let mediators = registry.findContentMediators('baz');

      mediators.should.be.an('array');
      mediators.should.be.empty;
    });
  });
});
