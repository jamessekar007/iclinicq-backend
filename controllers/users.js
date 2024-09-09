const  User  = require('../models/User.js'); // Adjust the path as necessary
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = '4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c';

const signup = (async (req, res) => {
    try {
        let email = req.body.email;
       
        await User.findAll({
            where: {
                email: email
            },
            attributes: ['id']
          })
        .then(async users => {
            console.log(users); // Array of user objects that match the criteria
            if(users.length>0){
                res.status(422).json({ error: 'User Already Exit' });
            }
            else{
                let password = generateSHA512Hash(req.body.password)                
                
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: password
                });
                delete user.id;
                console.log('User created:', user.toJSON());
                res.status(201).json({ message: 'User created successfully',data:user });
                
            }
        })
        .catch(err => {
            console.error('Error fetching users:', err);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      }
})


const login = (async (req, res) => {
    try {
        let email = req.body.email;
        let password = generateSHA512Hash(req.body.password)
        await User.findAll({
            where: {
                email: email,
                password:password
            },
            attributes: ['id','name','email','mobile','user_type']
          })
        .then(async users => {
            console.log(users); // Array of user objects that match the criteria
            if(users.length>0){
                const payload = {
                    id: users[0]['id'],
                    name: users[0]['name'],
                    email: users[0]['email'],
                    mobile: users[0]['mobile'],
                    user_type: users[0]['user_type']
                };

                const token = jwt.sign(payload, SECRET_KEY, {
                    expiresIn: '24h'
                });

                const refreshToken = jwt.sign(payload, SECRET_KEY, {
                    expiresIn: '1m'
                });

                const response = {
                    name: users[0]['name'],
                    email: users[0]['email'],
                    mobile: users[0]['mobile'],
                    user_type: users[0]['user_type']
                };

                response.token = token;
                response.refreshToken = refreshToken;
                //console.log( JSON.parse(users))
                console.log( payload)
                console.log( token)
                res.status(200).json({ message: 'Logged in successfully',data:response });
                
            }
            else{
               
                res.status(401).json({ error: 'Invalid Email Or Password' });
            }
        })
        .catch(err => {
            console.error('Error fetching users:', err);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      }
})

function generateSHA512Hash(data) {
    return crypto.createHash('sha512').update(data, 'utf8').digest('hex');
}

module.exports = {
    signup,
    login
}