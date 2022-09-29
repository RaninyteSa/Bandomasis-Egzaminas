import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import Users from '../model/index.js'
import Story from '../model/index.js'
import Stories from '../model/index.js'

const database = {} 
const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fund_me_app'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql'})

    database.Users = Users(sequelize)
    database.Stories = Stories(sequelize)
    database.Story = Story(sequelize)
   
    // database.Ratings = Ratings(sequelize)
    // database.Story = Story(sequelize)

    database.Stories.hasOne(database.Users)
    database.Users.belongsTo(database.Stories)

    database.Stories.hasMany(database.Story)
    database.Story.belongsTo(database.Stories)

    // database.Users.hasMany(database.Orders)
    // database.Orders.belongsTo(database.Users)

    // database.Orders.hasOne(database.Orders)
    // database.Orders.belongsTo(database.Orders)

 
    

    await sequelize.sync({ alter: true })
} catch(error) {
    console.log(error)
    console.log('Nepavyko prisijungti prie duomenų bazės');
}

export default database