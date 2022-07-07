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
const loginForm = document.querySelector('.login form')
const difficult = document.getElementById('difficult')
const anotherDifficult = document.querySelector('.difficult')
const balls = document.getElementById('balls')
const anotherBalls = document.querySelector('.balls')
const difficultField = document.getElementById('difficultField')
const ballsField = document.getElementById('ballsField')

//add trick 
const addTricklink = document.getElementById('addTrick')
const addTrickDiv = document.querySelector('.addTrick')
const newTrickContainer = document.querySelector('.newTricks')
const newNameField = document.getElementById('newNameField')
const newBallsField = document.getElementById('newBallsField')
const newDifficultField = document.getElementById('newDifficultField')
const newSiteswapField = document.getElementById('newSiteswapField')
const newPrerequisitesField = document.getElementById('newPrerequisitesField')

//API
const URL = "http://localhost:8080";
const URLJWT = "http://localhost:8081";
let JWT = null;
if(sessionStorage.getItem('JWT')) {
  JWT = sessionStorage.getItem('JWT')
  login.classList.toggle('d-none')
  addTrickDiv.classList.toggle('d-none')
}

//EventListener
buttonSubmit.addEventListener("click", () => requisicao())
getAll.addEventListener("click", () => populaTabela(table, "tudo"))
getAll.addEventListener("click", () => showAll.classList.toggle('d-none'))
anotherLogin.addEventListener("click", () => loginForm.classList.toggle('d-none'))
difficult.addEventListener("click", () => anotherDifficult.classList.toggle('d-none'))
balls.addEventListener("click", () => anotherBalls.classList.toggle('d-none'))
ballsField.addEventListener("change", () => populaTabela(ballsTable, "bolinhas"))
difficultField.addEventListener("change", () => populaTabela(difficultTable, "dificuldade"))


//addTrick Listeners
addTricklink.addEventListener("click", () => newTrickContainer.classList.toggle('d-none'))


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
        sessionStorage.setItem('JWT', response.data)
        if(!(JWT === null)) {
          login.classList.add('d-none')
          anotherLogin.classList.add('d-none')
        }
      })
}

function populaTabela(table, tipo) {
  tricks = null;
  if(tipo === "tudo") {
    axiosTest().then(response => {
      tricks = response;
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
            cell.innerHTML = `<a href="#addTrick" onclick="updateTrick('${truque.id}')"><i class="material-icons" >&#xE254;</i></a>`
            cell.innerHTML += `<a href="#" id="deletar" onclick="deleteTrick('${truque.id}')"><i class="material-icons">&#xE872;</i></a>`
          }
      }
    })
  }  
  else if(tipo === "dificuldade") {
    onlyDifficult().then(response => {
      tricks = response;
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
            cell.innerHTML = `<a href="#addTrick" onclick="updateTrick('${truque.id}')"><i class="material-icons" >&#xE254;</i></a>`
            cell.innerHTML += `<a href="#" id="deletar" onclick="deleteTrick('${truque.id}')"><i class="material-icons">&#xE872;</i></a>`
          }
      }
    })
  }
  else if(tipo === "bolinhas") {
    onlyBalls().then(response => {
      tricks = response;
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
            cell.innerHTML = `<a href="#addTrick" onclick="updateTrick('${truque.id}')"><i class="material-icons" >&#xE254;</i></a>`
            cell.innerHTML += `<a href="#" id="deletar" onclick="deleteTrick('${truque.id}')"><i class="material-icons">&#xE872;</i></a>`
          }
        }
      })
  }
}
function axiosTest() {
  return axios.get(URL).then(response => response.data)
}

function onlyBalls() {
  let balls = ballsField.value;
  const newURL = URL + `/balls/${balls}` 
  return axios.get(newURL).then(response => response.data) 
}

function onlyDifficult() {
  let difficult = difficultField.value;
  const newURL = URL + `/difficult/${difficult}` 
  return axios.get(newURL).then(response => response.data) 
}

function deleteTrick(id) {
  let headersList = {
    "Accept": "*/*",
    "Authorization": `Bearer ${JWT}`  
   }
   
   let reqOptions = {
     url: `http://localhost:8080/${id}`,
     method: "DELETE",
     headers: headersList,
   }
   
   axios.request(reqOptions).then(function (response) {
   }).then(() => window.location.reload())
}

function addTrick() {

  let headersList = {
  "Accept": "*/*",
  "Authorization": `Bearer ${JWT}`,
  "Content-Type": "application/json" 
  }

  let bodyContent = JSON.stringify({
    "name": newNameField.value,
    "balls": parseInt(newBallsField.value),
    "description": "None",
    "difficult": parseInt(newDifficultField.value),
    "siteswap": newSiteswapField.value,
    "preRequisites": newPrerequisitesField.value
  });

  let reqOptions = {
    url: 'http://localhost:8080',
    method: "POST",
    headers: headersList,
    data: bodyContent,
  }

  axios.request(reqOptions).then(function (response) {
    console.log(response.data);
  }).then(() => window.location.reload())

}

function updateTrick(id) {
  //COLOCA OS DADOS DO TRUQUE NO FORM DO ADD TRICK...
  addTricklink.innerHTML = "Update Trick"
  newTrickContainer.classList.toggle('d-none')
  axios.get(`${URL}/${id}`).then( (response) => {
    console.log(response.data)
    newNameField.value = response.data.name
    newBallsField.value = response.data.balls
    newDifficultField.value = response.data.difficult
    newSiteswapField.value = response.data.siteswap
    newPrerequisitesField.value = response.data.preRequisites
  })
 
  //Manda a requisição pro servidor
  document.getElementById('enviarAdd').addEventListener('click',() => {
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${JWT}`,
      "Content-Type": "application/json" 
    }
     let bodyContent = JSON.stringify({
       "name": newNameField.value,
       "balls": parseInt(newBallsField.value),
       "description": "None",
       "difficult": parseInt(newDifficultField.value),
       "siteswap": newSiteswapField.value,
       "preRequisites": newPrerequisitesField.value
     });
     
     let reqOptions = {
       url: `http://localhost:8080/${id}`,
       method: "PUT",
       headers: headersList,
       data: bodyContent,
     }
     
     axios.request(reqOptions).then(function (response) {
       console.log(response.data);
     })
  })
}
