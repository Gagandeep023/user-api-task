const { UserCredential } = require("../models");
const ROLES_LIST = require('../config/roles_list');
const UserServices = require('../service/user.service');

const credentialUtils = require('../lib/credentialUtils');
const userController = {};

userController.login = async (req, res, next) => {

        UserCredential.findOne({where:{ username: req.body.username }})
           
        .then((user) => {
    
                if (!user) {
                    return res.status(401).json({ success: false, msg: "could not find user" });
                }
                
                const isValid = credentialUtils.validPassword(req.body.password, user.hash, user.salt);
                
                if (isValid) {
    
                    const tokenObject = credentialUtils.issueJWT(user);
    
                    res.status(200).json({success: true, accessToken: tokenObject.accessToken, expiresIn: tokenObject.expires, roles:tokenObject.roles});
    
                } else {
    
                    res.status(401).json({ success: false, msg: "you entered the wrong password" });
    
                }
    
            })
            .catch((err) => {
                next(err);
            });

};

userController.register = async (req, res, next) => {

    UserCredential.findOne({where:{ username: req.body.username }})
    .then((user) => {
        if (user) {
            return res.status(401).json({ success: false, msg: "Username already taken" });
        }

        const saltHash = credentialUtils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new UserCredential({
            name: req.body.name,
            username: req.body.username,
            hash: hash,
            salt: salt,
            city: req.body.city,
            roles: ROLES_LIST.User,
        });

        try {
        
            newUser.save()
                .then((user) => {
                    res.json({ success: true});
                }).catch(error => {
                    console.log(error)
                    return res.status(401).json({ success: false, msg: error});

                  })

        } catch (err) {
            
            res.json({ success: false, msg: err });
        
        }
    })
    .catch((err) => {
        next(err);
    });

};
userController.deleteUserDetails = async (req, res) => {
    const userId = req.query.user_id;

    try {
        const response = await UserServices.deleteUserDetails(userId);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

userController.getAllUsersDetails = async (req, res) => {
    try {
        const response = await UserServices.getAllUsersDetails();
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
};
module.exports = userController;