let masterUl = document.getElementById("myUL")
let agregar = document.getElementById("agregar")
let agregar2 = document.getElementById('agregar2')
let addRegion = document.getElementById('addRegion')
let login = document.getElementById('login')
let nombreInput = document.getElementById('nombre')
let closeTab = document.getElementById('closeTab')
let arrayMensaje = []
let gelato = []
let arrayRegistros = []
let arrayDivCity = []
let arrayCities = []
let countriesId = []
let arrayLoquillo = []
let arrayDivCountry = []
let arrayDivSeguro = []

let profile = sessionStorage.getItem('profile')

if(profile == "Basic") {
    document.getElementById('userTab').style.display = "none"
}

// GET REGIONS

closeTab.addEventListener('click', () => {
    addRegion.style.display = "none"
})

agregar.addEventListener('click', () => {

    arrayDivSeguro.forEach(element => {
        element.remove()
    });

    arrayDivCity.forEach(element => {
        element.remove()
    });

    arrayMensaje.forEach(element => {
        element.remove()
    });
    addRegion.animate([{
            opacity: 0
        },
        {
            opacity: 1
        }
    ], {
        duration: 300,
        iterations: 1
    });
    addRegion.style.display = "block"


})

agregar2.addEventListener('click', () => {
    arrayMensaje.forEach(element => {
        element.remove()
    });
    if (nombreInput.value == "") {
        let h3p = document.createElement('p')
        arrayMensaje.push(h3p)
        h3p.textContent = "Ingresar nombre"
        h3p.className = "mensaje"
        h3p.id = "mensaje2"
        h3p.style.textAlign = "center"
        h3p.style.marginTop = "10px"
        h3p.style.color = "red"
        h3p.style.display = "block"
        addRegion.appendChild(h3p)
    } else {

        let leBody = JSON.stringify({
            name: nombreInput.value
        })

        fetch(`http://localhost:4000/api/v1/region`, {
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
                nombreInput.value = ""
                console.log(data)
                let h3p = document.createElement('p')
                arrayMensaje.push(h3p)
                h3p.textContent = "Region creada correctamente"
                h3p.className = "mensaje"
                h3p.id = "mensaje2"
                h3p.style.textAlign = "center"
                h3p.style.marginTop = "10px"
                h3p.style.color = "green"
                h3p.style.display = "block"
                addRegion.appendChild(h3p)


                arrayRegistros.forEach(element => {
                    element.remove()
                });

                getRegions();
            })
    }
})

function getRegions() {

    arrayRegistros = []
    fetch("http://localhost:4000/api/v1/region", {
            headers: {
                'Content-Type': 'application/json',
                'user-token': sessionStorage.getItem('jwt')
            }
        })

        .then(response => response.json())
        .then(data => {

            data.forEach(element => {

                let liRegion = document.createElement('li')
                arrayRegistros.push(liRegion)
                let spanRegion = document.createElement('span')
                let divRegions = document.createElement('div')
                let addCountry = document.createElement('button')
                addCountry.textContent = "Agregar Pais"
                addCountry.className = "buttonRojo"
                divRegions.className = "acomodar5"
                addCountry.style.marginTop = "30px"
                let divSpan = document.createElement('div')
                let h3Region = document.createElement('h3')
                spanRegion.className = "caret"
                h3Region.textContent = element.name
                h3Region.style.textShadow = "black 1px 1px 2px"
                masterUl.appendChild(liRegion)
                divRegions.style.marginLeft = "30px"
                divRegions.style.marginBottom = "30px"
                liRegion.appendChild(divRegions)
                let ulCountries = document.createElement('ul')
                ulCountries.className = "nested"
                divRegions.appendChild(divSpan)
                divSpan.appendChild(h3Region)
                divSpan.style.display = "flex"
                divSpan.style.marginBottom = "15px"
                let divContainer = document.createElement('div')
                divSpan.appendChild(spanRegion)
                divRegions.appendChild(ulCountries)
                ulCountries.appendChild(divContainer)
                divRegions.appendChild(addCountry)

                addCountry.addEventListener('click', () => {

                    addRegion.style.display = "none"

                    arrayDivCity.forEach(element => {
                        element.remove()
                    });

                    arrayDivSeguro.forEach(element => {
                        element.remove()
                    });


                    arrayDivCountry.forEach(element => {
                        element.remove()
                    });

                    let divCountry = document.createElement('div')
                    arrayDivCountry.push(divCountry)
                    divCountry.className = "closeCity"
                    let h3Country = document.createElement('h3')
                    h3Country.textContent = "AGREGAR PAIS"
                    let formCo = document.createElement('div')
                    formCo.className = "formco"
                    let px = document.createElement('p')
                    let closeDiv = document.createElement('div')
                    closeDiv.className = "closeTab"
                    px.textContent = "X"
                    let labelCity = document.createElement('label')
                    labelCity.textContent = "Nombre:"
                    let labelInput = document.createElement('input')
                    let buttonAgregar = document.createElement('button')
                    buttonAgregar.textContent = "AGREGAR"

                    divCountry.animate([{
                            opacity: 0
                        },
                        {
                            opacity: 1
                        }
                    ], {
                        duration: 300,
                        iterations: 1
                    });

                    closeDiv.addEventListener('click', () => {
                        arrayDivCountry.forEach(element => {
                            element.remove();
                        });
                    })

                    buttonAgregar.addEventListener('click', () => {

                        arrayMensaje.forEach(element => {
                            element.remove()
                        });

                        if (labelInput.value == "") {
                            let h3p = document.createElement('p')
                            arrayMensaje.push(h3p)
                            h3p.textContent = "Ingresar un nombre"
                            h3p.className = "mensaje"
                            h3p.id = "mensaje2"
                            h3p.style.color = "red"
                            h3p.style.marginTop = "20px"
                            h3p.style.marginBottom = "20px"
                            h3p.style.display = "block"
                            divCountry.appendChild(h3p)

                        } else {

                            let leBody = JSON.stringify({
                                name: labelInput.value,
                                region: element.id_region
                            })
                            fetch(`http://localhost:4000/api/v1/countries`, {
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
                                    console.log(data)

                                    arrayRegistros.forEach(element => {
                                        element.remove()
                                    })
                                    arrayDivCountry.forEach(element => {
                                        element.remove()
                                    })

                                    getRegions();
                                })
                        }

                    })

                    login.appendChild(divCountry)
                    divCountry.appendChild(h3Country)
                    divCountry.appendChild(formCo)
                    divCountry.appendChild(closeDiv)
                    closeDiv.appendChild(px)
                    divCountry.appendChild(labelCity)
                    divCountry.appendChild(labelInput)
                    divCountry.appendChild(buttonAgregar)
                })

                for (i = 0; i < element.Countries.length; i++) {
                    let divRegion = document.createElement('div')
                    arrayCities.push(divRegion)
                    let divAcciones = document.createElement('div')
                    divContainer.className = "divContainer"
                    divAcciones.className = "acomodar2"
                    divRegion.className = "acomodar"
                    let buttonEdit = document.createElement('button')
                    let agregarCity = document.createElement('button')
                    agregarCity.textContent = "Agregar Ciudad"
                    agregarCity.className = "agregarCity"
                    buttonEdit.className = "buttonEditar"
                    buttonEdit.textContent = "EDITAR"
                    buttonEdit.style.backgroundColor = "#ccd241"
                    buttonEdit.style.borderColor = "#ccd241"
                    let buttonDelete = document.createElement('button')
                    buttonDelete.textContent = "BORRAR"
                    let liCountry = document.createElement('li')
                    let h3Country = document.createElement('h3')
                    var IdCountry = element.Countries[i].id_countries
                    countriesId.push(IdCountry)
                    h3Country.textContent = element.Countries[i].name
                    h3Country.style.textShadow = "black 1px 1px 2px"
                    let spanCity = document.createElement('span')
                    spanCity.className = "caret"
                    let divCountry = document.createElement('div')
                    divCountry.className = "acomodar3"
                    ulCountries.appendChild(divContainer)
                    divContainer.appendChild(divRegion)
                    divRegion.appendChild(liCountry)
                    divAcciones.appendChild(buttonEdit)
                    divAcciones.appendChild(buttonDelete)
                    divAcciones.appendChild(agregarCity)
                    divCountry.appendChild(divAcciones)
                    liCountry.appendChild(divCountry)
                    divCountry.appendChild(h3Country)
                    divCountry.appendChild(spanCity)

                    let theValue = element.Countries[i].id_countries

                    buttonEdit.addEventListener('click', () => {
                        addRegion.style.display = "none"

                        arrayDivSeguro.forEach(element => {
                            element.remove()
                        });


                        arrayDivCountry.forEach(element => {
                            element.remove()
                        });

                        arrayDivCity.forEach(element => {
                            element.remove()
                        });
                        let divCity = document.createElement('div')
                        arrayDivCity.push(divCity)
                        divCity.className = "closeCity"
                        let h3City = document.createElement('h3')
                        h3City.textContent = "EDITAR PAIS"
                        let formCo = document.createElement('div')
                        formCo.className = "formco"
                        let px = document.createElement('p')
                        let closeDiv = document.createElement('div')
                        closeDiv.className = "closeTab"
                        px.textContent = "X"
                        let labelCity = document.createElement('label')
                        labelCity.textContent = "Nombre:"
                        let labelInput = document.createElement('input')
                        let buttonAgregar = document.createElement('button')
                        buttonAgregar.textContent = "EDITAR"

                        buttonAgregar.addEventListener('click', () => {

                            arrayMensaje.forEach(element => {
                                element.remove();
                            })

                            if (labelInput.value == "") {
                                let h3p = document.createElement('p')
                                arrayMensaje.push(h3p)
                                h3p.textContent = "Ingresar un nombre"
                                h3p.className = "mensaje"
                                h3p.id = "mensaje2"
                                h3p.style.color = "red"
                                h3p.style.marginTop = "20px"
                                h3p.style.marginBottom = "20px"
                                h3p.style.display = "block"
                                divCity.appendChild(h3p)

                            } else {

                                let leBody = JSON.stringify({
                                    name: labelInput.value,
                                    region: element.id_region
                                })

                                fetch(`http://localhost:4000/api/v1/countries/${theValue}`, {
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
                                        arrayRegistros.forEach(element => {
                                            element.remove();
                                        })

                                        arrayDivCity.forEach(element => {
                                            element.remove();
                                        })

                                        getRegions();
                                    })
                            }
                        })

                        divCity.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 300,
                            iterations: 1
                        });
                        login.appendChild(divCity)
                        divCity.appendChild(h3City)
                        divCity.appendChild(formCo)
                        divCity.appendChild(closeDiv)
                        closeDiv.appendChild(px)
                        divCity.appendChild(labelCity)
                        divCity.appendChild(labelInput)
                        divCity.appendChild(buttonAgregar)

                        closeDiv.addEventListener('click', () => {
                            divCity.remove();
                        })
                    })


                    buttonDelete.addEventListener('click', () => {
                        console.log(theValue)
                        let divSeguro = document.createElement('div')
                        arrayDivSeguro.push(divSeguro)
                        divSeguro.className = "closeCity"
                        divSeguro.style.justifyContent = "center"
                        let h3Seguro = document.createElement('h3')
                        h3Seguro.textContent = "Seguro quieres borrar este pais?"
                        let formCo = document.createElement('div')
                        formCo.style.display = "flex"
                        formCo.style.width = "400px"
                        formCo.style.justifyContent = "center"
                        let buttonSi = document.createElement('button')
                        buttonSi.textContent = "SI"
                        let buttonNo = document.createElement('button')
                        buttonNo.textContent = "NO"

                        divSeguro.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 300,
                            iterations: 1
                        });

                        login.appendChild(divSeguro)
                        divSeguro.appendChild(h3Seguro)
                        divSeguro.appendChild(formCo)
                        formCo.appendChild(buttonSi)
                        formCo.appendChild(buttonNo)

                        buttonNo.addEventListener('click', () => {
                            arrayDivSeguro.forEach(element => {
                                element.remove();
                            })
                        })

                        buttonSi.addEventListener('click', () => {
                            console.log(theValue)
                            fetch(`http://localhost:4000/api/v1/countries/${theValue}`, {
                                    method: "DELETE",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'user-token': sessionStorage.getItem('jwt')
                                    }
                                })

                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                    console.log(data.success == undefined)
                                    if (data.success == undefined) {
                                        let divSeguro = document.createElement('div')
                                        arrayDivSeguro.push(divSeguro)
                                        divSeguro.className = "closeCity"
                                        divSeguro.style.justifyContent = "center"
                                        let h3Seguro = document.createElement('h3')
                                        h3Seguro.textContent = "No se puede eliminar pais ya que tiene contactos asociados."
                                        let formCo = document.createElement('div')
                                        formCo.style.display = "flex"
                                        formCo.style.width = "400px"
                                        formCo.style.justifyContent = "center"
                                        let buttonSi = document.createElement('button')
                                        buttonSi.textContent = "OK"

                                        divSeguro.animate([{
                                                opacity: 0
                                            },
                                            {
                                                opacity: 1
                                            }
                                        ], {
                                            duration: 300,
                                            iterations: 1
                                        });


                                        login.appendChild(divSeguro)
                                        divSeguro.appendChild(h3Seguro)
                                        divSeguro.appendChild(formCo)
                                        formCo.appendChild(buttonSi)

                                        buttonSi.addEventListener('click', () => {
                                            arrayDivSeguro.forEach(element => {
                                                element.remove();
                                            });
                                        })

                                    } else {
                                        arrayRegistros.forEach(element => {
                                            element.remove()
                                        })
                                        arrayDivSeguro.forEach(element => {
                                            element.remove();
                                        })

                                        getRegions();
                                    }
                                })

                        })
                    })


                    agregarCity.addEventListener('click', () => {
                        addRegion.style.display = "none"

                        arrayDivSeguro.forEach(element => {
                            element.remove()
                        });


                        arrayDivCountry.forEach(element => {
                            element.remove()
                        });

                        arrayDivCity.forEach(element => {
                            element.remove()
                        });
                        let theValue2 = theValue
                        let divCity = document.createElement('div')
                        arrayDivCity.push(divCity)
                        divCity.className = "closeCity"
                        let h3City = document.createElement('h3')
                        h3City.textContent = "AGREGAR CIUDAD"
                        let formCo = document.createElement('div')
                        formCo.className = "formco"
                        let px = document.createElement('p')
                        let closeDiv = document.createElement('div')
                        closeDiv.className = "closeTab"
                        px.textContent = "X"
                        let labelCity = document.createElement('label')
                        labelCity.textContent = "Nombre:"
                        let labelInput = document.createElement('input')
                        let buttonAgregar = document.createElement('button')
                        buttonAgregar.textContent = "AGREGAR"

                        divCity.animate([{
                                opacity: 0
                            },
                            {
                                opacity: 1
                            }
                        ], {
                            duration: 300,
                            iterations: 1
                        });
                        login.appendChild(divCity)
                        divCity.appendChild(h3City)
                        divCity.appendChild(formCo)
                        divCity.appendChild(closeDiv)
                        closeDiv.appendChild(px)
                        divCity.appendChild(labelCity)
                        divCity.appendChild(labelInput)
                        divCity.appendChild(buttonAgregar)

                        closeDiv.addEventListener('click', () => {
                            divCity.remove();
                        })

                        buttonAgregar.addEventListener('click', () => {
                            let theValue3 = theValue2
                            console.log(theValue3)
                            var valorLoco = labelInput.value
                            console.log(valorLoco)
                            arrayMensaje.forEach(element => {
                                element.remove()
                            });


                            if (valorLoco == "") {
                                let h3p = document.createElement('p')
                                arrayMensaje.push(h3p)
                                h3p.textContent = "Ingresar un nombre"
                                h3p.className = "mensaje"
                                h3p.id = "mensaje2"
                                h3p.style.color = "red"
                                h3p.style.marginTop = "20px"
                                h3p.style.marginBottom = "20px"
                                h3p.style.display = "block"
                                divCity.appendChild(h3p)

                            } else {

                                let leBody = JSON.stringify({
                                    name: valorLoco,
                                    country: theValue3
                                })

                                console.log(leBody)

                                fetch(`http://localhost:4000/api/v1/cities`, {
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
                                        console.log(data)

                                        arrayRegistros.forEach(element => {
                                            element.remove();
                                        })

                                        arrayDivCity.forEach(element => {
                                            element.remove();
                                        })

                                        getRegions();

                                    })
                            }

                        })

                    })

                    let ulCities = document.createElement('ul')
                    ulCities.className = "nested"
                    liCountry.appendChild(ulCities)
                    let wol3 = theValue


                    for (a = 0; a < element.Countries[i].Cities.length; a++) {

                        let divRegion2 = document.createElement('div')
                        let divAcciones2 = document.createElement('div')
                        divAcciones2.className = "acomodar2"
                        divRegion2.className = "acomodar4"
                        arrayLoquillo.push(divRegion2)
                        let buttonEdit2 = document.createElement('button')
                        buttonEdit2.className = "buttonEditar"
                        buttonEdit2.textContent = "EDITAR"
                        buttonEdit2.style.backgroundColor = "#ccd241"
                        buttonEdit2.style.borderColor = "#ccd241"
                        let buttonDelete2 = document.createElement('button')
                        buttonDelete2.textContent = "BORRAR"
                        let liCity = document.createElement('li')
                        liCity.textContent = element.Countries[i].Cities[a].name
                        liCity.style.textShadow = "black 1px 1px 2px"
                        ulCities.appendChild(divRegion2)
                        divRegion2.appendChild(liCity)
                        divRegion2.appendChild(divAcciones2)
                        divAcciones2.appendChild(buttonEdit2)
                        divAcciones2.appendChild(buttonDelete2)
                        var cityId = element.Countries[i].Cities[a].id_cities
                        gelato.push(cityId)
                        let theValue = gelato.indexOf(cityId)

                        buttonEdit2.addEventListener('click', () => {
                            let final = theValue
                            console.log(final)
                            addRegion.style.display = "none"

                            arrayDivSeguro.forEach(element => {
                                element.remove()
                            });


                            arrayDivCountry.forEach(element => {
                                element.remove()
                            });

                            arrayDivCity.forEach(element => {
                                element.remove()
                            });
                            let divCity = document.createElement('div')
                            arrayDivCity.push(divCity)
                            divCity.className = "closeCity"
                            let h3City = document.createElement('h3')
                            h3City.textContent = "EDITAR CIUDAD"
                            let formCo = document.createElement('div')
                            formCo.className = "formco"
                            let px = document.createElement('p')
                            let closeDiv = document.createElement('div')
                            closeDiv.className = "closeTab"
                            px.textContent = "X"
                            let labelCity = document.createElement('label')
                            labelCity.textContent = "Nombre:"
                            let labelInput = document.createElement('input')
                            let buttonAgregar = document.createElement('button')
                            buttonAgregar.textContent = "EDITAR"


                            login.appendChild(divCity)
                            divCity.appendChild(closeDiv)
                            closeDiv.appendChild(px)
                            divCity.appendChild(h3City)
                            divCity.appendChild(formCo)
                            formCo.appendChild(labelCity)
                            formCo.appendChild(labelInput)
                            divCity.appendChild(buttonAgregar)

                            closeDiv.addEventListener('click', () => {
                                arrayDivCity.forEach(element => {
                                    element.remove()
                                })
                            })

                            buttonAgregar.addEventListener('click', () => {

                                arrayMensaje.forEach(element => {
                                    element.remove();
                                })

                                if (labelInput.value == "") {
                                    let h3p = document.createElement('p')
                                    arrayMensaje.push(h3p)
                                    h3p.textContent = "Ingresar un nombre"
                                    h3p.className = "mensaje"
                                    h3p.id = "mensaje2"
                                    h3p.style.color = "red"
                                    h3p.style.marginTop = "20px"
                                    h3p.style.marginBottom = "20px"
                                    h3p.style.display = "block"
                                    divCity.appendChild(h3p)

                                } else {
                                    let finalValue = gelato[theValue]
                                    console.log(finalValue)
                                    console.log(wol3)
                                    let leBody = JSON.stringify({
                                        name: labelInput.value,
                                        country: wol3
                                    })

                                    fetch(`http://localhost:4000/api/v1/cities/${finalValue}`, {
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
                                            console.log(data)



                                            arrayRegistros.forEach(element => {
                                                element.remove();
                                            })

                                            arrayDivCity.forEach(element => {
                                                element.remove();
                                            })
                                            getRegions()


                                        })

                                }
                            })
                        })

                        buttonDelete2.addEventListener('click', () => {
                            let divSeguro = document.createElement('div')
                            arrayDivSeguro.push(divSeguro)
                            divSeguro.className = "closeCity"
                            divSeguro.style.justifyContent = "center"
                            let h3Seguro = document.createElement('h3')
                            h3Seguro.textContent = "Seguro quieres borrar esta ciudad?"
                            let formCo = document.createElement('div')
                            formCo.style.display = "flex"
                            formCo.style.width = "400px"
                            formCo.style.justifyContent = "center"
                            let buttonSi = document.createElement('button')
                            buttonSi.textContent = "SI"
                            let buttonNo = document.createElement('button')
                            buttonNo.textContent = "NO"

                            divSeguro.animate([{
                                    opacity: 0
                                },
                                {
                                    opacity: 1
                                }
                            ], {
                                duration: 300,
                                iterations: 1
                            });

                            login.appendChild(divSeguro)
                            divSeguro.appendChild(h3Seguro)
                            divSeguro.appendChild(formCo)
                            formCo.appendChild(buttonSi)
                            formCo.appendChild(buttonNo)

                            buttonNo.addEventListener('click', () => {
                                arrayDivSeguro.forEach(element => {
                                    element.remove();
                                })
                            })

                            buttonSi.addEventListener('click', () => {

                                let finalValue = gelato[theValue]

                                fetch(`http://localhost:4000/api/v1/cities/${finalValue}`, {
                                        method: "DELETE",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'user-token': sessionStorage.getItem('jwt')
                                        }
                                    })

                                .then(response => response.json())
                                .then(data => {
                                        console.log(data)
                                        if (data.success == undefined) {
                                            let divSeguro = document.createElement('div')
                                            arrayDivSeguro.push(divSeguro)
                                            divSeguro.className = "closeCity"
                                            divSeguro.style.justifyContent = "center"
                                            let h3Seguro = document.createElement('h3')
                                            h3Seguro.textContent = "No se puede eliminar ciudad ya que tiene contactos asociados."
                                            let formCo = document.createElement('div')
                                            formCo.style.display = "flex"
                                            formCo.style.width = "400px"
                                            formCo.style.justifyContent = "center"
                                            let buttonSi = document.createElement('button')
                                            buttonSi.textContent = "OK"

                                            divSeguro.animate([{
                                                    opacity: 0
                                                },
                                                {
                                                    opacity: 1
                                                }
                                            ], {
                                                duration: 300,
                                                iterations: 1
                                            });


                                            login.appendChild(divSeguro)
                                            divSeguro.appendChild(h3Seguro)
                                            divSeguro.appendChild(formCo)
                                            formCo.appendChild(buttonSi)

                                            buttonSi.addEventListener('click', () => {
                                                arrayDivSeguro.forEach(element => {
                                                    element.remove();
                                                });
                                            })

                                        } else {

                                            arrayRegistros.forEach(element => {
                                                element.remove()
                                            })
                                            arrayDivSeguro.forEach(element => {
                                                element.remove();
                                            })

                                            getRegions();
                                        }
                                    })


                            })
                        })
                    }
                }

            });


            var toggler = document.getElementsByClassName("caret");
            var i;

            for (i = 0; i < toggler.length; i++) {
                toggler[i].addEventListener("click", function () {
                    this.parentElement.parentElement.querySelector(".nested").classList.toggle("active");
                    this.classList.toggle("caret-down");

                });
            }
        })
}

getRegions()

var dragItem = document.querySelector("#addRegion");
var container = document.querySelector("#addRegion");
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