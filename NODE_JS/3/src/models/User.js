import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Product from './Product.js'

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Users',
  timestamps: true
})


User.hasMany(Product, {
  foreignKey: 'userId',
  as: 'products'
})

export default User