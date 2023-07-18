

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const contactsRouter = require('./routes/api');
app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/index',
    data: 'Not found',
  })
})
app.use((err, _, res, __) => {
  console.log(err.stack)
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger));


const DB_HOST=`mongodb+srv://demagog:10101982@contacts.ttvf3bm.mongodb.net/contacts?retryWrites=true&w=majority`;

const PORT =process.env.PORT || 3000;


mongoose.connect((DB_HOST), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`),
    process.exit(1)
  );



