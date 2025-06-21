import { Router } from "express";
import UserApiController from '../controllers/userApi.controller.js';
const router = Router();
const name = '/userApi';
const nameLogin = '/login';
// Public route

router.post(name,  UserApiController.registerUserApi);

// router.route(name)
//   // .post(UserController.register) // Register a new user
//   .get(UserController.show);// Show all users

// router.route(`${name}/:id`)
//   .get(UserController.findById)// Show a user by ID
//   // .put(UserController.update)// Update a user by ID
//   // .delete(UserController.delete);// Delete a user by ID

// //Login route
// router.route(nameLogin)
//   .post(UserController.login);// Login a user

export default router;