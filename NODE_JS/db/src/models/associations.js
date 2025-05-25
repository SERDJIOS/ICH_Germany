import User from './User.js';
import Product from './Product.js';

User.hasMany(Product, {
  foreignKey: 'userId',
  as: 'products'
});

Product.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});