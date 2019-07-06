module.exports = function (sequelize, DataTypes) {
    var Update = sequelize.define("Update", {
        // Giving the Update model a name of type STRING
        name: DataTypes.STRING
        //   
    });

    Update.associate = function (models) {
        models.Update.BelongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Update;
};
