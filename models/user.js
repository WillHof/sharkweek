module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        userType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER
        },
        sharedCode: {
            type: DataTypes.INTEGER
        }
    });

    User.associate = function (models) {
        models.User.hasMany(models.Update);
        models.User.hasMany(models.Network);
    };

    return User;
};
