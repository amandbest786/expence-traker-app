
const token = localStorage.getItem("token");

if(!token){
    alert("Please login first");
    window.location.href = "login.html";
}

function addExpense(event) {
    event.preventDefault();

    const detail = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value
    };

   axios.post('http://localhost:3000/expense/add-expense', detail, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
            showExpenseOnScreen(res.data.expense);
            event.target.reset();
    })
    .catch(err => {
    console.log("ERROR:", err.response || err);
})
}

function showExpenseOnScreen(expense){
    const parent = document.getElementById("expenseList");

    const child = document.createElement('li');
    child.id = expense.id;

    child.innerHTML = `
        ${expense.amount} - ${expense.description} - ${expense.category}
        <button onclick="deleteExpense('${expense.id}')">Delete</button>
    `;

    parent.appendChild(child);
}

function deleteExpense(id){
    axios.delete(`http://localhost:3000/expense/delete-expense/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(() => {
        document.getElementById(id).remove();
    })
}

window.onload = function(){
    
    axios.get('http://localhost:3000/expense/get-expense', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        res.data.expenses.forEach(showExpenseOnScreen);
    })
}