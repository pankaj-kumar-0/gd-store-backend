const express = require('express');

const router = express.Router();

const {all_products, create_product, single_product, update_product, delete_product, addReview} = require('../Controllers/productController.js');
const { AdminCheck, AuthenticatedUser } = require('../Middlewares/auth.js');




router.route('/products').get(all_products);

router.route('/createProduct').post( AuthenticatedUser, AdminCheck(true) , create_product);

router.route('/Product/:id').get(single_product).put( AuthenticatedUser, AdminCheck(true) , update_product).delete( AuthenticatedUser, AdminCheck(true) , delete_product)


router.route('/review/:productId').post( AuthenticatedUser, addReview);



module.exports = router;
