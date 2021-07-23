// VARIABLES
let contenedor = document.getElementById('contenedor2')
let checkboxMaster = document.getElementById('checkboxmaster')
let tablero = document.getElementById('tablero')
let buscador = document.getElementById('search')
let osa = document.getElementById('osa')
let agregarContacto = document.getElementById('agregar')
let seleccionar = document.getElementById('seleccionar')
let textSeleccionar = document.getElementById('textSeleccionar')
let searchButton = document.getElementById('searchButton')
let login = document.getElementById('reservado')
let tags = document.getElementById('tags')
let marcados = 0
let go = true;
let h3MasAmount = 0
let channelExists = false
let clickFromTag = false
let keys = Object.keys(localStorage)

// ARRAYS
let arrayRegistros = []
let arrayOptions = []
let arrayOptions2 = []
let arraySugerencias = []
let arrayContactos = []
let arrayResponse = []
let arrayRegistros2 = []
let arrayCheckbox = []
let arrayCiudad2 = []
let arrayComparison = []
let arrayInteres = []
let arrayAvisos = []
let arrayAvisos2 = []
let arrayValues = []
let arrayCompañia = []
let arrayIdContact = []
let arrayIndexes = []
let arrayOptions3 = []
let arrayValues2 = []
let arrayValue3 = []
let arrayConfirmados = []
let arrayWosa = []
let arrayCompanies = []
let arrayRegion = []
let arrayCiudad = []
let arrayPais = []
let arrayChannels = []
let arrayChannels2 = []
let arrayMedia = []

let profile = sessionStorage.getItem('profile')

if(profile == "Basic") {
    document.getElementById('userTab').style.display = "none"
}

keys.forEach(element => {
    if (element.includes("tag")) {
        let theElement = localStorage.getItem(element)
        createTags(theElement)
    }
})

// EVENT LISTENER: AGREGAR CONTACTO

agregarContacto.addEventListener('click', () => {
    channelExists = false
    buildContact()
})

// FUNCION 1: CAMBIAR

function changeThis3() {
    let inputAddress = document.getElementById('inputAddress')
    let selectCiudad = document.getElementById('selectCity')

    inputAddress.removeAttribute('disabled')

    let waynew = selectCiudad.selectedIndex

    if (waynew == 0) {
        selectCiudad.style.border = "1px solid red"
        selectCiudad.style.boxShadow = "0px 0px 5px red"
    } else {
        selectCiudad.style.border = "none"
        selectCiudad.style.boxShadow = "0px 0px 7px black"
    }
}

function changeThis6(selectChannel) {
    if (selectChannel.selectedIndex == 0) {
        selectChannel.style.border = "1px solid red"
        selectChannel.style.boxShadow = "0px 0px 5px red"
    } else {
        selectChannel.style.border = "none"
        selectChannel.style.boxShadow = "0px 0px 7px black"
    }
}

function changeThis5(selectCompany) {
    if (selectCompany.selectedIndex == 0) {
        selectCompany.style.border = "1px solid red"
        selectCompany.style.boxShadow = "0px 0px 5px red"
    } else {
        selectCompany.style.border = "none"
        selectCompany.style.boxShadow = "0px 0px 7px black"
    }
}

// FUNCION 2: CAMBIAR

function changeThis2() {


    arrayOptions2.forEach(element => {
        element.remove();
    })

    let selectPais = document.getElementById('selectPais')
    let selectCiudad = document.getElementById('selectCity')

    let valor = selectPais.options[selectPais.selectedIndex].textContent

    fetch("http://localhost:4000/api/v1/countries", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if (element.name == valor) {
                    let theIndex = data.indexOf(element)
                    for (i = 0; i < data[theIndex].Cities.length; i++) {
                        let option = document.createElement('option')
                        option.textContent = data[theIndex].Cities[i].name
                        selectCiudad.appendChild(option)
                        arrayOptions2.push(option)
                    }
                }
            });
        })

    selectCiudad.removeAttribute('disabled')

    let waynew = selectPais.selectedIndex

    if (waynew == 0) {
        selectPais.style.border = "1px solid red"
        selectPais.style.boxShadow = "0px 0px 5px red"
    } else {
        selectPais.style.border = "none"
        selectPais.style.boxShadow = "0px 0px 7px black"
    }

}

// FUNCION 3: CAMBIAR

function changeThis() {


    let selectRegion = document.getElementById('selectRegion')
    let selectPais = document.getElementById('selectPais')
    let selectCity = document.getElementById('selectCity')

    selectCity.setAttribute('disabled', true)

    arrayOptions2.forEach(element => {
        element.remove()
    })

    arrayOptions.forEach(element => {
        element.remove();
    })

    arrayPais = []

    let valorete = selectRegion.selectedIndex
    let valor = selectRegion.options[valorete].textContent

    fetch("http://localhost:4000/api/v1/region", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {
            data.forEach(element => {

                if (element.name == valor) {
                    let theIndex = data.indexOf(element)
                    for (i = 0; i < data[theIndex].Countries.length; i++) {
                        let option = document.createElement('option')
                        option.textContent = data[theIndex].Countries[i].name
                        selectPais.appendChild(option)
                        arrayPais.push(option)
                        arrayOptions.push(option)
                    }
                }
            });
        })

    selectPais.removeAttribute('disabled')

    let waynew = selectRegion.selectedIndex

    if (waynew == 0) {
        selectRegion.style.border = "1px solid red"
        selectRegion.style.boxShadow = "0px 0px 5px red"
    } else {
        selectRegion.style.border = "none"
        selectRegion.style.boxShadow = "0px 0px 7px black"
    }
}

// FUNCION 4: CAPITALIZAR PRIMERA LETRA

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// EVENT LISTENER 1: BOTON BUSCAR

buscador.addEventListener('keydown', (event => {

    if (event.which === 13 || event.keyCode === 13) {
        clickFromTag = false
        osa.style.display = "none"
        checkboxMaster.checked = false
        tablero.style.backgroundColor = "#4e504f"

        arrayRegistros.forEach(element => {
            element.remove();
        });

        arrayRegistros = []
        marcados = 0
        seleccionar.style.display = "none"

        searchResults();
        let busqueda = document.getElementById('search')
        localStorage.setItem(`tag(${busqueda.value})`, busqueda.value)
        createTags(busqueda.value)
    }
}))

searchButton.addEventListener('click', () => {
    go = false
    clickFromTag = false
    osa.style.display = "none"
    checkboxMaster.checked = false
    tablero.style.backgroundColor = "#4e504f"

    arrayRegistros.forEach(element => {
        element.remove();
    });

    arrayRegistros = []
    marcados = 0
    seleccionar.style.display = "none"

    searchResults();
    let busqueda = document.getElementById('search')
    localStorage.setItem(`tag(${busqueda.value})`, busqueda.value)
    createTags(busqueda.value)
})

function searchResults(theValor) {
    arrayResponse = []
    let valor;
    let valorCrudo;

    if (clickFromTag) {
        valorCrudo = theValor
        valor = capitalizeFirstLetter(valorCrudo)
    } else {
        let busqueda = document.getElementById('search')
        valorCrudo = busqueda.value
        valor = capitalizeFirstLetter(busqueda.value)
    }


    fetch("http://localhost:4000/api/v1/contacts", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                if ((element.firstName.includes(valor)) ||
                    (element.City.Country.name.includes(valor)) ||
                    (element.Company.name.includes(valor)) ||
                    (element.firstName.includes(valorCrudo)) ||
                    (element.City.Country.name.includes(valorCrudo)) ||
                    (element.Company.name.includes(valorCrudo))
                ) {
                    arrayResponse.push(element)
                    build(element);
                }
            });
        })
}

function createTags(theValue) {
    if (theValue !== "") {
        let divBox = document.createElement('div')
        divBox.className = "divBox"
        let h3x = document.createElement('h5')
        h3x.textContent = "X"
        h3x.className = "h3x"
        let h3Text = document.createElement('h3')
        h3Text.textContent = theValue
        h3Text.style.textAlign = "center"
        h3length = theValue.length
        let boxWidth = 60
        for (i = 0; i < h3length; i++) {
            boxWidth += 12
        }

        divBox.style.width = `${boxWidth}px`
        if (!clickFromTag) {


            divBox.animate([{
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ], {
                duration: 100,
                iterations: 1
            });
            tags.appendChild(divBox)
            divBox.appendChild(h3x)
            divBox.appendChild(h3Text)
        }


        h3x.addEventListener('click', () => {
            divBox.remove();
            localStorage.removeItem(`tag(${theValue})`, theValue)
            event.stopPropagation();
        })

        divBox.addEventListener('click', () => {
            go = false
            theValue = h3Text.textContent
            clickFromTag = true
            osa.style.display = "none"
            checkboxMaster.checked = false
            tablero.style.backgroundColor = "#4e504f"

            arrayRegistros.forEach(element => {
                element.remove();
            });

            arrayRegistros = []
            marcados = 0
            seleccionar.style.display = "none"
            searchResults(theValue)

        })
    }

}

// EVENT LISTENER 2: BUSCADOR INTERACTIVO

buscador.addEventListener('keydown', () => {

    height = 0
    arrayValues = []
    arrayValues2 = []

    fetch("http://localhost:4000/api/v1/contacts", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {

            arraySugerencias.forEach(element => {
                element.remove();
            })
            if (buscador.value !== "" || buscador.value.length >= 1) {
                data.forEach(element => {
                    let name = element.firstName
                    let company = element.Company.name
                    let pais = element.City.Country.name
                    let valor = capitalizeFirstLetter(buscador.value)

                    let divSuggerence = document.createElement('div')
                    arraySugerencias.push(divSuggerence)
                    divSuggerence.className = "suggerence"

                    if (name.includes(valor)) {

                        osa.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 100,
                            iterations: 1
                        });

                        osa.style.display = "flex"

                        let pSuggerence = document.createElement('p')
                        pSuggerence.style.fontSize = "15px"
                        pSuggerence.innerHTML = `<p class="psuggerence"><span class="spancito">CONTACTO </span>- ${name}`

                        osa.appendChild(divSuggerence)
                        divSuggerence.appendChild(pSuggerence)

                    }

                    divSuggerence.addEventListener('click', () => {
                        osa.style.display = "none"
                        let busqueda = document.getElementById("search")
                        busqueda.value = name
                    })

                    let divSuggerence2 = document.createElement('div')
                    divSuggerence2.className = "suggerence"
                    arraySugerencias.push(divSuggerence2)

                    if (company.includes(valor)) {

                        osa.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 300,
                            iterations: 1
                        });

                        osa.style.display = "flex"

                        let pSuggerence2 = document.createElement('p')
                        pSuggerence2.style.fontSize = "15px"
                        pSuggerence2.innerHTML = `<p class="psuggerence"><span class="spancito2">Compañía </span>- ${company}`


                        if (arrayValues2.length == 0) {
                            osa.appendChild(divSuggerence2)
                            divSuggerence2.appendChild(pSuggerence2)
                            arrayValues2.push(pSuggerence2.textContent)
                        }

                        arrayValues2.forEach(element => {
                            if (element !== pSuggerence2.textContent) {
                                osa.appendChild(divSuggerence2)
                                divSuggerence2.appendChild(pSuggerence2)
                                arrayValues2.push(pSuggerence2.textContent)
                            }
                        })

                        divSuggerence2.addEventListener('click', () => {
                            osa.style.display = "none"
                            let busqueda = document.getElementById("search")
                            busqueda.value = company
                        })


                    }

                    let divSuggerence3 = document.createElement('div')
                    divSuggerence3.className = "suggerence"
                    arraySugerencias.push(divSuggerence3)
                    divSuggerence3.className = "suggerence"

                    if (pais.includes(valor)) {

                        osa.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 300,
                            iterations: 1
                        });

                        osa.style.display = "flex"

                        let pSuggerence3 = document.createElement('p')
                        pSuggerence3.style.fontSize = "15px"
                        pSuggerence3.innerHTML = `<p class="psuggerence"><span class="spancito3">Pais </span>- ${pais}`

                        if (arrayValues.length == 0) {
                            osa.appendChild(divSuggerence3)
                            divSuggerence3.appendChild(pSuggerence3)
                            arrayValues.push(pSuggerence3.textContent)
                        }

                        arrayValues.forEach(element => {
                            if (element !== pSuggerence3.textContent) {
                                osa.appendChild(divSuggerence3)
                                divSuggerence3.appendChild(pSuggerence3)
                                arrayValues.push(pSuggerence3.textContent)
                            }
                        })

                        divSuggerence3.addEventListener('click', () => {
                            osa.style.display = "none"
                            let busqueda = document.getElementById("search")
                            busqueda.value = pais
                        })

                    }
                });
            } else {

                osa.style.display = "none"
            }
        })


})
checkboxMaster.style.cursor = "pointer"
checkboxMaster.addEventListener('click', () => {
    if (checkboxMaster.checked == true) {
        if (seleccionar.style.display !== "flex") {
            seleccionar.animate([{
                    height: "0px",
                    opacity: 0
                },
                {
                    height: "30px",
                    opacity: 1
                }
            ], {
                duration: 100,
                iterations: 1
            });
        }
        marcados = arrayRegistros.length
        seleccionar.style.display = "flex"
        textSeleccionar.textContent = `${marcados} seleccionados`
        arrayCheckbox.forEach(element => {
            element.checked = true
            element.classList.toggle = "wesa"
        }); 

        arrayRegistros.forEach(element => {
            element.style.backgroundColor = "rgb(88, 32, 32)"
        })

        tablero.style.backgroundColor = "#582020"
    } else {
        seleccionar.style.display = "none"
        marcados = 0
        arrayCheckbox.forEach(element => {
            element.checked = false
            element.classList.toggle = "wesa"
        });
        arrayRegistros.forEach(element => {
            element.style.backgroundColor = ""
        })

        tablero.style.backgroundColor = "#4e504f"
    }
})


// INICIO

function begin() {

    arrayRegistros = []
    arrayResponse = []

    fetch("http://localhost:4000/api/v1/contacts", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(element => {
                arrayResponse.push(element)
                build(element);
            });
        })

}

document.getElementById('sort-pais').addEventListener('click', () => {

    arrayRegistros.forEach(element => {
        element.remove();
    });

    if(go){
        arrayResponse.sort(function compare3(a, b){

            var esa = b.City.Country.name
        
            var osa = a.City.Country.name
        
                if (osa < esa) {
                    return -1;
                } else if (esa < osa){
                    return 1;
                } else if (esa == osa) {
                    return 0 
                }


        })
        go = false

    } else {
        arrayResponse.sort(function compare3(a, b){

            var esa = b.City.Country.name
        
            var osa = a.City.Country.name
        
            if (esa < osa) {
                return -1;
            } else if (osa < esa){
                return 1;
            } else if (esa == osa){
                return 0 
            }
                
        })
        go = true
    }

    arrayRegistros = []
    arrayResponse.forEach(element => {
        build(element)
    });

})

document.getElementById('sort-contact').addEventListener('click', () => {

    arrayRegistros.forEach(element => {
        element.remove();
    });

    if(go){
        arrayResponse.sort(function compare4(a, b){

            var esa = b.firstName
        
            var osa = a.firstName
        
                if (osa < esa) {
                    return -1;
                } else if (esa < osa){
                    return 1;
                } else if (esa == osa) {
                    return 0 
                }


        })
        go = false

    } else {
        arrayResponse.sort(function compare5(a, b){

            var esa = b.Company.name
        
            var osa = a.Company.name
        
            if (esa < osa) {
                return -1;
            } else if (osa < esa){
                return 1;
            } else if (esa == osa){
                return 0 
            }
                
        })
        go = true
    }

    arrayRegistros = []
    arrayResponse.forEach(element => {
        build(element)
    });

})


document.getElementById('sort-compañia').addEventListener('click', () => {

    arrayRegistros.forEach(element => {
        element.remove();
    });

    if(go){
        arrayResponse.sort(function compare3(a, b){

            var esa = b.Company.name
        
            var osa = a.Company.name
        
                if (osa < esa) {
                    return -1;
                } else if (esa < osa){
                    return 1;
                } else if (esa == osa) {
                    return 0 
                }


        })
        go = false

    } else {
        arrayResponse.sort(function compare3(a, b){

            var esa = b.Company.name
        
            var osa = a.Company.name
        
            if (esa < osa) {
                return -1;
            } else if (osa < esa){
                return 1;
            } else if (esa == osa){
                return 0 
            }
                
        })
        go = true
    }

    arrayRegistros = []
    arrayResponse.forEach(element => {
        build(element)
    });

})

document.getElementById('sort-cargo').addEventListener('click', () => {

    arrayRegistros.forEach(element => {
        element.remove();
    });

    if(go){
        arrayResponse.sort(function compare2(a, b){

            var osa = b.Role.name
        
            var esa = a.Role.name

            if (osa < esa) {
                return -1;
            } else if (esa < osa){
                return 1;
            } else if (esa == osa){
                return 0
            }

        })

      go = false
    } else {
        arrayResponse.sort(function compare2(a, b){


            var osa = b.Role.name
        
            var esa = a.Role.name
        
                    
            if (esa < osa) {
                return -1;
            } else if (osa < esa){
                return 1;
            } else if (esa == osa) {
                return 0 
            }
            
        })
        go = true
    }

    arrayRegistros = []
    arrayResponse.forEach(element => {
        build(element)
    });

})

document.getElementById('sort-interes').addEventListener('click', () => {

    arrayRegistros.forEach(element => {
        element.remove();
    });

    if(go){
        arrayResponse.sort(function compare(a, b){

            var esa = b.interest
        
            var osa = a.interest
        
                   
            if (osa < esa) {
                return -1;
            } else if (esa < osa){
                return 1;
            } else if (osa == esa) {
                return 0 
            }
            
        })
        go = false
    } else {
 
        arrayResponse.sort(function compare(a, b){

            var esa = b.interest
        
            var osa = a.interest
        
            if (esa < osa) {
                return -1;
            } else if (osa < esa){
                return 1;
            } else if (esa == osa) {
                return 0 
            }
        })

        go = true
    }


    arrayRegistros = []
    arrayResponse.forEach(element => {
        build(element)
    });

})

// FUNCIONES



function buildContact(element) {

    arrayCompanies = []
    arrayCiudad = []
    arrayIdContact = []
    arrayCompañia = []
    arrayRegion = []
    arrayChannels = []
    arrayConfirmados = []
    arrayOptions3 = []
    arrayPais = []

    let elementExists;

    if (element == null) {
        elementExists = false
    } else {
        elementExists = true
    }

    let createDiv = document.createElement('div')
    createDiv.className = "crearContacto"
    createDiv.id = "createDiv"
    contenedor.appendChild(createDiv)
    arrayContactos.push(createDiv)
    let h3create = document.createElement('h3')
    h3create.textContent = "Crear contacto."
    h3create.style.color = "rgb(255, 181, 44)"
    let h3cerrar = document.createElement('h3')
    h3cerrar.textContent = "X"
    h3cerrar.className = "h3cerrar"
    let navDiv = document.createElement('div')
    navDiv.className = "navContacto"
    let contactPrimary = document.createElement('div')
    let labelNombre = document.createElement('label')
    labelNombre.innerHTML = `Nombre:<span class="spancito">*</span>`
    let inputNombre = document.createElement('input')
    inputNombre.setAttribute('placeholder', 'Ingrese nombre')

    inputNombre.addEventListener('focusout', () => {
        inputNombre.style.boxShadow = "0px 0px 5px black"
        inputNombre.style.border = "none"
        if (inputNombre.value == "") {
            inputNombre.style.border = "1px solid red"
            inputNombre.style.boxShadow = "0px 0px 5px red"
        } else {
            inputNombre.style.border = "none"
        }
    })
    let labelApellido = document.createElement('label')
    labelApellido.innerHTML = `Apellido:<span class="spancito">*</span>`
    let inputApellido = document.createElement('input')
    inputApellido.setAttribute('placeholder', 'Ingrese apellido')

    inputApellido.addEventListener('focusout', () => {
        inputApellido.style.boxShadow = "0px 0px 5px black"
        inputApellido.style.border = "none"
        if (inputApellido.value == "") {
            inputApellido.style.border = "1px solid red"
            inputApellido.style.boxShadow = "0px 0px 5px red"
        } else {
            inputApellido.style.border = "none"
        }
    })
    let labelCargo = document.createElement('label')
    labelCargo.innerHTML = `Cargo:<span class="spancito">*</span>`
    let inputCargo = document.createElement('select')
    inputCargo.setAttribute('placeholder', 'Ingrese cargo')
    inputCargo.id = "selectCargo"

    let option0 = document.createElement('option')
    option0.textContent = "Seleccionar Cargo"
    option0.value = 7
    arrayOptions3.push(option0)
    let option1 = document.createElement('option')
    option1.textContent = "UX Designer"
    option1.value = 1
    arrayOptions3.push(option1)
    let option2 = document.createElement('option')
    option2.textContent = "UI Designer"
    option2.value = 5
    arrayOptions3.push(option2)
    let option3 = document.createElement('option')
    option3.textContent = "Sales"
    option3.value = 3
    arrayOptions3.push(option3)
    let option4 = document.createElement('option')
    option4.textContent = "Product"
    option4.value = 4
    arrayOptions3.push(option4)
    let option5 = document.createElement('option')
    option5.textContent = "Developer"
    option5.value = 2
    arrayOptions3.push(option5)
    let option6 = document.createElement('option')
    option6.textContent = "DevOps Engineer"
    option6.value = 6
    arrayOptions3.push(option6)

    inputCargo.appendChild(option0)
    inputCargo.appendChild(option1)
    inputCargo.appendChild(option2)
    inputCargo.appendChild(option3)
    inputCargo.appendChild(option4)
    inputCargo.appendChild(option5)
    inputCargo.appendChild(option6)

    let labelEmail = document.createElement('label')
    labelEmail.innerHTML = `Email:<span class="spancito">*</span>`
    let inputEmail = document.createElement('input')

    inputEmail.addEventListener('focusout', () => {
        inputEmail.style.border = "none"
        inputEmail.style.boxShadow = "0px 0px 5px black"
        if (inputEmail.value == "") {
            inputEmail.style.border = "1px solid red"
            inputEmail.style.boxShadow = "0px 0px 5px red"
        } else {
            inputEmail.style.border = "none"
        }
    })
    inputEmail.setAttribute('placeholder', 'Ingrese email')

    let labelCompañia = document.createElement('label')
    labelCompañia.innerHTML = `Compañia:<span class="spancito">*</span>`
    let compañiaSelect = document.createElement('select')
    compañiaSelect.id = "compañiaSelect"

    compañiaSelect.setAttribute('onchange', 'changeThis5(compañiaSelect)')



    h3cerrar.addEventListener('click', () => {
        arrayContactos.forEach(element => {
            element.remove();
        })
    })

    createDiv.appendChild(navDiv)
    navDiv.appendChild(h3create)
    navDiv.appendChild(h3cerrar)

    contactPrimary.style.display = "flex"
    contactPrimary.style.justifyContent = "space-evenly"
    contactPrimary.className = "contactPrimary"

    let linea = document.createElement('div')
    linea.className = "linea"

    createDiv.appendChild(contactPrimary)
    createDiv.appendChild(linea)

    let div1 = document.createElement('div')
    div1.className = "divInputardo"
    contactPrimary.appendChild(div1)
    div1.appendChild(labelNombre)
    div1.appendChild(inputNombre)

    let div2 = document.createElement('div')
    div2.className = "divInputardo"
    contactPrimary.appendChild(div2)
    div2.appendChild(labelApellido)
    div2.appendChild(inputApellido)

    let div3 = document.createElement('div')
    div3.className = "divInputardo"
    contactPrimary.appendChild(div3)
    div3.appendChild(labelCargo)
    div3.appendChild(inputCargo)

    let div4 = document.createElement('div')
    div4.className = "divInputardo"
    contactPrimary.appendChild(div4)
    div4.appendChild(labelEmail)
    div4.appendChild(inputEmail)

    let div5 = document.createElement('div')
    div5.className = "divInputardo"
    contactPrimary.appendChild(div5)
    div5.appendChild(labelCompañia)
    div5.appendChild(compañiaSelect)

    compañiaSelect.style.width = "250px"
    compañiaSelect.style.height = "30px"

    let opcion = document.createElement('option')
    opcion.textContent = "Ingrese compañia"
    opcion.setAttribute("value", 1)
    compañiaSelect.appendChild(opcion)
    arrayCompanies.push(opcion)
    let value2 = 2

    fetch("http://localhost:4000/api/v1/companies", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                arrayCompañia.push(element)
                let option = document.createElement('option')
                option.setAttribute("value", value2)
                option.textContent = element.name
                compañiaSelect.appendChild(option)
                option.style.fontFamily = "'Syncopate', sans-serif;"
                arrayCompanies.push(option)
                value2++
            })
        })

    // REGION

    let labelRegion = document.createElement('label')
    labelRegion.textContent = "Región:"
    let selectRegion = document.createElement('select')
    selectRegion.id = "selectRegion"
    selectRegion.setAttribute('onchange', 'changeThis5(selectRegion)')
    let contactSecondary = document.createElement('div')
    contactSecondary.className = "contactPrimary"


    let linea2 = document.createElement('div')
    linea2.className = "linea"

    createDiv.appendChild(contactSecondary)
    createDiv.appendChild(linea2)

    fetch("http://localhost:4000/api/v1/region", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {

            // PAIS

            let div6 = document.createElement('div')
            div6.className = "divInputardo"
            contactSecondary.appendChild(div6)
            div6.appendChild(labelRegion)
            div6.appendChild(selectRegion)

            let div7 = document.createElement('div')
            div7.className = "divInputardo"
            let labelCountry = document.createElement('label')
            labelCountry.textContent = "País:"
            let selectPais = document.createElement('select')
            selectPais.id = "selectPais"
            selectPais.setAttribute('disabled', true)
            let optionDefault2 = document.createElement('option')
            optionDefault2.textContent = "Seleccionar Pais"
            optionDefault2.setAttribute("value", 1)
            arrayPais.push(optionDefault2)
            selectPais.appendChild(optionDefault2)
            let value3 = 2
            contactSecondary.appendChild(div7)
            div7.appendChild(labelCountry)
            div7.appendChild(selectPais)

            // CIUDAD

            let div8 = document.createElement('div')
            div8.className = "divInputardo"
            let labelCity = document.createElement('label')
            labelCity.textContent = "Ciudad:"
            let selectCity = document.createElement('select')
            selectCity.id = "selectCity"
            selectCity.setAttribute('disabled', true)

            let optionDefault3 = document.createElement('option')
            optionDefault3.textContent = "Seleccionar Ciudad"
            arrayCiudad.push(optionDefault3)
            optionDefault3.setAttribute("value", 1)
            selectCity.appendChild(optionDefault3)

            contactSecondary.appendChild(div8)
            div8.appendChild(labelCity)
            div8.appendChild(selectCity)

            // DIRECCION

            let div9 = document.createElement('div')
            div9.className = "divInputardo"
            let labelAddress = document.createElement('label')
            labelAddress.textContent = "Dirección:"
            let inputAddress = document.createElement('input')
            inputAddress.setAttribute('disabled', true)
            inputAddress.id = "inputAddress"
            inputAddress.setAttribute("placeholder", "Ingrese una direccion")

            inputAddress.addEventListener('focusout', () => {
                inputAddress.style.boxShadow = "0px 0px 5px black"
                inputAddress.style.border = "none"
                if (inputAddress.value == "") {
                    inputAddress.style.border = "1px solid red"
                    inputAddress.style.boxShadow = "0px 0px 5px red"
                } else {
                    inputAddress.style.border = "none"
                }
            })

            contactSecondary.appendChild(div9)
            div9.appendChild(labelAddress)
            div9.appendChild(inputAddress)

            // INTERES

            let div10 = document.createElement('div')
            div10.className = "divInputardo"
            let labelInteres = document.createElement('label')
            labelInteres.textContent = "INTERES:"
            let selectInteres = document.createElement('select')
            selectInteres.id = "selectInteres"

            let option0 = document.createElement('option')
            option0.textContent = "0%"
            let option25 = document.createElement('option')
            option25.textContent = "25%"
            let option50 = document.createElement('option')
            option50.textContent = "50%"
            let option75 = document.createElement('option')
            option75.textContent = "75%"
            let option100 = document.createElement('option')
            option100.textContent = "100%"

            contactSecondary.appendChild(div10)
            div10.appendChild(labelInteres)
            div10.appendChild(selectInteres)

            selectInteres.appendChild(option0)
            selectInteres.appendChild(option25)
            selectInteres.appendChild(option50)
            selectInteres.appendChild(option75)
            selectInteres.appendChild(option100)


            let optionDefault = document.createElement('option')
            optionDefault.textContent = "Ingresar una region"
            optionDefault.setAttribute("value", 1)
            selectRegion.appendChild(optionDefault)
            arrayRegion.push(optionDefault)
            let value = 2

            data.forEach(element => {
                let optionRegion = document.createElement('option')
                optionRegion.setAttribute("value", value)
                optionRegion.textContent = element.name
                selectRegion.appendChild(optionRegion)
                arrayRegion.push(optionRegion)
                value++
            });

            selectRegion.setAttribute("onchange", "changeThis()")
            selectPais.setAttribute('onchange', 'changeThis2()')
            selectCity.setAttribute('onchange', 'changeThis3()')

            if (elementExists) {

                inputNombre.value = element.firstName
                inputApellido.value = element.lastName
                inputEmail.value = element.email
                let role = element.Role.name
                let index;
                let compañia = element.Company.name
                let region = element.City.Country.Region.name
                let pais = element.City.Country.name
                let ciudad = element.City.name
                let interes = element.interest

                arrayOptions3.forEach(element => {
                    if (element.textContent == role) {
                        index = arrayOptions3.indexOf(element)
                    }
                    inputCargo.selectedIndex = index
                });

                arrayCompanies.forEach(element => {
                    if (element.textContent == compañia) {
                        compañiaSelect.selectedIndex = arrayCompanies.indexOf(element)
                    }
                })
                arrayRegion.forEach(element => {
                    if (element.textContent == region) {
                        let index = arrayRegion.indexOf(element)

                        selectRegion.selectedIndex = index
                    }
                })
                selectCity.removeAttribute('disabled')
                selectPais.removeAttribute('disabled')
                fetch("http://localhost:4000/api/v1/countries", {
                        headers: {
                            'Content-Type': 'application/json',
                            'user-token': sessionStorage.getItem('jwt')
                        }
                    })

                    .then(response => response.json())
                    .then(data => {
                        let valor3 = 2
                        data.forEach(element => {
                            if (element.Region.name == selectRegion.options[selectRegion.selectedIndex].textContent) {
                                let option = document.createElement('option')
                                option.textContent = element.name
                                option.setAttribute("value", valor3)
                                arrayOptions.push(option)
                                arrayPais.push(option)
                                selectPais.appendChild(option)
                                valor3++
                            }
                        });

                        arrayPais.forEach(element => {
                            if (element.textContent == pais) {
                                selectPais.selectedIndex = arrayPais.indexOf(element)
                            }
                        })
                    })

      
                fetch("http://localhost:4000/api/v1/cities", {
                        headers: {
                            'Content-Type': 'application/json',
                            'user-token': sessionStorage.getItem('jwt')
                        }
                    })

                    .then(response => response.json())
                    .then(data => {
                        let valor4 = 2
                        data.forEach(element => {
                            if (element.Country.name == selectPais[selectPais.selectedIndex].textContent) {
                                let option = document.createElement('option')
                                option.setAttribute('value', valor4)
                                option.textContent = element.name
                                selectCity.appendChild(option)
                                arrayOptions2.push(option)
                                arrayCiudad.push(option)
                                valor4++;
                            }
                        });


                        arrayCiudad.forEach(element => {
                            if (element.textContent == ciudad) {
                                selectCity.selectedIndex = arrayCiudad.indexOf(element)
                            }
                        })

                    })

                inputAddress.removeAttribute('disabled')
                inputAddress.value = element.address
                let esa = selectInteres.options
                for (i = 0; i < esa.length; i++) {
                    let word = esa[i].textContent
                    let wordPiola = parseInt(word.slice(0, -1))
                    if (wordPiola == interes) {
                        selectInteres.selectedIndex = i
                    }

                }

                element.Media.forEach(element => {

                    buildChannels(element)
                });


                if (elementExists) {
                    channelExists = true
                } else {
                    channelExists = false
                }

            }


        })

    let div = document.createElement('div')
    div.id = "esa"
    createDiv.appendChild(div)
    let h3Mas = document.createElement('h3')
    let h3Agregar = document.createElement('h3')
    h3Agregar.textContent = "AGREGAR UN CANAL"
    h3Agregar.id = "h3Agregar"
    h3Mas.id = "h3Mas"
    h3Mas.textContent = "+"
    div.appendChild(h3Mas)
    div.appendChild(h3Agregar)

    h3Mas.addEventListener('click', () => {
        
        h3Agregar.style.display = "none"
        let valor = arrayChannels.length
        if (valor >= 4) {
            h3Mas.style.display = "none"
        }
        if (arrayChannels.length < 5) {
            buildChannels()
            valor++
        } else {
            h3Mas.style.display = "none"
        }
    })

    let divButtons = document.createElement('div')
    divButtons.className = "divButtons"
    let buttonAgregar = document.createElement('button')
    buttonAgregar.className = "buttonAdd"
    buttonAgregar.textContent = "GUARDAR CONTACTO"
    let buttonCancelar = document.createElement('button')
    buttonCancelar.textContent = "CANCELAR"
    buttonCancelar.className = "buttonAdd"

    divButtons.appendChild(buttonAgregar)
    divButtons.appendChild(buttonCancelar)
    createDiv.appendChild(divButtons)

    buttonAgregar.addEventListener('click', () => {
        let contact;

        if (elementExists) {
            contact = element.id_contacts
        }

        arrayAvisos2.forEach(element => {
            element.remove();
        });

        arrayAvisos.forEach(element => {
            element.remove();
        });

        // FULL VALIDATION

        let validation = true

        if (inputNombre.value == "") {
            inputNombre.style.border = "1px solid red"
            inputNombre.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            inputNombre.style.border = "none"
            inputNombre.style.boxShadow = "0px 0px 5px black"
        }

        if (inputApellido.value == "") {
            inputApellido.style.border = "1px solid red"
            inputApellido.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            inputApellido.style.border = "none"
            inputApellido.style.boxShadow = "0px 0px 5px black"
        }
        if (inputCargo.value == 7) {
            inputCargo.style.border = "1px solid red"
            inputCargo.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            inputCargo.style.border = "none"
            inputCargo.style.boxShadow = "0px 0px 5px black"
        }


        if (inputEmail.value == "") {
            inputEmail.style.border = "1px solid red"
            inputEmail.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            inputEmail.style.border = "none"
            inputEmail.style.boxShadow = "0px 0px 5px black"
        }

        if (compañiaSelect.value == 1) {
            compañiaSelect.style.border = "1px solid red"
            compañiaSelect.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            compañiaSelect.style.border = "none"
            compañiaSelect.style.boxShadow = "0px 0px 5px black"
        }

        if (selectRegion.value == 1) {
            selectRegion.style.border = "1px solid red"
            selectRegion.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            selectRegion.style.border = "none"
            selectRegion.style.boxShadow = "0px 0px 5px black"
        }

        if (selectPais.value == 1) {
            selectPais.style.border = "1px solid red"
            selectPais.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            selectPais.style.border = "none"
            selectPais.style.boxShadow = "0px 0px 5px black"
        }

        if (selectCity.value == 1) {
            selectCity.style.border = "1px solid red"
            selectCity.style.boxShadow = "0px 0px 5px red"
            validation = false
        } else {
            selectCity.style.border = "none"
            selectCity.style.boxShadow = "0px 0px 5px black"
        }

        if (inputAddress.value == "") {
            inputAddress.style.border = "1px solid red"
            inputAddress.style.boxShadow = "0px 0px 7px red"
            validation = false
        } else {
            inputAddress.style.border = "none"
            inputAddress.style.boxShadow = "0px 0px 5px black"
        }


        arrayChannels.forEach(element => {
            if (element.childNodes[3].childNodes[0].textContent !== "Guardado") {

                element.style.border = "2px solid red"
                element.style.boxShadow = "0px 0px 7px red"
                element.childNodes[4].textContent = "El canal no esta guardado"
                element.childNodes[4].style.display = "block"
                validation = false

            }
        })

        if (validation) {
            let nombre = inputNombre.value
            let apellido = inputApellido.value
            let email = inputEmail.value
            let direccion = inputAddress.value
            let companyId;
            let cityId;

            let index = document.getElementById('compañiaSelect').selectedIndex
            let compañia = document.getElementById('compañiaSelect')[index].textContent
            let index3 = document.getElementById('selectCity').selectedIndex
            let ciudad = document.getElementById('selectCity')[index3].textContent
            let index5 = document.getElementById('selectInteres').selectedIndex
            let Theinteres = document.getElementById('selectInteres')[index5].textContent
            let interes = Theinteres.substring(0, Theinteres.length - 1)
            let cargo = document.getElementById('selectCargo').value



            // BUSCANDO COMPAÑIA

            arrayCompañia.forEach(element => {
                if (element.name == compañia) {
                    companyId = element.id_companies
                }
            })

            // BUSCANDO CIUDAD

            arrayCiudad2.forEach(element => {
                if (element.name == ciudad) {
                    cityId = element.id_cities
                }
            })

            var holyValue;

            var leBody = JSON.stringify({
                firstName: nombre,
                lastName: apellido,
                email: email,
                interest: parseInt(interes),
                role: parseInt(cargo),
                address: direccion,
                city: parseInt(cityId),
                company: parseInt(companyId)
            })

            if (!channelExists) {
         
                fetch(`http://localhost:4000/api/v1/contacts`, {

                        method: "POST",
                        body: leBody,
                        json: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'user-token': sessionStorage.getItem('jwt')
                        }
                    })

                    .then(response => response.json())
                    .then(data => {
                        arrayIdContact.push(data.id_contacts)
                        holyValue = data.id_contacts
                        if (arrayChannels.length > 0) {
                            for (i = 0; i < arrayChannels.length; i++) {

                                var leBody2 = JSON.stringify({
                                    channeldetail: arrayChannels[i].childNodes[1].childNodes[1].value,
                                    preferences: parseInt(arrayChannels[i].childNodes[2].childNodes[1].value),
                                    channels: parseInt(arrayChannels[i].childNodes[0].childNodes[1].value),
                                    id_contacts: parseInt(holyValue)
                                })

                                console.log(leBody2)

                                fetch(`http://localhost:4000/api/v1/contacts/media`, {

                                        method: "POST",
                                        body: leBody2,
                                        json: true,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'user-token': sessionStorage.getItem('jwt')
                                        }
                                    })
                                    .then(response => console.log(response))
                                    .then(data => {
                                        console.log(data)
                                        
                                        let enabled;

                                        if (i == arrayChannels.length) {
                                            enabled = true
                                        } else {
                                            enabled = false
                                        }

                                        if (enabled) {

                                            arrayRegistros.forEach(element => {
                                                element.remove();
                                            })

                                            begin();

                                            document.getElementById('createDiv').remove();
                                        }
                                    })
                            }
                        } else {

                            arrayRegistros.forEach(element => {
                                element.remove();
                            })

                            begin();

                            document.getElementById('createDiv').remove();
                        }
                    })
 
            } else {

                fetch(`http://localhost:4000/api/v1/contacts/${contact}`, {

                        method: "PUT",
                        body: leBody,
                        json: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'user-token': sessionStorage.getItem('jwt')
                        }
                    })
                    .then(response => response.json())
                    .then(data => {

                        fetch(`http://localhost:4000/api/v1/contacts/media/${contact}`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json',
                                'user-token': sessionStorage.getItem('jwt')
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                        })

                    

                        if (arrayChannels.length > 0) {
                            let value = 0;
                            console.log(arrayChannels.length)
                            for (i = 0; i < arrayChannels.length; i++) {
                                console.log(value)
                                var leBody2 = JSON.stringify({
                                    channeldetail: arrayChannels[i].childNodes[1].childNodes[1].value,
                                    preferences: parseInt(arrayChannels[i].childNodes[2].childNodes[1].value),
                                    channels: parseInt(arrayChannels[i].childNodes[0].childNodes[1].value),
                                    id_contacts: contact
                                })

                                fetch(`http://localhost:4000/api/v1/contacts/media`, {

                                        method: "POST",
                                        body: leBody2,
                                        json: true,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'user-token': sessionStorage.getItem('jwt')
                                        }
                                    })
                                    .then(response => response.json())
                                    .then(data => {
        
                                        let enabled;

                                        if (value == arrayChannels.length) {
                                            enabled = true
                                          
                                        } else {
                                            enabled = false
                                        }

                                        if (enabled) {
        
                                            arrayRegistros.forEach(element => {
                                                element.remove();
                                            })

                                            begin();
                                            let exit =  document.getElementById('createDiv')
                                            exit.remove();
                                        }
                                    })
                                    value++
                            }
                        } else {

                            arrayRegistros.forEach(element => {
                                element.remove();
                            })
                            begin();

                            document.getElementById('createDiv').remove();
                        }
                    })


            }

        }
    })

    buttonCancelar.addEventListener('click', () => {
        arrayContactos.forEach(element => {
            element.remove();
        })
    })

}

async function buildChannels(element) {

    let contactThird = document.createElement('div')
    contactThird.className = "contactPrimary2"
    let div = document.getElementById('esa')

    div.appendChild(contactThird)
    arrayChannels.push(contactThird)
    let div11 = document.createElement('div')
    div11.className = "divInputardo"
    let labelSelect = document.createElement('label')
    labelSelect.textContent = "Canal De Contacto:"
    let selectChannel = document.createElement('select')
    arrayComparison.push(contactThird)
    contactThird.appendChild(div11)
    div11.appendChild(labelSelect)
    div11.appendChild(selectChannel)


    let optionDefault4 = document.createElement('option')
    optionDefault4.textContent = "Seleccionar Canal"
    optionDefault4.value = 7    
    selectChannel.appendChild(optionDefault4)


    await fetch("http://localhost:4000/api/v1/channels", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })


        .then(response => response.json())
        .then(data => {
            let option2 = 1
            arrayChannels2 = []
            data.forEach(element => {
                let option = document.createElement('option')
                option.setAttribute("value", option2)
                option.textContent = element.name
                arrayChannels2.push(element.name)
                selectChannel.appendChild(option)
                option2++
            })
        })


    //

    let div12 = document.createElement('div')
    div12.className = "divInputardo"
    let labelUser = document.createElement('label')
    labelUser.textContent = "Cuenta de Usuario:"
    let inputUser = document.createElement('input')
    inputUser.setAttribute("placeholder", "@ejemplo")
    inputUser.className = "inputUser"
    contactThird.appendChild(div12)
    div12.appendChild(labelUser)
    div12.appendChild(inputUser)

    //

    let div13 = document.createElement('div')
    div13.className = "divInputardo"
    let labelPreferences = document.createElement('label')
    labelPreferences.textContent = "Preferencias:"
    let selectPreferences = document.createElement('select')
    let optionDefault5 = document.createElement('option')
    optionDefault5.textContent = "Sin preferencia"
    optionDefault5.value = 3
    let optionDefault6 = document.createElement('option')
    optionDefault6.value = 1
    optionDefault6.textContent = "No molestar"
    let optionDefault7 = document.createElement('option')
    optionDefault7.value = 2
    optionDefault7.textContent = "Canal Favorito"

    contactThird.appendChild(div13)
    div13.appendChild(labelPreferences)
    div13.appendChild(selectPreferences)
    selectPreferences.appendChild(optionDefault5)
    selectPreferences.appendChild(optionDefault6)
    selectPreferences.appendChild(optionDefault7)

    let divImg = document.createElement('div')
    divImg.className = "divImg"
    let save = document.createElement('h3')
    save.className = "img save"
    let discard = document.createElement('h3')
    save.textContent = "GUARDAR"
    discard.textContent = "BORRAR"
    discard.className = "img discard"
    contactThird.appendChild(divImg)
    divImg.appendChild(save)
    divImg.appendChild(discard)

    let thetexto = document.createElement('h3')
    thetexto.style.display = "none"
    thetexto.className = "aviso"
    contactThird.appendChild(thetexto)

    save.addEventListener('click', () => {

        arrayAvisos2.forEach(element => {
            element.remove();


        });

        arrayAvisos.forEach(element => {
            element.remove();
        });

        // VALIDACION 1: QUE TODOS LOS CAMPOS ESTEN COMPLETOS

        let validation1;
        let validation2;

        if (selectChannel.value == 0) {
            validation1 = false
            selectChannel.style.border = "1px solid red"
            selectChannel.style.boxShadow = "0px 0px 3px red"
            thetexto.textContent = "Ingresar un canal"
            thetexto.style.display = "block"
            thetexto.style.color = "red"
        } else {
            validation1 = true
            selectChannel.style.border = "none"
            selectChannel.style.boxShadow = "none"
        }

        if (inputUser.value == "") {
            validation2 = false
            inputUser.style.border = "1px solid red"
            inputUser.style.boxShadow = "0px 0px 3px red"
            thetexto.textContent = "Ingresar un usuario"
            thetexto.style.color = "red"
            thetexto.style.display = "block"
        } else {
            validation2 = true
            inputUser.style.border = "none"
            inputUser.style.boxShadow = "none"
        }

        if (validation1 == true && validation2 == true) {
            let validation = true
            if (save.textContent == "GUARDAR") {

                arrayConfirmados.forEach(element => {
                    if (element.childNodes[0].childNodes[1].value == selectChannel.value) {
                        selectChannel.style.border = "1px solid red"
                        selectChannel.style.boxShadow = "0px 0px 5px red"
                        thetexto.textContent = "Ya guardaste este canal."
                        thetexto.style.textAlign = "center"
                        thetexto.style.color = "red"
                        thetexto.style.display = "block"
                        validation = false
                    }
                })

                if (validation) {
                    contactThird.style.border = "3px solid green"
                    contactThird.style.boxShadow = "0px 0px 10px green"
                    save.textContent = "Guardado"
                    save.style.backgroundColor = "rgb(23, 100, 172)"
                    selectChannel.setAttribute("disabled", true)
                    inputUser.setAttribute("disabled", true)
                    selectPreferences.setAttribute("disabled", true)
                    arrayConfirmados.push(contactThird)
                    arrayAvisos.forEach(element => {
                        element.remove()
                    })
                    thetexto.textContent = "Canal guardado!"
                    thetexto.style.color = "green"
                    thetexto.style.display = "block"
                }

            } else {
                contactThird.style.boxShadow = "none"
                save.textContent = "GUARDAR"
                save.style.backgroundColor = "green"
                contactThird.style.border = "3px solid black"
                selectChannel.removeAttribute("disabled")
                inputUser.removeAttribute("disabled")
                selectPreferences.removeAttribute("disabled")
                let valuing = arrayConfirmados.indexOf(contactThird)
                delete arrayConfirmados[valuing]
                thetexto.style.display = "none"

            }
        }

    })

    discard.addEventListener('click', () => {
        if (arrayChannels.length < 6) {
            document.getElementById('h3Mas').style.display = "block"
            document.getElementById('h3Agregar').style.display = "none"
        }

        let valuing = arrayChannels.indexOf(contactThird)
        arrayChannels.splice(valuing, 1)
        contactThird.remove()

        if (arrayChannels.length == 0) {
            document.getElementById('h3Agregar').style = "block"
        }

    })

    inputUser.addEventListener('focusout', () => {
        if (inputUser.value == "") {
            inputUser.style.border = "1px solid red"
            inputUser.style.boxShadow = "0px 0px 3px red"
        } else {
            inputUser.style.border = "none"
            inputUser.style.boxShadow = "none"
        }
    })

    if (channelExists) {
        document.getElementById('h3Agregar').style.display = "none"
        let valorcillo = element.Channel.name

        arrayChannels2.forEach(element => {
            if (element == valorcillo) {
                let valor = arrayChannels2.indexOf(element) + 1
                selectChannel.selectedIndex = valor
            }

        })
        inputUser.removeAttribute("disabled")
        inputUser.value = element.channeldetail
        selectPreferences.removeAttribute("disabled")

        let lol = selectPreferences.options
        for (i = 0; i < lol.length; i++) {
            if (selectPreferences.options[i].textContent == element.Preference.name) {
                selectPreferences.value = selectPreferences.options[i].value
            }
        }
    }


}

function hasDuplicates(arr) {
    return arr.some(x => arr.indexOf(x) !== arr.lastIndexOf(x));
}

function build(element) {
    // DIV CONTENEDOR DEL ELEMENTO
    
    
    let data = document.createElement('div')
    data.className = "data"
    arrayRegistros.push(data)

    let divInput = document.createElement('div')
    divInput.className = "checkbox"
    let input = document.createElement('input')
    arrayCheckbox.push(input)
    input.setAttribute('type', "checkbox")
    input.style.cursor = "pointer"
    input.addEventListener('click', () => {
        if (input.checked == true) {
         
            marcados += 1
            if (seleccionar.style.display !== "flex") {
                seleccionar.animate([{
                        height: "0px",
                        opacity: 0
                    },
                    {
                        height: "30px",
                        opacity: 1
                    }
                ], {
                    duration: 100,
                    iterations: 1
                });

            }
            seleccionar.style.display = "flex"
            textSeleccionar.textContent = `${marcados} seleccionados`
            data.style.backgroundColor = "rgb(88, 32, 32)"
        } else {
            marcados -= 1
            checkboxMaster.checked = false
            tablero.style.backgroundColor = ""
            input.style.backgroundColor = ""
            if (marcados == 0) {
                seleccionar.style.display = "none"
            } else {
                textSeleccionar.textContent = `${marcados} seleccionados`
            }
            data.style.backgroundColor = ""
        }
    })

    contenedor.appendChild(data)
    data.appendChild(divInput)
    divInput.appendChild(input)

    // SECCION CONTACTO

    let divContacto = document.createElement('div')
    divContacto.className = "contacto2"
    let spanImg = document.createElement('span')
    let imgUser = document.createElement('img')
    imgUser.setAttribute('src', '../assets/icon-user.png')
    let contactoDatos = document.createElement('div')
    contactoDatos.className = "contactodatos"
    let h3contacto = document.createElement('h3')
    h3contacto.textContent = element.firstName
    let h4contacto = document.createElement('h4')
    h4contacto.textContent = element.email
    data.appendChild(divContacto)
    divContacto.appendChild(spanImg)
    spanImg.appendChild(imgUser)
    divContacto.appendChild(contactoDatos)
    contactoDatos.appendChild(h3contacto)
    contactoDatos.appendChild(h4contacto)

    // SECCION PAIS

    let divPais = document.createElement('div')
    divPais.className = "pais2"
    let paisContacto = document.createElement('div')
    paisContacto.className = "contactodatos"
    let h3pais = document.createElement('h3')
    let h4pais = document.createElement('h4')
    h3pais.textContent = element.City.Country.name
    h4pais.textContent = element.City.Country.Region.name

    data.appendChild(divPais)
    divPais.appendChild(paisContacto)
    paisContacto.appendChild(h3pais)
    paisContacto.appendChild(h4pais)

    // SECCION COMPANIA

    let divCompania = document.createElement('div')
    divCompania.className = "compania2"
    let h3Compania = document.createElement('h3')
    h3Compania.textContent = element.Company.name

    data.appendChild(divCompania)
    divCompania.appendChild(h3Compania)

    // SECCION ROL

    let divRole = document.createElement('div')
    divRole.className = "compania2"
    let h3Role = document.createElement('h3')
    h3Role.textContent = element.Role.name

    data.appendChild(divRole)
    divRole.appendChild(h3Role)

    // SECCION CHANNELS

    let divIntereses = document.createElement('div')
    divIntereses.className = "intereses2"
    let divInterest = document.createElement('div')
    divInterest.className = "interests"

    data.appendChild(divIntereses)
    divIntereses.appendChild(divInterest)

    let noElements = true

    if (element.Media.length !== 0) {
        noElements = false
    }

    if (noElements == true) {
        let interesDiv = document.createElement('div')
        interesDiv.className = "interest"
        let interesh3 = document.createElement('h3')
        interesh3.textContent = "Pendiente"

        divInterest.appendChild(interesDiv)
        interesDiv.appendChild(interesh3)
    } else {

        element.Media.forEach(element => {
            let interesDiv = document.createElement('div')
            interesDiv.className = "interest"
            let interesh3 = document.createElement('h3')
            interesh3.textContent = element.Channel.name

            divInterest.appendChild(interesDiv)
            interesDiv.appendChild(interesh3)
        })

    }

    // SECCION INTERES

    let interesDiv = document.createElement('div')
    interesDiv.className = "level2"
    let conjuntoDiv = document.createElement('div')
    conjuntoDiv.className = "conjunto"
    let interesh3 = document.createElement('h3')
    interesh3.textContent = element.interest + "%"
    
    let medidor = document.createElement('div')
    medidor.className = "medidor"
    let nivel = document.createElement('div')

    nivel.className = "nivel"
    nivel.style.width = `${element.interest}%`

    if (element.interest <= 25) {
        nivel.style.backgroundColor = "red"
    } else if (element.interest <= 50) {
        nivel.style.backgroundColor = "orange"
    } else if (element.interest <= 75) {
        nivel.style.backgroundColor = "yellow"
    } else if (element.interest >= 75) {
        nivel.style.backgroundColor = "green"
    }
    data.appendChild(interesDiv)
    interesDiv.appendChild(conjuntoDiv)
    conjuntoDiv.appendChild(interesh3)
    conjuntoDiv.appendChild(medidor)
    medidor.appendChild(nivel)

    // ACCIONES 

    let divAcciones = document.createElement('div')
    divAcciones.className = "accion2"
    let h3accion = document.createElement('h3')
    h3accion.textContent = "..."
    let imgEdit = document.createElement('img')
    imgEdit.id = "imgEdit"
    imgEdit.setAttribute("src", "../assets/edit.png")
    let imgDelete = document.createElement('img')
    imgDelete.id = "imgDelete"
    imgDelete.setAttribute("src", "../assets/delete.png")
    imgEdit.style.display = "none"
    imgDelete.style.display = "none"

    data.appendChild(divAcciones)
    divAcciones.appendChild(h3accion)
    divAcciones.appendChild(imgEdit)
    divAcciones.appendChild(imgDelete)

    // EVENTS

    imgDelete.addEventListener('click', () => {

        arrayRegistros.forEach(element => {
            element.style.border = ""
        });

        arrayWosa.forEach(element => {
            element.remove();
        })
        let divWosa = document.createElement('div')
        arrayWosa.push(divWosa)
        divWosa.className = "wosa"
        let h3Wosa = document.createElement('h3')
        h3Wosa.textContent = "Seguro quieres eliminar este contacto?"

        let divButtons = document.createElement('div')
        let buttonYes = document.createElement('button')
        buttonYes.textContent = "SI"
        let buttonNo = document.createElement('button')
        buttonNo.textContent = "NO"
        login.appendChild(divWosa)
        divWosa.appendChild(h3Wosa)
        divWosa.appendChild(divButtons)
        divButtons.appendChild(buttonYes)
        divButtons.appendChild(buttonNo)

        data.style.border = "4px solid red"


        buttonNo.addEventListener('click', () => {
            divWosa.remove()


            data.style.border = ""

        })

        let theval = element.id_contacts
        console.log(theval)

        buttonYes.addEventListener('click', () => {

            divWosa.remove()

            fetch(`http://localhost:4000/api/v1/contacts/${theval }`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'user-token': sessionStorage.getItem('jwt')
                    }
                })

                .then(response => response.json())
                .then(data => {
                    arrayRegistros.forEach(element => {
                        element.remove()
                    });

                    begin();

                })



        })

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    })

    imgEdit.addEventListener('click', () => {
        channelExists = true
        buildContact(element)
    })

    data.addEventListener('mouseover', () => {
        h3accion.style.display = "none"
        imgEdit.style.display = "block"
        imgDelete.style.display = "block"

    })

    data.addEventListener('mouseout', () => {
        h3accion.style.display = "block"
        imgEdit.style.display = "none"
        imgDelete.style.display = "none"

    })
}

begin();

fetch("http://localhost:4000/api/v1/cities", {
        headers: {
            'Content-Type': 'application/json',
            'user-token': sessionStorage.getItem('jwt')
        }
    })

    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            arrayCiudad2.push(element)
        })
    })
