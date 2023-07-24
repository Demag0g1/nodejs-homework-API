const express = require('express')
const router = express.Router()
const ctrlContacts = require('../../controllers')


router.get('/', ctrlContacts.get)
router.get('/:contactId', ctrlContacts.getById)
router.post('/', ctrlContacts.create)
router.delete('/:contactId', ctrlContacts.remove)
router.patch('/:contactId/favorite', ctrlContacts.updateStatus)
router.put('/:contactId', ctrlContacts.update)

module.exports = router
