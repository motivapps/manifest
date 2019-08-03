const vices = (sequelize, DataTypes) => {
  const Vices = sequelize.define('vices', {
      "vice": {
        type: DataTypes.ENUM,
        values: ['smoking', 'drinking', 'coffee', 'fast food', 'gambling', 'shopping'],
      },
    }, { sequelize }
  )
  return Vices;
}

module.exports = vices;