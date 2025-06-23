import { Router } from "express";
import { verifyRole } from "../middleware/permissionsMiddleware.js";
import UserController from '../controllers/user.controller.js';
const router = Router();
const name = '/user';
const nameLogin = '/login';
// Public route
router.route(name)
  .post(verifyRole(['admin']), UserController.register) // Register a new user
  .get(verifyRole(['admin', 'userapi']), UserController.show);// Show all users

router.route(`${name}/:id`)
  .get(verifyRole(['admin', 'userapi']), UserController.findById)// Show a user by ID
  .put(verifyRole(['admin']), UserController.update)// Update a user by ID
  .delete(verifyRole(['admin']), UserController.delete);// Delete a user by ID

//Login route
router.route(nameLogin)
  .post(UserController.login);// Login a user

export default router;