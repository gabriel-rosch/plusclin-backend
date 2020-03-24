require('dotenv/config');

module.exports = {
    dialect: 'postgres',
    host: '192.168.99.100',
    username: 'postgres',
    password: 'masterkey',
    database: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
// module.exports = {
//   dialect: 'postgres',
//   host: 'ec2-174-129-255-59.compute-1.amazonaws.com',
//   username: 'lrkbhqmucdwvub',
//   password: 'fd244f649337f7bd97637f15770a533437f1be3b31b8dbea23b907a2e5df50c0',
//   database: 'deatt2karfltq9',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };