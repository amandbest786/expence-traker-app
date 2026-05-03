const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ error });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const foundUser = await User.findOne({ where: { email } });

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        bcrypt.compare(password, foundUser.password, (err, result) => {
            
            if (err) {
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (result) {
                const token = jwt.sign({ userId: foundUser.id }, "mySecretKey");

                return res.status(200).json({ message: 'Login successful', token });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}; 

module.exports = {
    signup,
    login
}