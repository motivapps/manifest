const games = (sequelize, DataTypes) => {
  const Game = sequelize.define('games', {
    "game": DataTypes.STRING,
  }, { sequelize })
  
  return Game;
}

module.exports = games;