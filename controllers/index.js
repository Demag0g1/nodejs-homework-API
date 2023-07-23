const {
  Contact,
  addSchema,
  updateFavoriteSchema,
} = require("../service/schemas/contacts");

const service = require("../service/index");

const get = async (req, res, next) => {
  try {
    const results =
      await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  try {
    const result =
      await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (
  req,
  res,
  next
) => {
  const { name } = req.body;
  try {
    const result =
      await service.addContact({
        name,
      });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts: result },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result =
      await service.updateContact(id, {
        name,
      });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatus = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result =
      await service.updateContact(id, {
        favorite,
      });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const remove = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    const result = await service.remove(
      id
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
  updateStatus,
};
