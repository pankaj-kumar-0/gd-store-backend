const express = require('express');
const { signUp, logIn, Logout, getUserDetail, updateUser, getAllUser, singleUser, deleteUser, updateUserRole } = require('../Controllers/userControllers');
const { AuthenticatedUser, AdminCheck } = require('../Middlewares/auth');
const router = express.Router();



router.route('/signup').post(signUp);
router.route('/login').post(logIn);
router.route('/logout').get(Logout);

router.route('/user').get( AuthenticatedUser, getUserDetail).put( AuthenticatedUser, updateUser);

router.route('/admin/allUser').get(AuthenticatedUser, AdminCheck(true), getAllUser);

router.route('/admin/user/:id').get(AuthenticatedUser, AdminCheck(true), singleUser).delete(AuthenticatedUser, AdminCheck(true),deleteUser).put(AuthenticatedUser, AdminCheck(true), updateUserRole);



module.exports = router;
