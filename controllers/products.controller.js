const ProductModel = require("../models/product.model");
const FilesModel = require("../models/files.model");


module.exports = {
  getAllProduct: async function (req, res) {
    const { limit = 4, page = 1, brand, category, min, max, name } = req.query;
    try {
      let query = {};

      if (brand) query.brand = brand;
      if (category) query.category = category;
      if (min && !max) query.price = { $gte: min };
      if (max && !min) query.price = { $lte: max };
      if (min && max) query.price = { $lte: max, $gte: min };
      if (name) query.name = { $regex: ".*" + name + ".*" };

      const response = await ProductModel.find(query)
        .populate("brand category image")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await ProductModel.countDocuments();

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

  createProduct: async function (req, res) {
    try {
      console.log(req.files.file);

      const fileArray = req.files.images;

      let arrayOfFilesIds = [];

      for (let i = 0; i < fileArray.length; i++) {
        const fileInfo = await FilesModel.create(fileArray[i]);

        arrayOfFilesIds.push(fileInfo?._id);
      }

      let inputProduct = {
        ...req.body,
        image: arrayOfFilesIds,
      };

      const product = await ProductModel.create(inputProduct);

      res.status(200).send({ message: "product created", product: product });
    } catch (err) {
      res.status(400).send({message : "An error occured"});
    }
  },
  getProduct: async function (req, res) {
    try {
      const _id = req.params.idProd;
      const response = await ProductModel.findById(_id).populate(
        "brand category"
      );
      res.send(response);
    } catch (err) {
      res.send({message : "An error occured"});
    }
  },
  updateProduct: function (req, res) {
    if (!req.body) {
      return res.status(400).send({ message: "product cannot be updated" });
    }
    const _id = req.params.idProd;
    ProductModel.findByIdAndUpdate(
      _id,
      req.body,
      { $push: { images: "" } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: " cannot update",
          });
        } else res.send({ message: " product updated", data });
      })
      .catch((err) => {
        res.status(500).send({ message: " error" });
      });
  },
  deleteProduct: function (req, res) {
    const _id = req.params.idProd;
    ProductModel.findByIdAndDelete(_id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: " cannot deleted" });
        } else res.send({ message: "product Deleted", data });
      })
      .catch((err) => {
        res.status(500).send({ message: "error" });
      });
  },
  uploadfile: async function (req, res) {
    try {
      const File = await FilesModel.create(req.file);
      res.status(200).send({ message: " Filed ", File });
    } catch (err) {
      res.status(400).send({message : "An error occured"});
    }
  },
};
