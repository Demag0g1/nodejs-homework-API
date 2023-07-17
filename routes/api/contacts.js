const express = require('express');
// const mongoose=require ('mongoose');

// mongoose.connect (DB_HOST);

// const DB_HOST="mongodb+srv://demagog:10101982@contacts.ttvf3bm.mongodb.net/contacts?retryWrites=true&w=majority";


// mongoose.connect (DB_HOST)
//   .then(()=>console.log ("Database connection successful"))
//   .catch(error=>console.log (error.message) )

const router = express.Router()


router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
