function login(event){
    event.preventDefault();

    const detail = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    axios.post('http://localhost:3000/user/login', detail)
    .then(res => {
        alert(res.data.message); // shows message

            localStorage.setItem("token", res.data.token);

            window.location.href = "expence.html";
    })
    .catch(err => {
        alert(err.response.data.message); //  error message
    })
}