const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.HOST,
    dialect: 'postgres',
  }
)

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const models = {
  Users: sequelize.import('./tables/users'),
  Goals: sequelize.import('./tables/goals'),
  Vices: sequelize.import('./tables/vices'),
  Relapses: sequelize.import('./tables/relapses'),
  Transactions: sequelize.import('./tables/transactions'),
  Games: sequelize.import('./tables/games'),
  UsersGames: sequelize.import('./tables/users_games'),
}

module.exports = { sequelize, models }

// export default models;