const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./util/database');
const cors = require('cors');
const routes = require('./routes/routes');

const expenseRoutes = require('./routes/expenseroutes');

app.use('/expense', expenseRoutes);

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/user', routes);

sequelize.sync()
    .then(() => {
      app.listen(port, () => {
        console.log(` app listening on port ${port}`)
    })
 }).catch((err) => {
    console.log(err)
})