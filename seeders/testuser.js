module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            firstName: "Test",
            lastName: "User",
            email: "test@test.com",
            userType: "MainUser",
            createdAt: '2019-06-09 00:56:49',
            updatedAt: '2019-06-09 00:56:49'
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};