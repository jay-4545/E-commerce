const Filter = require("../model/Filter");

const getAllFilters = async (req, res) => {
  try {
    const filter = await Filter.find();
    res.status(200).json({ success: true, data: filter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const getFilter = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = await Filter.findById(id);

    if (!filter) {
      return res
        .status(404)
        .json({ success: false, msg: "No such filter found!" });
    }

    res.status(200).json({ success: true, data: filter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const addFilter = async (req, res) => {
  try {
    const addedFilter = await Filter.create(req.body);
    res.status(200).json({ success: true, data: addedFilter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateFilter = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = await Filter.findById(id);

    if (!filter) {
      return res
        .status(404)
        .json({ success: false, msg: "No such filter found!" });
    }

    const updatedFilter = await Filter.findByIdAndUpdate(id, req.body);

    res.status(200).json({ success: true, data: updatedFilter });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteFilter = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = await Filter.findById(id);

    if (!filter) {
      return res
        .status(404)
        .json({ success: false, msg: "No such filter found!" });
    }

    await Filter.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Filter deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  getAllFilters,
  getFilter,
  addFilter,
  updateFilter,
  deleteFilter,
};
