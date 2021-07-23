let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
let perfil = document.getElementById('perfil');
let contraseña = document.getElementById('contraseña');
let contraseña2 = document.getElementById('contraseña2')
let crear = document.getElementById('crear')
let mensaje = document.getElementById('mensaje')
let usuario = document.getElementById('usuario')
let jwt = sessionStorage.getItem('jwt')
console.log(jwt)
crear.addEventListener('click', () => {
    mensaje.innerHTML = ""
    if (
        (nombre.value == "") ||
        (apellido.value == "") ||
        (email.value == "") ||
        (perfil.value == "") ||
        (usuario.value == "") ||
        (contraseña.value == "") ||
        (contraseña2.value == "")
    ) {
        mensaje.innerHTML = "Faltan campos por completar."
        mensaje.style.display = "block"
    } else {
        let checkEmail = email.value
        if (!checkEmail.includes("@")) {
            mensaje.innerHTML = "El email no es valido."
            mensaje.style.display = "block"
        } else {

            if (contraseña.value !== contraseña2.value) {
                {
                    mensaje.innerHTML = "Las contraseñas no son iguales."
                    mensaje.style.display = "block"
                }
            } else {

                if (perfil.value == "Administrador") {
                    var valorPerfil = 2
                } else {
                    var valorPerfil = 1
                }

                let leBody = JSON.stringify({
                    name: nombre.value,
                    lastName: apellido.value,
                    email: email.value,
                    password: contraseña.value,
                    profile: valorPerfil,
                    username: usuario.value
                })

                fetch(`http://localhost:4000/api/v1/users`, {
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
                        if (data.error !== undefined) {
                            mensaje.innerHTML = data.error
                            mensaje.style.display = "block"
                        } else {
                            nombre.value = ""
                            apellido.value = ""
                            email.value = ""
                            usuario.value = ""
                            contraseña.value = ""
                            contraseña2.value = ""
                            perfil.value = "Seleccione un perfil"
                            mensaje.innerHTML = "El usuario ha sido creado!"
                            mensaje.style.color = "green"
                            mensaje.style.display = "block"
                        }
                    })
            }






        }
    }
})