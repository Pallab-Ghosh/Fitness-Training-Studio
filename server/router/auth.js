const express=require('express');
const auth_functions_module=require('../controller/auth');

const auth_router=express.Router();
auth_router.post('/signup',auth_functions_module.signup)
exports.auth_router_module=auth_router;