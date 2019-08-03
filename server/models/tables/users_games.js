const usersGames = (sequelize, DataTypes) => {
  const UsersGames = sequelize.define('users_games', {
    "id_user": {
      type: DataTypes.INTEGER,
      model: "users",
      key: "id",
    },
    "id_game": {
      type: DataTypes.INTEGER,
      model: "games",
      key: "id",
    }
  }, { sequelize }
  )
  return UsersGames;
}

module.exports = usersGames;