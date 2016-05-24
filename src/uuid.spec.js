import * as UUID from './uuid';

describe('UUID', function () {
  describe('#uuid4', function () {
    it('should return a valid version 4 UUID', function () {
      let uuid = UUID.uuid4();
      uuid.should.match(/^[0-9a-f]{8}(?:-[0-9a-f]{4}){4}[0-9a-f]{8}$/);
    })
  })
})
