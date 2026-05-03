

async function login(event){
    event.preventDefault();

    const detail = {
        email: event.target.email.value,
        password: event.target.password.value
    };

    axios.post('http://localhost:3000/user/login', detail)
    .then(res => {
        if(res.status === 200){
           window.location.href = "expense.html";
            localStorage.setItem('token', res.data.token);
        }
    })
    .catch(err => {
        alert(err.response.data.message);
    });

}