const relapses = (sequelize, DataTypes) => {
  const Relapse = sequelize.define('relapses', {
    "id_user": {
      type: DataTypes.INTEGER,
      model: "users",
      key: "id",
    },
    "id_goal": {
      type: DataTypes.INTEGER,
      model: "goal",
      key: "id",
    },
    "day": DataTypes.DATE,
    "cost": DataTypes.DECIMAL,
  }, { sequelize }
  )
  return Relapse;
}

module.exports = relapses;