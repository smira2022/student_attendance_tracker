const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

//views
router.get('/login', (req, res) => { res.render('login')});
router.get('/register', (req, res) => { res.render('register')});

//routes for controller actions and register and logout page
router.post('/login', authController.login);
router.post('/register', authController.register);
//router.post('/logout', authController.logout);


module.exports = router;
