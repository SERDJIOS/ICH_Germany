import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model {}

User.init({
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  mustChangePassword: { type: DataTypes.BOOLEAN, defaultValue: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
}, {
  sequelize,
  modelName: 'User',
});

export default User;