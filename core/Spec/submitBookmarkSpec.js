const sinon = require('sinon')
const submitBookmark = require('../Interactor/Interactor').submitBookmark

describe('Bookmark submission', () => {
  it('responds that bookmark were added correctly if url is valid', async () =>{

    const options = Object.assign(defaultOptions, {
      isUrlValid: () => true,
      respondSuccess: sinon.spy()
    })
    await submitBookmark(options)
    sinon.assert.calledOnce(options.respondSuccess)
  })
})

const defaultOptions = {
  url: 'http://lemonde.fr',
  bookmark: {},
  isUrlValid: () => false,
  addBookmark: () => {},
  requestTitle: () => {},
  respondSuccess: () => {},
  respondFailure: () => {}
}
