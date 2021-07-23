let seccion = document.getElementById('seccion');
let agregar = document.getElementById('agregar')
let agregar2 = document.getElementById('agregar2')
let formCompany = document.getElementById('formCompany')
let formCo = document.getElementById('formco')
let thePrompt = document.getElementById('thePrompt')
let promptTitle = document.getElementById('promptTitle')
let closeTab = document.getElementById('closeTab')
let nombre = document.getElementById('nombre');
let pais = document.getElementById('pais');
let email = document.getElementById('email');
let numero = document.getElementById('numero');
let formTitle = document.getElementById('formTitle')
let agregar3 = document.getElementById('agregar3')
let direccion = document.getElementById('direccion')
let mensaje = document.getElementById('mensaje')
let arrayData = []
let arrayClose = []
let arrayValor = []
let arrayEdit = []

correr()

let profile = sessionStorage.getItem('profile')

if(profile == "Basic") {
    document.getElementById('userTab').style.display = "none"
}

// FETCH: OPCIONES DE CIUDAD
fetch("http://localhost:4000/api/v1/cities", {
        headers: {
            'Content-Type': 'application/json',
            'user-token': sessionStorage.getItem('jwt')
        }
    })

    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            let option = document.createElement('option')
            option.textContent = element.name
            pais.appendChild(option)
        });
    })

// EVENT LISTENER: BOTON AGREGAR
agregar.addEventListener('click', () => {
    let try1
    try1 = document.querySelector('#thePrompt')
    if(try1 !== null){
        try1.style.display = "none"
    }
    let try2 = document.querySelector('#formCompany2')
    if(try2 !== null){
        try2.style.display = "none"
    }
    mensaje.style.display = "none"
    agregar2.style.display = "block"
    formTitle.textContent = "AGREGAR COMPAÑIA"
    formCompany.animate([{
            opacity: 0
        },
        {
            opacity: 1
        }
    ], {
        duration: 300,
        iterations: 1
    });
    formCompany.style.display = "block"

})

async function correr(){
    await fetch("http://localhost:4000/api/v1/cities", {
        headers: {
            'Content-Type': 'application/json',
            'user-token': sessionStorage.getItem('jwt')
        }
    })

    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            arrayValor.push(element)
        })
    })
}

// EVENT LISTENER: AGREGAR DEFINITIVO

agregar2.addEventListener('click', () => {
    if (
        (nombre.value == "") ||
        (pais.value == "") ||
        (email.value == "") ||
        (numero.value == "") ||
        (direccion.value == "")
    ) {
        mensaje.animate([{
                opacity: 0
            },
            {
                opacity: 1
            }
        ], {
            duration: 300,
            iterations: 1
        });
        mensaje.textContent = "Faltan completar datos"
        mensaje.style.color = "red"
        mensaje.style.display = "block"
    } else if (!email.value.includes("@")) {
        mensaje.textContent = "Ingresar un email valido."
        mensaje.style.display = "block"

    } else {
        var pais2 = pais.value
        let valorcito;
        arrayValor.forEach(element => {
            if(element.name == pais2){
                valorcito = element.id_cities
            }
        });

        console.log(valorcito)
        let leBody = JSON.stringify({
            name: nombre.value,
            city: valorcito,
            email: email.value,
            number: numero.value,
            address: direccion.value
        })
        
        console.log(leBody)

        fetch("http://localhost:4000/api/v1/companies", {
                method: "POST",
                body: leBody,
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': sessionStorage.getItem('jwt')
                }
            })

            .then(response => {
                if (response.status = 200) {
                    mensaje.textContent = "Compañia agregada correctamente."
                    mensaje.style.color = "green"
                    mensaje.style.display = "block"
                }

                nombre.value = ""
                pais.value = ""
                email.value = ""
                numero.value = ""
                direccion.value = ""

            })
            .then(data => {
                console.log(data)

                arrayData.forEach(element => {
                    element.remove(element)
                });
                getCompanies();
            })
    }

})

// EVENT LISTENER: CERRAR TAB

closeTab.addEventListener('click', () => {
    formCompany.animate([{
            opacity: 1
        },
        {
            opacity: 0
        },
        {
            display: "none"
        }
    ], {
        duration: 300,
        iterations: 1
    });
    formCompany.style.display = "none"
    mensaje.style.display = "none"

})

// GET COMPANIES

function getCompanies() {

    arrayData = []
    fetch("http://localhost:4000/api/v1/companies", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {

            data.forEach(element => {

                let registro = document.createElement('div')
                arrayData.push(registro)
                registro.className = "data2"
                seccion.appendChild(registro)

                let h3nombre = document.createElement('h3')
                h3nombre.textContent = `${element.name}`

                let h3pais = document.createElement('h3')
                h3pais.textContent = `${element.City.Country.name}`

                let h3email = document.createElement('h3')
                h3email.textContent = `${element.email}`

                let h3numero = document.createElement('h3')
                h3numero.textContent = `${element.number}`

                let h3direccion = document.createElement('h3')
                h3direccion.textContent = `${element.address}`

                let h3edit = document.createElement('h3')
                h3edit.textContent = "EDITAR"

                let h3x = document.createElement('h3')
                h3x.textContent = "X"

                let acciones = document.createElement('div')
                let nombre = document.createElement('div')
                let pais = document.createElement('div')
                let email = document.createElement('div')
                let numero = document.createElement('div')
                let direccion = document.createElement('div')
                let edit = document.createElement('button')
                let remove = document.createElement('button')

                remove.style.width = "50px"
                remove.style.height = "40px"
                edit.style.backgroundColor = "rgb(26, 104, 30);"
                edit.style.width = "120px"
                edit.style.height = "40px"
                edit.style.textAlign = "center"

                edit.className = "edit"
                acciones.className = "actions"
                nombre.className = "name"
                pais.className = "country"
                email.className = "email"
                numero.className = "number"
                direccion.className = "address"

                acciones.appendChild(edit)
                edit.appendChild(h3edit)

                acciones.appendChild(remove)
                remove.appendChild(h3x)

                nombre.appendChild(h3nombre)
                pais.appendChild(h3pais)
                email.appendChild(h3email)
                numero.appendChild(h3numero)
                direccion.appendChild(h3direccion)

                registro.appendChild(nombre)
                registro.appendChild(pais)
                registro.appendChild(email)
                registro.appendChild(numero)
                registro.appendChild(direccion)
                registro.appendChild(acciones)


                remove.addEventListener('click', () => {
                    let try1 = document.querySelector('#formCompany2')
                    if(try1 !== null){
                        try1.style.display = "none"
                    }
                    formCompany.style.display = "none"
                    arrayClose.forEach(element => {
                        element.remove();
                    });


                    formCompany.style.display = "none"
                    let thePrompt = document.createElement('div')
                    thePrompt.id = "thePrompt"
                    thePrompt.className = "prompt"
                    thePrompt.style.display = "block"
                    arrayClose.push(thePrompt)
                    thePrompt.animate([{
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ], {
                    duration: 300,
                    iterations: 1
                });

                    let textoPrompt = document.createElement('h3')
                    textoPrompt.textContent = "Seguro quieres borrar este registro?"

                    let confirm = document.createElement('div')
                    confirm.className = "confirm"

                    let buttonSi = document.createElement('button')
                    buttonSi.id = "si"
                    buttonSi.textContent = "SI"

                    let buttonNo = document.createElement('button')
                    buttonNo.id = "no"
                    buttonNo.textContent = "NO"

                    seccion.appendChild(thePrompt)
                    thePrompt.appendChild(textoPrompt)
                    thePrompt.appendChild(confirm)
                    confirm.appendChild(buttonSi)
                    confirm.appendChild(buttonNo)

                    buttonSi.addEventListener('click', () => {
                        fetch(`http://localhost:4000/api/v1/companies/${element.id_companies}`, {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'user-token': sessionStorage.getItem('jwt')
                                }
                            })

                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                if (data.error !== undefined) {
                                    thePrompt.style.display = "none"
                                    let prompt2 = document.createElement('div')
                                    prompt2.className = "prompt"
                                    let mensaje = document.createElement('h3')
                                    mensaje.textContent = "No se puede eliminar registro ya que tiene contactos asociados."
                                    mensaje.style.color = "rgb(58, 60, 75);"
                                    mensaje.style.padding = "0px 20px"
                                    let buttonOk = document.createElement('button')
                                    buttonOk.textContent = "OK"
                                    buttonOk.className = "okbutton"
                                    prompt2.animate([{
                                            opacity: 0
                                        },
                                        {
                                            opacity: 1
                                        }
                                    ], {
                                        duration: 300,
                                        iterations: 1
                                    });
                                    seccion.appendChild(prompt2)
                                    prompt2.appendChild(mensaje)
                                    prompt2.appendChild(buttonOk)
                                    buttonOk.addEventListener('click', () => {
                                        prompt2.style.display = "none"
                                    })
                                    prompt2.style.display = "block"
                                } else {
                                    registro.animate([{
                                            opacity: 1
                                        },
                                        {
                                            opacity: 0
                                        }
                                    ], {
                                        duration: 300,
                                        iterations: 1
                                    });
                                    registro.style.display = "none"
                                    let prompt2 = document.createElement('div')
                                    prompt2.className = "prompt"
                                    let mensaje = document.createElement('h3')
                                    mensaje.textContent = "Registro eliminado correctamente"
                                    mensaje.style.color = "rgb(58, 60, 75);"
                                    mensaje.style.padding = "0px 20px"
                                    let buttonOk = document.createElement('button')
                                    buttonOk.textContent = "OK"
                                    buttonOk.className = "okbutton"
                                    prompt2.animate([{
                                            opacity: 0
                                        },
                                        {
                                            opacity: 1
                                        }
                                    ], {
                                        duration: 300,
                                        iterations: 1
                                    });
                                    seccion.appendChild(prompt2)
                                    prompt2.appendChild(mensaje)
                                    prompt2.appendChild(buttonOk)
                                    buttonOk.addEventListener('click', () => {
                                        prompt2.style.display = "none"
                                    });
                                    thePrompt.style.display = "none"
                                    prompt2.style.display = "block"

                                }
                            })
                    })


                    buttonNo.addEventListener('click', () => {
                        thePrompt.style.display = "none"

                    })

                })

                edit.addEventListener('click', () => {
                    let try1 = document.querySelector('#thePrompt')
                    if(try1 !== null){
                        try1.style.display = "none"
                    }
                    arrayEdit.forEach(element => {
                        element.remove()
                    });

                    
                    formCompany.style.display = "none"
                    let newDiv = document.createElement('div')
                    newDiv.className = "formCompany prompt2"
                    newDiv.id = "formCompany2"
                    newDiv.style.display = "block"
                    let divClose = document.createElement('div')
                    divClose.className = "closeTab"
                    let px = document.createElement('p')
                    px.textContent = "X"

                    arrayEdit.push(newDiv)

                    newDiv.animate([{
                        opacity: 0
                    },
                    {
                        opacity: 1
                    }
                ], {
                    duration: 300,
                    iterations: 1
                });
                    divClose.addEventListener('click', () => {
                        newDiv.remove()
                    })

                    let editCompany = document.createElement('h3')
                    editCompany.textContent = "EDITAR COMPAÑIA"
                    let divCo = document.createElement('div')
                    divCo.className = "formco"
                    let labelNombre = document.createElement('label')
                    labelNombre.innerHTML = `<label for="nombre2">Nombre:<span class="asterisco">*</span></label>`
                    let inputNombre = document.createElement('input')
                    inputNombre.innerHTML = `<input type="text" name="nombre2" id="nombre2" minlength="2" required>`
                    let labelPais = document.createElement('label')
                    labelPais.innerHTML = `<label for="pais2">Ciudad: <span class="asterisco">*</span></label>`
                    let inputPais = document.createElement('select')
                    inputPais.innerHTML = `<select type="text" name="pais2" id="pais2" minlength="2" required></select>`
                    let labelEmail = document.createElement('label')
                    labelEmail.innerHTML = `<label for="email2">Email:<span class="asterisco">*</span></label>`
                    let inputEmail = document.createElement('input')
                    inputEmail.innerHTML = `<input type="text" name="email2" id="email2" minlength="2" required>`
                    let labelNumero = document.createElement('label')
                    labelNumero.innerHTML = `<label for="numero2">Numero:<span class="asterisco">*</span></label>`
                    let inputNumero = document.createElement('input')
                    inputNumero.innerHTML = `<input type="number" name="numero2" id="numero2" minlength="6" required>`
                    let labelDireccion = document.createElement('label')
                    labelDireccion.innerHTML = `<label for="direccion2">Direccion:<span class="asterisco">*</span></label>`
                    let inputDireccion = document.createElement('input')
                    inputDireccion.innerHTML = `<input type="direccion" name="direccion2" id="direccion2" minlength="2" required>`
                    let buttonEditar = document.createElement('button')
                    buttonEditar.id = "editar"
                    buttonEditar.textContent = "EDITAR"


                    fetch("http://localhost:4000/api/v1/cities", {
                            headers: {
                                'Content-Type': 'application/json',
                                'user-token': sessionStorage.getItem('jwt')
                            }
                        })

                        .then(response => response.json())
                        .then(data => {
                            data.forEach(element => {
                                let option = document.createElement('option')
                                option.textContent = element.name
                                inputPais.appendChild(option)
                                inputPais.value = ""
                            });
                        })

                    buttonEditar.addEventListener('click', () => {

                        if (
                            (inputNombre.value == "") &&
                            (inputPais.value == "") &&
                            (inputEmail.value == "") &&
                            (inputNumero.value == "") &&
                            (inputDireccion.value == "")
                        ) {
                            msj = document.querySelector('#mensaje2')
                            if (msj == null) {

                                let mensaje2 = document.createElement('p')
                                mensaje2.animate([{
                                    opacity: 0
                                },
                                {
                                    opacity: 1
                                }
                            ], {
                                duration: 300,
                                iterations: 1
                            });
                                mensaje2.className = "mensaje"
                                mensaje2.id = "mensaje2"
                                mensaje2.style.textAlign = "center"
                                mensaje2.style.marginTop = "10px"
                                mensaje2.textContent = "Todos los campos estan vacios."
                                mensaje2.style.color = "red"
                                mensaje2.style.display = "block"
                                newDiv.appendChild(mensaje2)
                                return
                            } else {
                                msj.textContent = "Todos los campos estan vacios."
                                return
                            }
              
                        } else {
                            
                            let leBody = {}


                            if (
                                (inputNombre.value !== "")
                            ){
                                leBody["name"] = inputNombre.value
                            }

                            if (
                                (inputPais.value !== "")
                            ){
                                var valorcito = 0
                                if (inputPais.value == "Buenos Aires") {
                                    valorcito = 1
                                } else if (inputPais.value == "Cordoba") {
                                    valorcito = 2
                                } else if (inputPais.value == "Bogota") {
                                    valorcito = 3
                                } else if (inputPais.value == "Medellin") {
                                    valorcito = 4
                                } else if (inputPais.value == "Cucuta") {
                                    valorcito = 5
                                } else if (inputPais.value == "Ciudad De Mexico") {
                                    valorcito = 6
                                } else if (inputPais.value == "Tijuana") {
                                    valorcito = 7
                                } else if (inputPais.value == "Atacama") {
                                    valorcito = 8
                                } else if (inputPais.value == "Santiago") {
                                    valorcito = 9
                                } else if (inputPais.value == "Valparaiso") {
                                    valorcito = 10
                                } else if (inputPais.value == "Canelones") {
                                    valorcito = 11
                                } else if (inputPais.value == "Maldonado") {
                                    valorcito = 12
                                } else if (inputPais.value == "Montevideo") {
                                    valorcito = 13
                                } else if (inputPais.value == "Florida") {
                                    valorcito = 14
                                } else if (inputPais.value == "Texas") {
                                    valorcito = 15
                                }
                                leBody["city"] = valorcito
                            }

                            
                            if (
                                (inputEmail.value !== "")
                    
                            ){
                                if (!inputEmail.value.includes("@")) {

                                    msj = document.querySelector('#mensaje2')
                                    if (msj == null) {
  
                                        let mensaje2 = document.createElement('p')
                                        mensaje2.animate([{
                                            opacity: 0
                                        },
                                        {
                                            opacity: 1
                                        }
                                    ], {
                                        duration: 300,
                                        iterations: 1
                                    });
                                        mensaje2.className = "mensaje"
                                        mensaje2.id = "mensaje2"
                                        mensaje2.style.textAlign = "center"
                                        mensaje2.style.marginTop = "10px"
                                        mensaje2.textContent = "Ingresar un mail valido."
                                        mensaje2.style.color = "red"
                                        mensaje2.style.display = "block"
                                        newDiv.appendChild(mensaje2)
                                        return
                                    } else {
                                    msj.textContent = "Ingresar un mail valido"
                                    return
                                }

                                }else {
                                leBody["email"] = inputEmail.value
                                }
                            }

                            if (
                                (inputDireccion.value !== "")
                            ){
                                
                                leBody["address"] = inputDireccion.value
                            }

                            if (
                                (inputNumero.value !== "")
                            ){
                               let numerito = parseInt(inputNumero.value)
                                if (isNaN(numerito)) {

                                    msj = document.querySelector('#mensaje2')

                                    if (msj == null) {
  
                                        let mensaje2 = document.createElement('p')
                                        mensaje2.animate([{
                                            opacity: 0
                                        },
                                        {
                                            opacity: 1
                                        }
                                    ], {
                                        duration: 300,
                                        iterations: 1
                                    });
                                        mensaje2.className = "mensaje"
                                        mensaje2.id = "mensaje2"
                                        mensaje2.style.textAlign = "center"
                                        mensaje2.style.marginTop = "10px"
                                        mensaje2.textContent = "Ingresar un numero valido."
                                        mensaje2.style.color = "red"
                                        mensaje2.style.display = "block"
                                        newDiv.appendChild(mensaje2)
                                        return
                                    } else {
                                    msj.textContent = "Ingresar un numero valido"
                                    return
                                    }
                                } else {    
                                leBody["number"] = parseInt(inputNumero.value)
                                }
                            }

                            console.log(leBody)

                            fetch(`http://localhost:4000/api/v1/companies/${element.id_companies}`, {
                                method: "PUT",
                                body: JSON.stringify(leBody),
                                json: true,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'user-token': sessionStorage.getItem('jwt')
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)

                                arrayData.forEach(element => {
                                    element.remove(element)
                                });
                                getCompanies();

                                msj = document.querySelector('#mensaje2')

                                if (msj == null) {

                                    let mensaje2 = document.createElement('p')
                                    mensaje2.animate([{
                                        opacity: 0
                                    },
                                    {
                                        opacity: 1
                                    }
                                ], {
                                    duration: 300,
                                    iterations: 1
                                });
                                    mensaje2.className = "mensaje"
                                    mensaje2.id = "mensaje2"
                                    mensaje2.style.textAlign = "center"
                                    mensaje2.style.marginTop = "10px"
                                    mensaje2.textContent = "Compañia ha sido editada."
                                    mensaje2.style.color = "green"
                                    mensaje2.style.display = "block"
                                    newDiv.appendChild(mensaje2)
                                    return
                                } else {
                                msj.textContent = "Compañia ha sido editada"
                                return
                                }
                                
                            })
                        }
                    })

                    seccion.appendChild(newDiv)
                    newDiv.appendChild(divClose)
                    divClose.appendChild(px)
                    newDiv.appendChild(editCompany)
                    newDiv.appendChild(divCo)
                    divCo.appendChild(labelNombre)
                    divCo.appendChild(inputNombre)
                    divCo.appendChild(labelPais)
                    divCo.appendChild(inputPais)
                    divCo.appendChild(labelEmail)
                    divCo.appendChild(inputEmail)
                    divCo.appendChild(labelNumero)
                    divCo.appendChild(inputNumero)
                    divCo.appendChild(labelDireccion)
                    divCo.appendChild(inputDireccion)
                    newDiv.appendChild(buttonEditar)
                })

            });

        })

}

getCompanies();

var dragItem = document.querySelector("#formCompany");
var container = document.querySelector("#formCompany");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}