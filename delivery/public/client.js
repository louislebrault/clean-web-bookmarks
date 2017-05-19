let addButton = document.getElementById('addButton')
let addInput = document.getElementById('addInput')
let container = document.getElementById('container')

addButton.onclick = e => {
  const req = new XMLHttpRequest();
  req.onloadend = e => {
    console.log(req.response)
    appendResponse(req.response)
  }
  req.open('POST', 'http://localhost:8080/add', true);
  let val = addInput.value
  req.send(val);
}

const appendResponse = res => {
  console.log(res)
  container.innerHTML += res
}
