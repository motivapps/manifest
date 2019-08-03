const transactions = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('relapses', {
    "id_user": {
      type: DataTypes.INTEGER,
      model: "users",
      key: "id",
    },
    "status": {
      type: DataTypes.ENUM,
      values: ['pending', 'dismissed', 'else'],
    },
    "name": DataTypes.STRING,
    "day": DataTypes.DATE,
    "amount": DataTypes.DECIMAL,
  }, { sequelize }
  )
  return Transaction;
}

module.exports = transactions;