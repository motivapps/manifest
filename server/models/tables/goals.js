const goals = (sequelize, DataTypes) => {
  const Goal = sequelize.define('goals', {
    "id_user": {
      type: DataTypes.INTEGER,
      model: 'users',
      key: 'id',
    },
    "vice": {
      type: DataTypes.STRING,
      model: 'vices',
      key: 'id'
    },
    "streak_days": DataTypes.INTEGER,
    "goal_name": DataTypes.STRING,
    "goal_cost": DataTypes.INTEGER,
    "amount_saved": DataTypes.INTEGER,
    "relapse_count": DataTypes.INTEGER,
    "relapse_costTotal": DataTypes.INTEGER,
    "vice_freq": DataTypes.STRING,
    "vice_price": DataTypes.INTEGER,
  }, { sequelize })
  return Goal;
}

module.exports = goals;