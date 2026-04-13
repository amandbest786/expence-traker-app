function signup(event){
    event.preventDefault();

    const detail = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
    }

    axios.post('http://localhost:3000/user/signup', detail)
    .then(res => {
    if(res.status === 201){
        alert('User created successfully');
    }
})
    .catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err}</div>`
    })
}