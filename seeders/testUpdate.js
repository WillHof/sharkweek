module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('updates', [{
            email: "test@test.com",
            timeframe: 0,
            currentAverage: 31,
            currentDay: 44,
            nextPredictedDateOne: '2019-6-26 04:00:00',
            createdAt: '2019-06-09 00:56:49',
            updatedAt: '2019-06-09 00:56:49'
        },
        {
            email: "test@test.com",
            timeframe: 1,
            currentAverage: 31,
            currentDay: 2,
            nextPredictedDateOne: '2019-7-26 04:00:00',
            createdAt: '2019-06-09 00:56:49',
            updatedAt: '2019-06-09 00:56:49'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('updates', null, {});
    }
};