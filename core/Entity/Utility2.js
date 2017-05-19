// What is Utility's methods become uses cases

// addHttp become formatUrl
formatUrl: async function({
  url,
  defaultPrefix,
  isPrefixMissing,
  addDefaultPrefix,
  respondFormatedUrl,
  respondUnchangedUrl
}){
  if (isPrefixMissing(url)){
    await addDefaultPrefix(url, defaultPrefix)
    await respondFormatedUrl()
  } else {
    await respondUnchangedUrl()
  }
}

requestTitle: async function({
  url,
  response,
  title,
  requestUrl,
  isRequestResponsed,
  findTitleInResponse,
  isTitleFound,
  respondTitle,
  respondTitleNotFound,
  respondRequestNotResponsed
}){
  await requestUrl(url)
  if (isRequestResponsed()){
    await findTitleInResponse(response)
    if (isTitleFound(title)){
      respondTitle()
    } else {
      respondTitleNotFound()
    }
  } else {
    respondRequestNoResponse()
  }
}
