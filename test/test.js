/* global describe, it */
// Need to fix ^this shit at a later stage...

var assert = require('assert')

// This is roughly how we will be writing tests. Take note.
describe('Dummy Test', function () {
  describe('Test 1', function () {
    it('should pass', function () {
      assert.equal(true, true)
    })
  })
})
