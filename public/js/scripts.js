let currentListItemId

function menu() {
    const x = document.getElementById("menu")
    if (x.style.display === "none") {
        x.style.display = "block"
    } else {
        x.style.display = "none"
    }
}

function log() {
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "login": document.getElementById("login").value,
            "password": document.getElementById("pass").value
        })
    })
        .then(response => response.json())
        .then((data) => {
            localStorage.setItem("token", data.token)
            console.log("Logged in")
            document.getElementById("current_user").innerHTML = data.user.login
            document.getElementById("login1").style.display = "none"

            console.log(localStorage.getItem("token"))
            console.log(localStorage.getItem("token"))
            console.log(localStorage.getItem("token"))


            const models = document.getElementById("models")
            const child = createInnerHTML(data.user.models)
            models.appendChild(child)
        })
        .catch((error) => { console.log("error " + error)})
}

function register() {
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "login": document.getElementById("login").value,
            "password": document.getElementById("pass").value
        })
    })
        .then(() => console.log("Registered"))
        .catch((error) => console.log("error " + error))
}

function logout() {
    fetch('http://localhost:3000/users/logout', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(() => {
            console.log("status 200")
            document.getElementById("current_user").innerHTML = "Not logged in"
            document.getElementById("login1").style.display = "block"
        })
        .catch((error) => {console.log(error)})
}

function uploadFile() {
    const token = localStorage.getItem("token")
    console.log(token)
    let file = document.getElementById("myFile").files[0];
    const fileName = file.name;

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (this.status === 200) {
            const models = document.getElementById("models")
            const child = createInnerHTML(JSON.parse(this.responseText))
            models.appendChild(child)
        } else {
            console.log("Error " + this.responseText)
        }
    }

    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            xhr.open('POST', 'http://localhost:3000/model/add', true)
            xhr.setRequestHeader("Authorization", token)
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
            xhr.send(JSON.stringify({
                "name": fileName,
                "model": JSON.parse(evt.target.result)
            }))
        }
        reader.onerror = function (evt) {
            console.log(evt.target.result)
        }
    }
}

const removeFile = function() {
    fetch('http://localhost:3000/model/'+currentListItemId, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            console.log("Removed")

            const models = document.getElementById("models")
            const child = createInnerHTML(data.models)
            models.appendChild(child)
        })
        .catch((error) => {console.log(error)})
}

const createInnerHTML = function(json) {
    console.log("Creating list from:" + json)

    // Remove previous list
    const oldList = document.getElementById("list")
    if (oldList != null) {
        oldList.remove()
    }

    // Create the list element:
    const list = document.createElement('ul')
    list.id = 'list'

    console.log("keys " + Object.keys(json).length)

    for(let i = 0; i < Object.keys(json).length; i++) {
        console.log("json " + Object.values(json)[i])
        const li = document.createElement('li')
        const div = document.createElement('div')
        const id = document.createElement('p')
        const name = document.createElement('h4')
        const model = document.createElement('p')
        li.addEventListener("click", fillDiv)
        div.className = 'model'
        li.appendChild(div)
        div.appendChild(name)
        div.appendChild(id)
        div.appendChild(model)
        name.innerText = Object.values(json)[i].name
        id.innerText = Object.values(json)[i]._id
        id.style.display = "none" // hide ID
        model.innerText = Object.values(json)[i].json
        model.style.display = "none" // hide model
        list.appendChild(li);
    }
    return list;
}

function fillDiv(model) {
    currentListItemId = model.currentTarget.firstElementChild.children[1].textContent
    console.log(currentListItemId)
    const json = model.currentTarget.firstElementChild.children[2].textContent
    console.log("clicked on " + json)
    createScene(json)
}

window.menu = menu
window.log = log
window.register = register
window.logout = logout
window.uploadFile = uploadFile
window.createInnerHTML = createInnerHTML
window.removeFile = removeFile