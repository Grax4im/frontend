//Itens
const buttonSubmit = document.getElementById('submit')
const inputName = document.getElementById('name')
const inputPassword = document.getElementById('password')
const table = document.querySelector('.allTable')
const difficultTable = document.querySelector('.difficultTable')
const ballsTable = document.querySelector('.ballsTable')
const getAll = document.getElementById('getAll')
const showAll = document.querySelector('.showAll')
const login = document.querySelector('.login')
const anotherLogin = document.getElementById('login')
const difficult = document.getElementById('difficult')
const anotherDifficult = document.querySelector('.difficult')
const balls = document.getElementById('balls')
const anotherBalls = document.querySelector('.balls')
const difficultField = document.getElementById('difficultField')
const ballsField = document.getElementById('ballsField')

//API
const URL = "http://localhost:8080";
const URLJWT = "http://localhost:8081";
let JWT = null;

//EventListener
buttonSubmit.addEventListener("click", () => requisicao())
getAll.addEventListener("click", () => getTricks())
anotherLogin.addEventListener("click", () => login.classList.toggle('d-none'))
difficult.addEventListener("click", () => anotherDifficult.classList.toggle('d-none'))
balls.addEventListener("click", () => anotherBalls.classList.toggle('d-none'))
ballsField.addEventListener("change", () => onlyBalls())
difficultField.addEventListener("change", () => onlyDifficult())

//Functions
function requisicao() {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json" 
    }

      let bodyContent = JSON.stringify({
          "name": inputName.value,
          "password": inputPassword.value
      });

      let reqOptions = {
        url: URLJWT,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }

      axios.request(reqOptions).then(function (response) {
        JWT = response.data;
        if(!(JWT === null)) {
          login.classList.add('d-none')
          anotherLogin.classList.add('d-none')
        }
      })
}

function populaTabela(table, tricks) {
  table.innerHTML = `<thead>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Difficult</th>
    <th scope="col">Balls</th>
    <th scope="col">Siteswap</th>
    <th scope="col">Pre Requisites</th>
    <th scope="col">Edit</th>
  </tr>
  </thead>
  <tbody>
  </tbody>`

  for(let i = 0; i < tricks.length; i++) {
      let truque = tricks[i]
      let row = table.insertRow()
      let cell = row.insertCell()
      let name = document.createTextNode(truque.name)
      cell.appendChild(name)

      let difficult = document.createTextNode(truque.difficult)
      cell = row.insertCell()
      cell.appendChild(difficult)

      let balls = document.createTextNode(truque.balls)
      cell = row.insertCell()
      cell.appendChild(balls)

      let siteswap = document.createTextNode(truque.siteswap)
      cell = row.insertCell()
      cell.appendChild(siteswap)

      let preRequisites = document.createTextNode(truque.preRequisites)
      cell = row.insertCell()
      cell.appendChild(preRequisites)

      if(!(JWT == null)) {
        cell = row.insertCell()
        cell.innerHTML = `<a href=${truque.id}><i class="material-icons" >&#xE254;</i></a>`
        cell.innerHTML += `<a href=${truque.id}><i class="material-icons">&#xE872;</i></a>`
      }
  }
}

function getTricks() {
  let tricks = null;
  showAll.classList.toggle('d-none')
  
  axios.get(URL)
  .then(function (response) {
    populaTabela( table,response.data)
  })
}

function onlyBalls() {
  let balls = ballsField.value;
  const newURL = URL + `/balls/${balls}` 
  axios.get(newURL)
  .then(function (response) {
    populaTabela( ballsTable,response.data)
  }) 
}

function onlyDifficult() {
  let difficult = difficultField.value;
  const newURL = URL + `/difficult/${difficult}` 
  axios.get(newURL)
  .then(function (response) {
    populaTabela( difficultTable,response.data)
  })
  
}
