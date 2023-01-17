'use strict';

const UserServices = {};
const { UserCredential } = require("../models");

UserServices.getAllUsersDetails = async( ) => {
  let response;
  await UserCredential.findAll({where: { }}) 
    .then(async (Users) => {
      if(Users) {
        const userList = []
        await Promise.all (Users.map((User) => {

          const data = {
            userId: User.id,
            name: User.name,
            userName: User.username,
            city: User.city,
            role: User.roles
          }
          userList.push(data);
        }));
        response = { success: true,  userList: userList};
      } else {
        response = { success: false, userList: "User list not found"};
      }
    });
    return response;
};

UserServices.deleteUserDetails = async ( userId) => {
    let response;
      await UserCredential.destroy({where:{ id: userId }})
      .then(result => {
        response = "Deleted user details " + result;
      }).catch(error => {
        console.log(error)
      })
      
    
    return response;
  };

  UserServices.updateUserDetails = async (name, city, userId) => {
    let response;
      try {
        await UserCredential.update(
          { 
            name: name, 
            city: city,
          },
          { 
           where:{ id: userId } 
          })
          .then((updatedRecord) => {
              response = { success: true, msg: `updated record ${updatedRecord}`};
          })
        
      } catch (err) {
        console.log(err);
        return  { success: false, msg: 'Unhandled Exception!!' };
        ;    
    
    }
    return response;
  
  };
module.exports = UserServices;
