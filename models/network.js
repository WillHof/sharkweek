module.exports = function (sequelize, DataTypes) {
    var Network = sequelize.define("Network", {
        // Giving the Assoc model a name of type STRING
        email: {
            type: DataTypes.STRING
        },

        assocAccount: {
            type: DataTypes.STRING
        }

    });

    Network.associate = function (models) {
        models.Network.BelongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Network;
};