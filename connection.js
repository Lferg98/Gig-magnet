const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const clusterUrl = 'project3.rskd4yk.mongodb.net';
const databaseName = 'project3';

const mongoURI = `mongodb+srv://${username}:${password}@${clusterUrl}/${databaseName}?retryWrites=true&w=majority`;


async function connect() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

module.exports = {
  connect,
  connection: mongoose.connection,
};
