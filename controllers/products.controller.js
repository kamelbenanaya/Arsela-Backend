const ProductModel = require("../models/product.model")


module.exports = {
  getAllProduct: async function (req, res) {
    try {
      const response = await ProductModel.find();
      res.send(response);
    } catch (err) {
      res.send(err);
    }
  },

createProduct: function (req,res){
  ProductModel.create(function(err, data) {
    console.log(data)
    if(err) {
        console.log(error);
    }
    else {
        res.send("Data inserted");
    }
});

},
   

    // Product.create({name: req.body.name}).then(product => {           
    //     res.status(201).json({ message: 'product created successfully',id:product._id })
    // })
    // .catch(err => {
    //     res.status(500).json({ message: 'Internal Server Error' })
    // })

  
  // },
  find: function (req, res) {
    const id = req.params?.id;

    console.log("id", id);
    res.status(200).json({ product: null });
  },
  delete: function (req, res) {
    const id = req.params?.id;
    console.log("id", id);
    res.status(200).json({ message: "deleted successfully" });
  },

  update: function (req, res) {
    const id = req.params?.id;
    console.log("id", id);
    res.status(201).json({ message: "updated successfully" });
  },
};
