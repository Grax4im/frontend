
const table = document.querySelector('table')


const URL = "http://localhost:8080/"
let tricks = null;

axios.get(URL)
.then(function (response) {
    tricks = response.data
})
.then(() => populaTabela())


function populaTabela() {
    for(let i = 0; i < tricks.length; i++) {
        console.log(tricks[i])

        let truque = tricks[i]
        let row = table.insertRow()
        let cell = row.insertCell()
        let name = document.createTextNode(truque.name)
        cell.appendChild(name)

        difficult = document.createTextNode(truque.difficult)
        cell = row.insertCell()
        cell.appendChild(difficult)

        balls = document.createTextNode(truque.balls)
        cell = row.insertCell()
        cell.appendChild(balls)

        siteswap = document.createTextNode(truque.siteswap)
        cell = row.insertCell()
        cell.appendChild(siteswap)

        preRequisites = document.createTextNode(truque.preRequisites)
        cell = row.insertCell()
        cell.appendChild(preRequisites)

        cell = row.insertCell()
        cell.innerHTML = `<a href=${truque.id}><i class="material-icons" >&#xE254;</i></a>`
        cell.innerHTML += `<a href=${truque.id}><i class="material-icons">&#xE872;</i></a>`
    }
}