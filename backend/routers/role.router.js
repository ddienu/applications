import { Router } from "express";
import RoleController from '../controllers/role.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { verifyRole } from "../middleware/permissionsMiddleware.js";
// Importing necessary modules
const router= Router();
const name='/role';
// Public route
// router.route(name)
  router.post(name, verifyRole(['admin']), RoleController.register); // Register a new user
  router.get(name,verifyRole(['admin']), RoleController.show);// Show all users

router.route(`${name}/:id`)
  .get(verifyRole(['admin']), RoleController.findById)// Show a user by ID
  .put(verifyRole(['admin']), RoleController.update)// Update a user by ID
  .delete(verifyRole(['admin']), RoleController.delete);// Delete a user by ID

export default router;