module.exports = function (sequelize, DataTypes) {
    var Update = sequelize.define("Update", {

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        timeframe: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        currentAverage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        currentDay: {
            type: DataTypes.INTEGER
        },

        nextPredictedDateOne: {
            type: DataTypes.DATE
        },

        actualDateOne: {
            type: DataTypes.DATE
        },

        actualLastDate: {
            type: DataTypes.DATE
        },

        eventId: {
            type: DataTypes.STRING,
            allowNull: true
        }

    });

    Update.associate = function (models) {
        models.Update.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        })
    };

    return Update;

};
