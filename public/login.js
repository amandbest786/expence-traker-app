function login(event){
    event.preventDefault();

    const detail = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    axios.post('http://localhost:3000/user/login', detail)
    .then(res => {
        alert(res.data.message); // ✅ shows message
    })
    .catch(err => {
        alert(err.response.data.message); // ❌ error message
    })
}