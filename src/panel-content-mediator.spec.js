import { PanelContentMediator } from './panel-content-mediator';
import { expect } from 'chai';

describe('PanelContentMediator (base class)', function () {
  describe('#constructor', function () {
    it('should properly populate fields', function () {
      let id = 'test';
      let title = 'Hello, World!';
      let description = 'This is a test panel definition.';

      let mediator = new PanelContentMediator(id, title, description);

      mediator.id.should.equal(id);
      mediator.title.should.equal(title);
      mediator.description.should.equal(description);
    });

    it('should use defaults where appropriate', function () {
      let id = 'test';
      let mediator = new PanelContentMediator(id);

      mediator.id.should.equal(id);
      mediator.title.should.equal(id);
      expect(mediator.description).to.be.empty;
    });
  });

  describe('#matches', function () {
    it('should return false by default', function () {
      let mediator = new PanelContentMediator('test');
      expect(mediator.matches({})).to.be.false;
    });
  });

  describe('#initPanelData', function () {
    it('should pass-through by default', function () {
      let mediator = new PanelContentMediator('test');
      let obj = { hello: 'world' };
      return mediator.initPanelData(obj).then(o => o.should.deep.equal(obj));
    });
  });

  describe('#marshall', function () {
    it('should pass-through by default', function () {
      let mediator = new PanelContentMediator('test');
      let obj = { hello: 'world' };
      mediator.marshall(obj).should.deep.equal(obj);
    });
  });

  describe('#unmarshall', function () {
    it('should pass-through by default', function () {
      let mediator = new PanelContentMediator('test');
      let obj = { hello: 'world' };
      return mediator.unmarshall(obj).then(o => o.should.deep.equal(obj));
    });
  });

  describe('#getTemplate', function () {
    it('should return an angular json serialization template by default', function () {
      let mediator = new PanelContentMediator('test');
      mediator.getTemplate().should.equal('{{content|json}}');
    });
  });
});
