import { Router } from "express";
import { verifyRole } from "../middleware/permissionsMiddleware.js";
import ProfileController from "../controllers/profile.controller.js";
const router = Router();
const name = '/profile';

// Public route


router.route(name)
  .post(verifyRole(['admin']), ProfileController.register) // Register a new profile
  .get(verifyRole(['admin']), ProfileController.show);// Show all profile

router.route(`${name}/:id`)
  .get(verifyRole(['admin']), ProfileController.findById)// Show a profile by ID
  .put(verifyRole(['admin']), ProfileController.update)// Update a profile by ID
  .delete(verifyRole(['admin']), ProfileController.delete);// Delete a profile by ID


export default router;