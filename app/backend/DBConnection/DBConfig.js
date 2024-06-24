const mongoose = require('mongoose');

async function connectToDatabase() {
  const DATABASE = process.env.DATABASE;
  
  try {
    await mongoose.connect(DATABASE);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('DB-Error', error);
    throw error;
  }
}

module.exports = connectToDatabase;
