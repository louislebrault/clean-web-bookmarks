const sinon = require ('sinon')
const createBookmark = require ('../../interactors/createBookmark').createBookmark

describe('createBookmark interactor', () => {

  describe('createBookmark', () => {
    it('should return a bookmark', async () => {
      // ici il faut verifier les attributs indispensable : id, url, date, favIcon
      // et le titre si il a été envoyé en parametre
    })

    it('should throw an error with wrong params', async() => {

    })
  })

  describe('validateRequest', () => {
    it('should return true with valid params', () => {

    })

    it('should throw an error with wrong params', () => {

    })
  })

  describe('validateRequestShape', () => {
    it('should return true with valid params', () => {

    })

    it('should throw an error if too much params', () => {

    })

    it('should throw an error if not enought', () => {

    })

    it('should throw an error if params names are wrong', () => {

    })
  })

  describe('validatePlug', () => {
    it('should return true with valid params', () => {

    })
    it('should throw an error if params are missing', () => {

    })
  })

})
