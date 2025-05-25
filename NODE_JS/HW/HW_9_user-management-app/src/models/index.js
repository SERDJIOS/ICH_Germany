import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import sequelize from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    import(path.join(__dirname, file)).then(module => {
      const model = module.default;
      db[model.name] = model;
    });
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;