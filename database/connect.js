const mongoose = require('mongoose');
const DB = mongoose.connection;

const connect = () =>
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: 'true',
    useUnifiedTopology: 'true',
  });

const handleOpen = () => {
  console.log('✅ Connected to DB');
};

const handleError = (error) => {
  throw new Error(`❌ Error on DB connection: ${error}`);
};

DB.on('error', handleError);
DB.once('open', handleOpen);

module.exports = connect;
