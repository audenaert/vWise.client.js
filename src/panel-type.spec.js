import { PanelType } from './panel-type';
import { expect } from 'chai';
import sinon from 'sinon';

describe('PanelType', function () {
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

      let reg = new PanelType(def);

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

      let reg = new PanelType(def);

      reg.title.should.equal(def.typeId);
      reg.description.should.equal('');
      reg.priority.should.equal(1);
      reg.contentType.should.equal('application/json');
    });

    it('should throw an error if an invalid definition is provided', function () {
      (() => new PanelType({})).should.throw();
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

      let reg = new PanelType(def);
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

      let reg = new PanelType(def);
      reg.initPanelData();

      expect(callback.called).to.be.true;
    });
  });

  describe('static #validatePanelTypeDefinition', function () {
    it('should validate a proper panel definition', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.true;
    });

    it('should mark a panel definition without an id as invalid', function () {
      let def = {
        typeId: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without a typeId as invalid', function () {
      let def = {
        id: 'test',
        matches: noop,
        initPanelData: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without a matches callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        initPanelData: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });

    it('should mark a panel definition with a non-callable matches callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: 'hello',
        initPanelData: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });

    it('should mark a panel definition without an initPanelData callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });

    it('should mark a panel definition with a non-callable initPanelData callback as invalid', function () {
      let def = {
        id: 'test',
        typeId: 'test',
        matches: noop,
        initPanelData: 5
      };

      expect(PanelType.validatePanelTypeDefinition(def)).to.be.false;
    });
  });
});

function noop() {}
