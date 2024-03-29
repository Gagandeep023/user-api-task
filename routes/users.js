const router = require('express').Router();   
const passport = require('passport');
const userController = require("../controlller/user.controller");
const CHECK_FOR_AUTHENTICATION = require('../lib/authentication');


router.get('/protected', CHECK_FOR_AUTHENTICATION, (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.post('/login', userController.login);

router.post('/register', userController.register);

router.delete('/delete-user', CHECK_FOR_AUTHENTICATION, userController.deleteUserDetails);

router.get('/all-users',CHECK_FOR_AUTHENTICATION, userController.getAllUsersDetails);

router.post('/update-user-details',CHECK_FOR_AUTHENTICATION, userController.updateUserDetails);

module.exports = router;
