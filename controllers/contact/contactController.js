const { Contact } = require("../../service/schemas/contacts");

const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;
    const filter = favorite
      ? { owner: req.user._id, favorite: true }
      : { owner: req.user._id };
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const contacts = await Contact.paginate(filter, options);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    next(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getContacts,
};