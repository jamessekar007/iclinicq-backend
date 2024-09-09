// sequelize.js

const { Sequelize } = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize({
    database: 'ecommerce',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql', etc.
  });

  
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      // Sync all defined models to the database
      await sequelize.sync({ force: false });
      console.log('Database synchronized.');
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();


module.exports = sequelize;