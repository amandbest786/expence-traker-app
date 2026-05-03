const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./util/database');
const cors = require('cors');
const routes = require('./routes/routes');
const expenseRoutes = require('./routes/expense');
const user = require('./model/user');
const Expense = require('./model/expense');

app.use(cors());
app.use(express.json());        
app.use(express.static('public'));

app.use('/user', routes);
app.use('/expense', expenseRoutes);

// RELATION
user.hasMany(Expense);
Expense.belongsTo(user);

sequelize.sync()
    .then(() => {
      console.log("Database synced");
      app.listen(port, () => {
        console.log(` app listening on port ${port}`)
    })
 }).catch((err) => {
    console.log(err)
})