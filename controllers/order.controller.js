const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");

module.exports = {
  checkout: async function (req, res) {
    // command function or checkout  funtion
    try {
      const userId = req.userId; //ok
      const productList = req.body.products; //ok


      const my_order = await orderModel.create({ user: userId }); // ok


      let total_all_product = 0;

    
      productList.forEach(async function (one_product, index) {
 

        const my_product = await ProductModel.findById(one_product.id);
        if (!my_product){
          res.send({message: "doesn't product with this ID"})
        } else { 
        const total_qte_product = await one_product.qte * my_product.price;

        const my_card = await cartModel.create({
          Order: my_order._id,
          Product: one_product.id,
          quantity: one_product.qte,
          total: total_qte_product,
          price: my_product.price,
        }); //ok

        total_all_product += await  total_qte_product;

        if (productList.length - 1 === index) {

          orderModel
            .findByIdAndUpdate(
              my_order._id,
              { total: total_all_product },
              { new: true }
            )
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: " cannot be updated",
                });
              } else
                res
                  .status(200)
                  .send({ message: " total price  updated", data });
            })
            .catch((err) => {
              res.status(500).send({ message: "error" });
            });
        }}
      });
    } catch (err) {
      res.send(err);
    }
  },
  getAllOrder: async function (req, res, next) {
    const {limit=4,page=1}=req.query
    const count =  await orderModel.countDocuments()
    console.log(count)
     await orderModel
      .aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "_id",
            foreignField: "Order",
            as: "carts",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "carts.Product",
            foreignField: "_id",
            as: "Product",
          },
        },
        // {
        //   $unwind: "$Product",
        // },
        // {
        //   $lookup: {
        //     from: "brands",
        //     localField: "Product.brand",
        //     foreignField: "_id",
        //     as: "brand",
        //   },
        // },
        // {
        //   $unwind: "$brand",
        // },
        // {
        //   $lookup: {
        //     from: "categories",
        //     localField: "Product.category",
        //     foreignField: "_id",
        //     as: "categories",
        //   },
        // },
        // {
        //   $unwind: "$categories",
        // },
      ]).limit(limit*1).skip((page-1)*limit)
      .exec(function (err, result) {
        res.send({data : result,
          totalpages : Math.ceil(count/ limit),
          currentPage : page,
          totalData: count
          });
      });
  },

  deleteOrderByIdCarts :  function(req,res){
    const _id = req.params.idOrder;
    for (let i = 0; i < cartModel.length; i++) { 
    cartModel.findOneAndRemove({ Order: _id }).then(data=>{
      if (!data){
        res.status(404).send({ message : " cannot deleted"})
      }
    }).catch (err => {
      res.status(500).send({message : "error"})
    })
    }
    orderModel.findByIdAndDelete(_id).then(data=>{
      if (!data){
        res.status(404).send({ message : " cannot deleted"})
      }else res.send({message : "Order Deleted",data})
    }).catch (err => {
      res.status(500).send({message : "error"})
    })
  },
  updateOrderToPaid : function (req,res){
    const _id = req.params.idOrder;
    orderModel.findOneAndUpdate(_id,{statut:"Paid"},{new: true}).then (data => {
      if (!data){
        res.status(404).send({
          message: " cannot update"
  
        });
  
      }else res.send({ message :" Order Paid", data})
    }) .catch(err => {
      res.status(500).send({message : " error"})
    })
  },
  updateOrderToRejected : function (req,res){
    const _id = req.params.idOrder;
    orderModel.findOneAndUpdate(_id,{statut:"Rejected"},{new: true}).then (data => {
      if (!data){
        res.status(404).send({
          message: " cannot update"
  
        });
  
      }else res.send({ message :" Order Rejected", data})
    }) .catch(err => {
      res.status(500).send({message : " error"})
    })
  },
  
};
