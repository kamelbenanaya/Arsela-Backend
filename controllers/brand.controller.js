const brandModel = require("../models/brand.model");
const categoryModel = require("../models/category.model");
module.exports = {
  getAllBrand: async function (req, res) {
    try {
      const {limit=4,page=1}=req.query

      const response = await brandModel.find().limit(limit*1).skip((page-1)*limit).exec();
      const count = await brandModel.countDocuments();

      res.status(200).send({data : response,
        totalpages : Math.ceil(count / limit),
        currentPage : page,
        totalData: count
        });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getBrand: async function (req, res) {
    try {
      const _id = req.params.idBrand;
      const response = await brandModel.findById(_id);
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  createBrand: async function (req, res) {
    try {
      const brand = await brandModel.create(req.body);
      res.status(200).send({ message: "brand created", brand });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateBrand: function (req, res) {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "data to update brand cannot be empty" });
    }
    const _id = req.params.idBrand;
    brandModel
      .findByIdAndUpdate(_id, req.body, { new : true })
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "cannot be updated" });
        } else res.status(200).send({ message: "brand updated", data });
      })
      .catch((err) => {
        res.status(500).send({ message: "error" });
      });
  },
  deleteBrand: function (req, res) {
    const _id = req.params.idBrand;
    brandModel
      .findByIdAndDelete(_id)
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "cannot deleted" });
        } else res.status(200).send({ message: "brand deleted", data });
      })
      .catch((err) => {
        res.status(500).send({ message: "error" });
      });
  },
};
