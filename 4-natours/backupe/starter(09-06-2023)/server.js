const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './confirg.env' });

const app = require('./app');

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // .set(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Now mongoose working...'))
  .catch((err) => console.log('Mongoose not working 😴', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// process.on('unhandelRejection', (err) => {
//   console.log(err);
//   console.log('UNHENDELER REJECTION 🪁 Shuting Down...');
//   process.exit(1);
// });

process.on('uncaughtException', (err) => {
  console.log('Uncaule exception 🪁 Shuting Down...');
  console.log(err.name, err.message);
});

// console.log(x);
