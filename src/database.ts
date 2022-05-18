import {connect} from 'mongoose';
require("dotenv").config();

const dbURI = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/music-app";

connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unable to connect to MongoDB server');
});
