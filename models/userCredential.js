module.exports = (sequelize, DataTypes) =>{
    const UserCredential = sequelize.define("UserCredential", {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        hash:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        salt:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        city:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        roles:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return UserCredential;
};