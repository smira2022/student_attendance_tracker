const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AttendanceManager = require('../models/attendanceManager.js');


exports.login = async (req, res) => {
    //grab the field from the input form
    const { email, password } = req.body;
    const secret = process.env.secret_key;
    
    try {
        const user = await AttendanceManager.findOne({email});

        if (!user){
            return res.status(404).json('Invalid username.');
        }
        //Use bcrypt to verify the password
        const result = await bcrypt.compare(password, user.password);

        if(!result){
            res.status(404).send('Password does not match our record');

            return;
        }

        //Generate the JWT
        const token = jwt.sign({ id: user._id.toString()}, secret, {expiresIn: '5m'});

        //Create a cookie and place the JWT inside of it
        res.cookie('jwt', token, { maxAge: 5 * 60 * 1000, httpOnly: true} );

        res.redirect('/attendance');


    } catch (error) {
        res.status(500).send('Internal Server Error');
    }


}

exports.register = async (req, res) => {

    const {email, password, confirmPassword} = req.body;

    console.log(req.body);

    try {
        const existingUser = await AttendanceManager.findOne({email});

        if (existingUser){
            res.status(400).json('Email already exists.');
        }

        if(password !== confirmPassword){
            res.status(400).json('Passwords do not match.'); //return stringify json
        }

        //hash the password and stored in DB
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = AttendanceManager({
            email,
            password: hashedPassword
        });

        newUser.save(); //save the new user to the DB

        res.redirect('/login');
        
    } catch (error) {
        return res.status(500).send('Internal Server Error'); // plain text
    }


}