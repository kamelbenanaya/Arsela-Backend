const categoryModel = require("../models/category.model");
module.exports = {
  getAllCategory: async function (req, res) {
    try {
      const { limit = 4, page = 1 } = req.query;

      const response = await categoryModel
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await categoryModel.countDocuments();

      res.send({
        data: response,
        totalpages: Math.ceil(count / limit),
        currentPage: page,
        totalData: count,
      });
    } catch (err) {
      res.send({message : "An error occured"});
    }
  },
  getCategory: async function (req, res) {
    try {
      const _id = req.params.idCat;
      const response = await categoryModel.findById(_id);
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({message : "An error occured"});
    }
  },
  createCategory: async function (req, res) {
    try {
      const category = await categoryModel.create(req.body);
      res.status(200).send({ message: "category created", category });
    } catch (err) {
      res.status(400).send({message : "An error occured"});
    }
  },
  updateCategory: function (req, res) {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "data to update category can not be empty" });
    }
    const _id = req.params.idCat;
    categoryModel
      .findByIdAndUpdate(_id, req.body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: " cannot be updated",
          });
        } else res.status(200).send({ message: " category updated", data });
      })
      .catch((err) => {
        res.status(500).send({ message: "error" });
      });
  },
  deleteCategory: function (req, res) {
    const _id = req.params.idCat;
    categoryModel
      .findByIdAndDelete(_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "cannot deleted",
          });
        } else res.status(200).send({ message: "category deleted", data });
      })
      .catch((err) => {
        res.status(500).send({ message: "error" });
      });
  },
};
