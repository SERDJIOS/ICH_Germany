import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from 'bcrypt'


const User = sequelize.define('User', {
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
})

User.beforeCreate(async (user) =>{
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
})

export default User