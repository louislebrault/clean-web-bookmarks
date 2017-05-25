const assert = require('assert')

const validateUrl = require('../../customs/bookmarkCustoms').validateUrl
const validateUrlShape = require('../../customs/bookmarkCustoms').validateUrlShape
const validateUrlPath = require('../../customs/bookmarkCustoms').validateUrlPath
const validateUrlPrefix = require('../../customs/bookmarkCustoms').validateUrlPrefix
const validateTitle = require('../../customs/bookmarkCustoms').validateTitle

describe('bookmarkCustoms', () => {
  const validUrl = {
    path: 'www.lemonde.fr',
    prefix: 'http://'
  }

  describe('validateUrl', () => {

    it('should return true with valid params', () => {
      assert.strictEqual(validateUrl(validUrl), true)
    })

    it('should throw an error with wrong params', () => {
      const missingFieldUrl = {
        url: 'www.lemonde.fr'
      }
      assert.throws(() => validateUrl(missingFieldUrl))
    })

  })

  describe('validateUrlShape', () => {

    it('should return true with valid params', () => {
      assert.strictEqual(validateUrlShape(validUrl), true)
    })

    it('should throw an error if a field is missing', () => {
      const missingFieldUrl = {
        url: 'www.lemonde.fr'
      }
      assert.throws(() => validateUrlShape(missingFieldUrl))
    })

    it('should throw an error if there is too much fields', () => {
      const tooManyFieldsUrl = {
        path: 'www.lemonde.fr',
        prefix: 'http://',
        protocol: 'http'
      }
      assert.throws(() => validateUrlShape(tooManyFieldsUrl))
    })

    it('should throw an error if parameters names are wrong', () => {
      const wrongParamUrl = {
        blip: 'www.lemonde.fr',
        prefix: 'http://',
      }
      assert.throws(() => validateUrlShape(wrongParamUrl))
    })

  })

  describe('validateUrlPath', () => {

    it('should return true with valid params', () => {
      assert.strictEqual(validateUrlPath(validUrl.path), true)
    })

    it('should throw an error if path is not a string', () => {
      const notAString = []
      assert.throws(() => validateUrlPath([]))
    })

    it('should throw an error if path length over 300', () => {
      let tooLongPath = ''
      for (let i = 0; i < 301; i++) {
        tooLongPath += 'z'
      }
      assert.throws(() => validateUrlPath(tooLongPath))
    })
  })

  describe('validateUrlPrefix', () => {

    it('should return true with valid params', () => {
      assert.strictEqual(validateUrlPrefix(validUrl.prefix), true)
    })

    it('should throw an error if prefix is not a string', () => {
      const notAString = {}
      assert.throws(() => validateUrlPrefix(notAString))
    })

    it('should throw an error if prefix length over 30', () => {
      const tooLongPrefix = 'httpssssssssssssssssssssssss://'
      assert.throws(() => validateUrlPrefix(tooLongPrefix))
    })
  })

  describe('validateTitle', () => {
    const validTitle = 'A title to rule them all'

    it('should return true with valid params', () => {
      assert.strictEqual(validateTitle(validTitle), true)
    })

    it('should throw an error if title is not a string', () => {
      const notAString = true
      assert.throws(() => validateTitle(notAString))
    })

    it('should throw an error if title length over 150', () => {
      let tooLongTitle = ''
      for (let i = 0; i < 301; i++) {
        tooLongTitle += 'z'
      }
      assert.throws(() => validateTitle(tooLongTitle))
    })
  })

})
