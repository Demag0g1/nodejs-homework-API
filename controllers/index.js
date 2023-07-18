const service = require('../service/index')


const get = async (req, res, next) => {
  try {
    const results = await service.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    }) 
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const result = await service.getContactById(id)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  const { title, text } = req.body
  try {
    const result = await service.addContact({ title, text })

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contacts: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const update = async (req, res, next) => {
  const { id } = req.params
  const { title, text } = req.body
  try {
    const result = await service.updateContact(id, { title, text })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { isDone = false } = req.body

  try {
    const result = await service.updateContact(id, { isDone })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params

  try {
    const result = await service.remove(id)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
  updateStatus,
}