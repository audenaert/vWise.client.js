import { Greeter } from './index';
import { expect } from 'chai';

describe('Greeter', function () {
  describe('#greet', function () {
    it('should greet the world by default', function () {
      let greeter = new Greeter();
      expect(greeter.greet()).to.equal('Hello, World!');
    });

    it('should return a personalized greeting', function () {
      let greeter = new Greeter('John');
      expect(greeter.greet()).to.equal('Hello, John!');
    });
  });
});
