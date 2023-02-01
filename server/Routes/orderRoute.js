const express = require('express');
const router = express.Router();

const { AdminCheck, AuthenticatedUser } = require('../Middlewares/auth.js');
const { createOrder, allOrders, singleOrder, allOrdersAdmin, singleOrderAdmin } = require('../Controllers/orderControllers');



router.route('/order').post( AuthenticatedUser, createOrder);

router.route('/order/all').get(AuthenticatedUser ,allOrders);

router.route('/order/:orderId').get( AuthenticatedUser ,singleOrder);

router.route('/admin/orders').get( AuthenticatedUser, AdminCheck(true) ,allOrdersAdmin);
router.route('/admin/order/:orderId').get( AuthenticatedUser, AdminCheck(true) ,singleOrderAdmin);





module.exports = router;
