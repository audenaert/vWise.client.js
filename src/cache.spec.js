import { expect } from 'chai';
import sinon from 'sinon';
import { Cache } from './cache';

describe('Cache', function () {
  let cache;

  beforeEach(function () {
    cache = new Cache();
  });

  describe('#construct', function () {
    it('should create an empty cache', function () {
      cache._cache.should.be.ok;
      Object.keys(cache._cache).should.be.empty;
    });
  });

  describe('#fetch', function () {
    it('should fail if no key is provided', function () {
      expect(() => cache.fetch()).to.throw();
    });

    it('should fail if no provider is provided', function () {
      expect(() => cache.fetch('foo')).to.throw();
    });

    it('should accept constants as a provider option', function () {
      let value = cache.fetch('hello', 'world');
      expect(value).to.equal('world');
      cache._cache.should.have.property('hello', 'world');
    });

    it('should call provider function on cache miss', function () {
      let stub = sinon.stub().returns('world');
      let value = cache.fetch('hello', stub);

      expect(value).to.equal('world');
      expect(stub.called).to.be.true;
      cache._cache.should.have.property('hello', 'world');
    });

    it('should use the cached value and not call the provider more than once', function () {
      let stub = sinon.stub().returns('world');
      let value0 = cache.fetch('hello', stub);
      let value1 = cache.fetch('hello', stub);

      expect(value0).to.equal('world');
      expect(value1).to.equal('world');
      expect(stub.calledOnce).to.be.true;
      cache._cache.should.have.property('hello', 'world');
    });
  });

  describe('#clear', function () {
    it('should clear the cached value at the provided key', function () {
      cache.fetch('hello', () => 'world');
      cache.fetch('foo', () => 'bar');
      cache._cache.should.have.property('hello', 'world');
      cache._cache.should.have.property('foo', 'bar');
      cache.clear('hello');
      cache._cache.should.not.have.property('hello');
      cache._cache.should.have.property('foo');
    });

    it('should do nothing if no cached value exists for the provided key', function () {
      cache.fetch('foo', () => 'bar');
      cache._cache.should.have.property('foo', 'bar');
      cache.clear('hello');
      cache._cache.should.have.property('foo', 'bar');
    });

    it('should clear the entire cache if no key is provided', function () {
      cache.fetch('hello', () => 'world');
      cache.fetch('foo', () => 'bar');
      cache._cache.should.have.property('hello', 'world');
      cache._cache.should.have.property('foo', 'bar');
      cache.clear();
      cache._cache.should.not.have.property('hello');
      cache._cache.should.not.have.property('foo');
    });
  });
});
