import { PanelRegistration } from './panel-registration';
import { expect } from 'chai';
import sinon from 'sinon';

describe('PanelRegistration', function () {
  describe('#constructor', function () {
    it('should properly populate fields', function () {
      let def = {
        id: 'test',
        typeId: 'hello',
        title: 'Hello, World!',
        description: 'This is a test panel definition.',
        priority: 3,
        contentType: 'application/xml',
        matches: noop,
        initPanelData: noop
      };

      let reg = new PanelRegistration(def);

      reg.id.should.equal(def.id);
      reg.typeId.should.equal(def.typeId);
      reg.title.should.equal(def.title);
      reg.description.should.equal(def.description);
      reg.priority.should.equal(def.priority);
      reg.contentType.should.equal(def.contentType);
    });

    it('should use defaults where appropriate', function () {
      let def = {
        id: 'test',
        typeId: 'hello',
        matches: noop,
        initPanelData: noop
      };

      let reg = new PanelRegistration(def);

      reg.title.should.equal(def.typeId);
      reg.description.should.equal('');
      reg.priority.should.equal(1);
      reg.contentType.should.equal('application/json');
    });

    it('should throw an error if an invalid definition is provided', function () {
      (() => new PanelRegistration({})).should.throw();
    });
  });

  describe('#matches', function () {
    it('should delegate to the underlying definition', function () {
      let callback = sinon.spy();
      let def = {
        id: 'test',
        typeId: 'test',
        matches: callback,
        initPanelData: noop
      };

      let reg = new PanelRegistration(def);
      reg.matches();

      expect(callback.called).to.be.true;
    });
  });

  describe('#initPanelData', function () {
    it('should delegate to the underlying definition', function () {
      let callback = sinon.spy();
      let def = {
        id: 'test',
        typeId: 'hello',
        matches: () => {},
        initPanelData: callback
      };

      let reg = new PanelRegistration(def);
      reg.initPanelData();

      expect(callback.called).to.be.true;
    });
  });

  describe('static #validatePanelDefinition', function () {
    it('should validate a proper panel definition', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.true;
    });

    it('should mark a panel definition without an id as invalid', function () {
      let def = {
        typeId: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without a typeId as invalid', function () {
      let def = {
        id: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without a matches callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        initPanelData: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });

    it('should mark a panel definition with a non-callable matches callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: 'hello',
        initPanelData: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without an initPanelData callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });

    it('should mark a panel definition with a non-callable initPanelData callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop,
        initPanelData: 5
      };

      expect(PanelRegistration.validatePanelDefinition(def)).to.be.false;
    });
  });
});

function noop() {}
