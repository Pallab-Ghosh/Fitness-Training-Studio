const express=require('express');
const user_functions_module=require('../controller/user');
const user_router=express.Router();
user_router
.post('/login',user_functions_module.login)
.post('/login_email',user_functions_module.loginEmail)
.post('/verify_email',user_functions_module.verify_email)
.get('/getuser_details',user_functions_module.get_details)
.post('/forget_password',user_functions_module.forget_password)
.post('/login_email_with_email',user_functions_module.loginEmailWithEmail)
.post('/verify_email_with_email',user_functions_module.verify_email_With_Email)
.post('/reset_password',user_functions_module.reset_password)
.get('/send_email_for_delete',user_functions_module.email_for_delete)
.delete('/delete_account',user_functions_module.verify_email_for_delete)
.post('/save_course_details',user_functions_module.save_course_data)
.get('/get_course_details',user_functions_module.get_course_data)
.delete('/delete_subscription',user_functions_module.delete_subscription)
.post('/visitor_data',user_functions_module.create_visitor)
.get('/all_users',user_functions_module.get_all_users)
.delete(`/delete_user/:id`,user_functions_module.delete_user)
.get('/visitor_data',user_functions_module.get_all_visitor_data)
.patch('/update_status',user_functions_module.update_visitor_status)
.delete('/delete_visitor/:id',user_functions_module.delete_visitor)
.post('/add_new_user',user_functions_module.add_new_user)
.patch('/update_review',user_functions_module.give_review_and_star)
exports.user_router_module=user_router;
