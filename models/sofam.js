module.exports = function (sequelize, DataTypes) {
    var Network = sequelize.define("Network", {
        // Giving the Assoc model a name of type STRING
        name: DataTypes.STRING
        //   
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