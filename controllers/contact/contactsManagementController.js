const service = require("../../service");
const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../../service/schemas/joi/contactValidation");

const getContactById = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { err } = updateContactSchema.validate(
    req.body
  );
  if (err) {
    return res.status(400).json({
      message: "Contact validation error",
      err: err.details[0].message,
    });
  }
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

const addContact = async (
  req,
  res,
  next
) => {
  const { name } = req.body;
  const { err  } = addContactSchema.validate(req.body);
  if (err) {
    return res.status(400).json({
      message: "Contact validation error",
      error: err.details[0].message,
    });
  }
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
  } catch (err ) {
    console.error(err);
    next(err);
  }
};

const updateContact  = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { name } = req.body;
  const { err } = updateContactSchema.validate(
    req.body
  );
  if (err) {
    return res.status(400).json({
      message: "Contact validation error",
      err: err.details[0].message,
    });
  }
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
  const { err } = updateStatusSchema.validate(
    req.body
  );

  if (err) {
    return res.status(400).json({
      message: "Contact validation error",
      error: err.details[0].message,
    });
  }

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
        message: `Not found`,
        data: "Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeContact  = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const { err } = updateStatusSchema.validate(
    req.body
  );

  if (err) {
    return res.status(400).json({
      message: "Contact validation error",
      error: err.details[0].message,
    });
  }

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
  getContactById,
  addContact,
  updateContact,
  updateStatus,
  removeContact,
};
