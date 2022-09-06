const ProductModel = require("../models/product.model");
const FilesModel = require("../models/files.model");

module.exports = {
  getAllProduct: async function (req, res) {
    const { limit = 8, page = 1, brand, category, min, max, name } = req.query;
    // const priceafter = data
    try {
      let query = {};

      if (brand) query.brand = brand;
      if (category) query.category = { $in: category };
      if (min && !max) query["pricePromotion.priceAfterPromo"] = { $gte: min };
      if (max && !min) query["pricePromotion.priceAfterPromo"] = { $lte: max };
      if (min && max)
        query["pricePromotion.priceAfterPromo"] = { $gte: min, $lte: max };

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
      res.send({ message: "An error occured" });
    }
  },

  createProduct: async function (req, res) {
    try {
      const fileArray = req?.files?.images;
      let arrayOfFilesIds = [];
      if (fileArray) {
        for (let i = 0; i < fileArray.length; i++) {
          const fileInfo = await FilesModel.create(fileArray[i]);
          arrayOfFilesIds.push(fileInfo?._id);
        }
      }
      const promo = req?.body?.pricePromotion || 0;
      const pricePromo = req?.body.price - (promo / 100) * req?.body.price;
      let inputProduct = {
        ...req.body,
        pricePromotion: {
          promotion: promo,
          priceAfterPromo: pricePromo.toFixed(0),
        },
        image: arrayOfFilesIds,
      };
      const product = await ProductModel.create(inputProduct);
      console.log("product", product);

      res.status(200).send({ message: "product created", product: product });
    } catch (err) {
      res.status(400).send({ message: "An error occured", err });
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
      res.send({ message: "An error occured" });
    }
  },
  updateProduct: async function (req, res) {
    if (!req.body) {
      return res.status(400).send({ message: "product cannot be updated" });
    }
    const _id = req.params.idProd;
    const fileArray = req?.files?.images;
    console.log("fileArray", fileArray, req.files);
    let arrayOfFilesIds = [];
    if (fileArray) {
      for (let i = 0; i < fileArray.length; i++) {
        const fileInfo = await FilesModel.create(fileArray[i]);
        arrayOfFilesIds.push(fileInfo?._id);
      }
    }
    await ProductModel.findByIdAndUpdate(
      _id,
      { ...req.body, image: arrayOfFilesIds },
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
      res.status(400).send({ message: "An error occured" });
    }
  },
};
