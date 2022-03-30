const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');
const User = require('./user.model');

const Picture = sequelize.define('Picture', {
  id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  uniqueName: { type: DataTypes.STRING, allowNull: false },
  originalName: { type: DataTypes.STRING, allowNull: false },
  path: { type: DataTypes.STRING, allowNull: false },
  mimeType: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER },
}, { tableName: 'picture' });

User.hasOne(Picture);
Picture.belongsTo(User);

module.exports = Picture;
