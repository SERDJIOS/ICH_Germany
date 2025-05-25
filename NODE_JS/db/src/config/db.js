import { Sequelize } from 'sequelize'
import configData from './config.json' with {type: 'json'}

const config = configData['development']

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,{
        host: config.host,
        dialect: config.dialect
    }
)

export default sequelize