import { Sequelize } from 'sequelize';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const configFile = require('./config.json');

const env = 'development';
const config = configFile[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

export default sequelize;