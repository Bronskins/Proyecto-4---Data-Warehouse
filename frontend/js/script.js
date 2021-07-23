let username = document.getElementById('username');
let password = document.getElementById('password');
let login = document.getElementById('login2');
let mensaje = document.getElementById('mensaje');



login.addEventListener('click', () => {

    mensaje.innerHTML = ""
    if((username.value == "") || (password.value == "")) {
        mensaje.textContent = "Falta completar algun campo."
        mensaje.style.display = "block"
    } else {

        let wolbody = JSON.stringify({
            username: username.value,
            password: password.value
        })


        fetch(`http://localhost:4000/api/v1/login`, {
                method: "POST",
                body: wolbody,
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                if(data.error !== undefined){
                    mensaje.innerHTML = data.error
                    mensaje.style.display= "block"
                } else {
                    sessionStorage.setItem('jwt', data.token)
                    sessionStorage.setItem('profile', data.profile)
                    window.location.replace("home.html");
                }
            })
}});