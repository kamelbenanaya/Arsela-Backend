const Joi = require("joi");

const signupSchema = Joi.object().keys({
  firstName: Joi.string().max(128).required(),
  lastName: Joi.string().max(128).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      /^.*(?=.{8,128})(?=.*\d)((?=.*[a-z]){1})((?=.*[0-9]){1})((?=.*[A-Z]){1}).*$/
    )
    .required(),
  phone: Joi.number().min(11111111).max(99999999).integer().required(),
  country: Joi.string().max(128),
  city: Joi.string().max(128),
});
const loginschema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const forgetschema = Joi.object().keys({
  email: Joi.string().email().required(),
});
const resetsetpassword = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(
      /^.*(?=.{8,128})(?=.*\d)((?=.*[a-z]){1})((?=.*[0-9]){1})((?=.*[A-Z]){1}).*$/
    )
    .required(),
});
const orderschema = Joi.object().keys({
  products: Joi.array()
    .items({
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      qte: Joi.number().integer().required(),
    })
    .min(1)
    .required(),
});
const createCateg = Joi.object().keys({
  name: Joi.string().max(128).required(),
});
const createBrand = Joi.object().keys({
  name: Joi.string().max(128).required(),
});
const createProduct = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
  pricePromotion: Joi.number().required(),
  description: Joi.string().required(),
})
module.exports = {
  "/signup": signupSchema,
  "/signin": loginschema,
  "/forget": forgetschema,
  "/password-reset/:userId/:token": resetsetpassword,
  "/password-reset/:userId/": resetsetpassword,
  "/createorder": orderschema,
  "/addCat": createCateg,
  "/addBrand": createBrand,
  "/addPro": createProduct,
};
