const { handleErrors } = require('../services/auth.services');
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const urls = require('../controllers/url.controllers')



//controller for sign up route
module.exports.signup = async(req, res) => {

    console.log(req.body)
    try {

        const { firstname, lastname, email, password } = req.body;

        const user = await UserModel.create({ firstname, lastname, email, password });
        if (user) {
            res.render('login');
            //return res.status(201).json({ message: "Successfully created user", user: user });

        }

        res.render('signup', { message: "Something went wrong. please try again" });



    } catch (error) {
        const errors = handleErrors(error);
        console.log(errors);
        res.render('signup', {
            message: 'Email already in use'
        })

    }

};



module.exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        let token;

        //validate user data
        if (!email || !password) {
            return res.render('login', { message: "Incomplete Input" });
        }

        const user = await UserModel.findOne({ email: email });


        if (!user) {
            return res.render('login', { message: "Wrong email" });
        }

        if (user && await (bcrypt.compare(password, user.password))) {
            token = await jwt.sign({
                    userid: user._id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                process.env.jwt_secret, {});
            req.session.token = token;

            res.redirect('/');

        }





    } catch (error) {
        console.log(error);
        return res.status(409).json({ message: "An error occurred" + error.message });
        console.log(error);
    }

};